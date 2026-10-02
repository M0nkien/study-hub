/* StudyHub v2.2 - Supabase Admin Auth + PostgreSQL CRUD */
(function () {
    "use strict";

    let currentUser = null;
    let currentProfile = null;
    let subjects = [];
    let materials = [];
    let questions = [];
    let roadmapItems = [];
    let changelogEntries = [];
    let activeSavedTab = "materials";

    function db() {
        return window.studyHubSupabase || null;
    }

    function el(id) {
        return document.getElementById(id);
    }

    function escapeHtml(value) {
        return String(value == null ? "" : value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function formatDate(value) {
        if (!value) return "—";
        try {
            return new Date(value).toLocaleDateString("sk-SK");
        } catch (e) {
            return String(value);
        }
    }

    function setDbStatus(message, type) {
        const node = el("adminDbStatus");
        if (!node) return;
        node.classList.remove("is-online", "is-error");
        if (type === "online") node.classList.add("is-online");
        if (type === "error") node.classList.add("is-error");
        const textNode = node.querySelector("span");
        if (textNode) textNode.textContent = message;
    }

    function setLoginMessage(message, isError) {
        const node = el("adminLoginMessage");
        if (!node) return;
        node.textContent = message || "";
        node.hidden = !message;
        node.classList.toggle("admin-login-error", Boolean(isError));
    }

    function showToast(message, type) {
        let toast = document.querySelector(".admin-v21-toast");
        if (!toast) {
            toast = document.createElement("div");
            toast.className = "admin-v21-toast";
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.className = "admin-v21-toast is-visible " + (type || "success");
        clearTimeout(showToast.timer);
        showToast.timer = setTimeout(function () {
            toast.classList.remove("is-visible");
        }, 2800);
    }

    function setLoading(button, loading, loadingText) {
        if (!button) return;
        if (!button.dataset.originalText) button.dataset.originalText = button.textContent;
        button.disabled = loading;
        button.textContent = loading ? (loadingText || "Pracujem…") : button.dataset.originalText;
    }

    function showLogin() {
        const login = el("adminLogin");
        const content = el("adminContent");
        if (login) {
            login.hidden = false;
            login.classList.remove("hidden");
            login.removeAttribute("aria-hidden");
        }
        if (content) {
            content.hidden = true;
            content.inert = true;
            content.classList.add("hidden");
            content.setAttribute("aria-hidden", "true");
        }
    }

    function showAdmin() {
        const login = el("adminLogin");
        const content = el("adminContent");
        if (login) {
            login.hidden = true;
            login.classList.add("hidden");
            login.setAttribute("aria-hidden", "true");
        }
        if (content) {
            content.hidden = false;
            content.inert = false;
            content.classList.remove("hidden");
            content.removeAttribute("aria-hidden");
        }

        const email = el("adminSessionEmail");
        const name = el("adminSessionName");
        if (email) email.textContent = currentUser?.email || "Admin";
        if (name) name.textContent = currentProfile?.display_name || "Administrátor";
    }

    async function getAdminProfile(userId) {
        const result = await db()
            .from("profiles")
            .select("id,display_name,role")
            .eq("id", userId)
            .maybeSingle();

        if (result.error) throw result.error;
        return result.data;
    }

    async function verifySession() {
        if (!db()) {
            setDbStatus("Supabase nie je nakonfigurovaný. Doplň script/supabase-config.js.", "error");
            setLoginMessage("Najprv doplň Project URL a Publishable key v script/supabase-config.js.", true);
            showLogin();
            const loginBtn = el("adminLoginBtn");
            if (loginBtn) loginBtn.disabled = true;
            return;
        }

        setDbStatus("Pripájam sa k Supabase…");
        const sessionResult = await db().auth.getSession();

        if (sessionResult.error) {
            setDbStatus("Chyba spojenia so Supabase.", "error");
            setLoginMessage(sessionResult.error.message, true);
            showLogin();
            return;
        }

        const session = sessionResult.data.session;
        if (!session?.user) {
            currentUser = null;
            currentProfile = null;
            sessionStorage.removeItem("studyHubAdminUnlocked");
            sessionStorage.removeItem("studyHubAdminLoggedIn");
            setDbStatus("Supabase je pripravený. Prihlás sa.", "online");
            showLogin();
            return;
        }

        // getUser() validates the signed-in identity with Supabase Auth;
        // sessionStorage/localStorage alone must never grant Admin access.
        const verified = await db().auth.getUser();
        if (verified.error || !verified.data?.user || verified.data.user.id !== session.user.id) {
            currentUser = null;
            currentProfile = null;
            sessionStorage.removeItem("studyHubAdminUnlocked");
            sessionStorage.removeItem("studyHubAdminLoggedIn");
            setDbStatus("Prihlásenie sa nepodarilo overiť.", "error");
            setLoginMessage("Obnov stránku a prihlás sa znova.", true);
            showLogin();
            return;
        }
        currentUser = verified.data.user;

        try {
            const profile = await getAdminProfile(currentUser.id);
            if (!profile || profile.role !== "admin") {
                currentProfile = null;
                sessionStorage.removeItem("studyHubAdminUnlocked");
                sessionStorage.removeItem("studyHubAdminLoggedIn");
                setLoginMessage("Tento účet je prihlásený, ale nemá oprávnenie admin. Použi svoj administrátorský účet alebo pokračuj v študentskej časti.", true);
                setDbStatus("Prihlásený účet nemá rolu admin.", "error");
                showLogin();
                return;
            }

            currentProfile = profile;
            sessionStorage.setItem("studyHubAdminUnlocked", "true");
            sessionStorage.setItem("studyHubAdminLoggedIn", "1");
            setLoginMessage("");
            setDbStatus("Supabase pripojený · Admin overený", "online");
            showAdmin();
            await loadAllAdminData();
        } catch (error) {
            console.error(error);
            setDbStatus("Nepodarilo sa overiť Admin rolu.", "error");
            setLoginMessage("Skontroluj tabuľku profiles a rolu admin.", true);
            showLogin();
        }
    }

    async function login() {
        const email = el("adminEmailInput");
        const password = el("adminPasswordInput");
        const button = el("adminLoginBtn");

        if (!db()) return;
        const emailValue = String(email?.value || "").trim();
        const passwordValue = String(password?.value || "");

        if (!emailValue || !passwordValue) {
            setLoginMessage("Zadaj e-mail aj heslo.", true);
            return;
        }

        setLoginMessage("");
        setLoading(button, true, "Prihlasujem…");

        const result = await db().auth.signInWithPassword({
            email: emailValue,
            password: passwordValue
        });

        setLoading(button, false);

        if (result.error) {
            setLoginMessage("Prihlásenie zlyhalo: " + result.error.message, true);
            return;
        }

        if (password) password.value = "";
        await verifySession();
    }

    async function logout() {
        if (db()) await db().auth.signOut();
        currentUser = null;
        currentProfile = null;
        sessionStorage.removeItem("studyHubAdminUnlocked");
        sessionStorage.removeItem("studyHubAdminLoggedIn");
        setLoginMessage("");
        setDbStatus("Odhlásené. Supabase je pripravený.", "online");
        showLogin();
    }

    function parseAnswers(raw) {
        return String(raw || "")
            .split(/\r?\n/)
            .map(function (line) { return line.trim(); })
            .filter(Boolean)
            .map(function (line) {
                const correct = line.startsWith("*");
                return {
                    text: correct ? line.slice(1).trim() : line,
                    correct: correct
                };
            });
    }

    function answersToText(answers) {
        if (!Array.isArray(answers)) return "";
        return answers.map(function (answer) {
            return (answer.correct ? "*" : "") + answer.text;
        }).join("\n");
    }

    function subjectById(id) {
        return subjects.find(function (subject) { return subject.id === id; });
    }

    function fillSubjectSelects() {
        ["materialSubject", "questionSubject"].forEach(function (id) {
            const select = el(id);
            if (!select) return;
            const current = select.value;
            select.innerHTML = subjects.map(function (subject) {
                return '<option value="' + escapeHtml(subject.id) + '">' + escapeHtml(subject.name) + '</option>';
            }).join("");
            if (subjects.some(function (subject) { return subject.id === current; })) {
                select.value = current;
            }
        });
    }

    async function loadSubjects() {
        const result = await db()
            .from("subjects")
            .select("id,slug,short_name,name,description,status,href,color,visible,sort_order,updated_at")
            .order("sort_order", { ascending: true });

        if (result.error) throw result.error;
        subjects = result.data || [];
        fillSubjectSelects();
        renderSubjectManager();
        updateCounts();
    }

    async function loadMaterials() {
        const result = await db()
            .from("materials")
            .select("id,subject_id,title,type,description,url,visible,created_at,updated_at")
            .order("updated_at", { ascending: false });

        if (result.error) throw result.error;
        materials = result.data || [];
        renderSavedContent();
        updateCounts();
    }

    async function loadQuestions() {
        const result = await db()
            .from("quiz_questions")
            .select("id,subject_id,question,answers,explanation,visible,created_at,updated_at")
            .order("updated_at", { ascending: false });

        if (result.error) throw result.error;
        questions = result.data || [];
        renderSavedContent();
        updateCounts();
    }

    async function loadRoadmap() {
        const result = await db()
            .from("roadmap_items")
            .select("*")
            .order("sort_order", { ascending: true })
            .order("created_at", { ascending: false });

        if (result.error) throw result.error;
        roadmapItems = result.data || [];
        renderRoadmapAdmin();
        updateCounts();
    }

    async function loadChangelog() {
        const result = await db()
            .from("changelog_entries")
            .select("*")
            .order("release_date", { ascending: false })
            .order("sort_order", { ascending: true });

        if (result.error) throw result.error;
        changelogEntries = result.data || [];
        renderChangelogAdmin();
        updateCounts();
    }

    async function loadAllAdminData() {
        const tasks = [loadSubjects(), loadMaterials(), loadQuestions(), loadRoadmap(), loadChangelog()];
        const results = await Promise.allSettled(tasks);
        const failed = results.filter(function (result) { return result.status === "rejected"; });
        if (failed.length) {
            console.error(failed);
            showToast("Niektoré dáta sa nepodarilo načítať.", "error");
        }
    }

    function updateCounts() {
        const pairs = [
            ["adminCountSubjects", subjects.length],
            ["adminCountMaterials", materials.length],
            ["adminCountQuestions", questions.length],
            ["adminCountRoadmap", roadmapItems.length],
            ["adminCountChangelog", changelogEntries.length]
        ];
        pairs.forEach(function (pair) {
            const node = el(pair[0]);
            if (node) node.textContent = String(pair[1]);
        });
    }

    function renderSubjectManager() {
        const host = el("subjectDbManager");
        if (!host) return;

        if (!subjects.length) {
            host.innerHTML = '<div class="admin-empty-state"><strong>Žiadne predmety.</strong><p>Spusti database/schema.sql.</p></div>';
            return;
        }

        host.innerHTML = subjects.map(function (subject) {
            return '<article class="admin-subject-db-row" data-subject-id="' + escapeHtml(subject.id) + '">' +
                '<div><h3>' + escapeHtml(subject.name) + '</h3><p>' + escapeHtml(subject.slug) + ' · ' + escapeHtml(subject.href) + '</p></div>' +
                '<select data-subject-status>' +
                    '<option value="hotove"' + (subject.status === "hotove" ? " selected" : "") + '>Hotové</option>' +
                    '<option value="rozpracovane"' + (subject.status === "rozpracovane" ? " selected" : "") + '>Rozpracované</option>' +
                    '<option value="pripravovane"' + (subject.status === "pripravovane" ? " selected" : "") + '>Pripravované</option>' +
                '</select>' +
                '<label class="admin-switch"><input type="checkbox" data-subject-visible' + (subject.visible ? " checked" : "") + '> Viditeľný</label>' +
                '<button class="btn secondary" type="button" data-save-subject>Uložiť</button>' +
            '</article>';
        }).join("");

        host.querySelectorAll("[data-save-subject]").forEach(function (button) {
            button.addEventListener("click", async function () {
                const row = button.closest("[data-subject-id]");
                const id = row.dataset.subjectId;
                const status = row.querySelector("[data-subject-status]").value;
                const visible = row.querySelector("[data-subject-visible]").checked;

                setLoading(button, true, "Ukladám…");
                const result = await db()
                    .from("subjects")
                    .update({ status: status, visible: visible })
                    .eq("id", id);
                setLoading(button, false);

                if (result.error) {
                    showToast("Predmet sa nepodarilo uložiť.", "error");
                    console.error(result.error);
                    return;
                }

                const subject = subjectById(id);
                if (subject) {
                    subject.status = status;
                    subject.visible = visible;
                }
                showToast("Predmet bol uložený.");
            });
        });
    }

    async function saveMaterial(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const button = form.querySelector('button[type="submit"]');
        const title = String(el("materialTitle").value || "").trim();
        if (!title) {
            showToast("Zadaj názov materiálu.", "error");
            return;
        }

        const payload = {
            subject_id: el("materialSubject").value,
            title: title,
            type: el("materialType").value,
            description: String(el("materialDescription").value || "").trim(),
            url: String(el("materialUrl").value || "").trim() || null,
            visible: Boolean(el("materialVisible").checked),
            created_by: currentUser.id
        };

        setLoading(button, true, "Ukladám…");
        let result;
        if (form.dataset.editId) {
            result = await db().from("materials").update(payload).eq("id", form.dataset.editId);
        } else {
            result = await db().from("materials").insert(payload);
        }
        setLoading(button, false);

        if (result.error) {
            showToast("Materiál sa nepodarilo uložiť.", "error");
            console.error(result.error);
            return;
        }

        form.reset();
        delete form.dataset.editId;
        button.dataset.originalText = "Uložiť materiál";
        button.textContent = "Uložiť materiál";
        el("materialVisible").checked = true;
        showToast("Materiál bol uložený do databázy.");
        await loadMaterials();
    }

    async function saveQuestion(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const button = form.querySelector('button[type="submit"]');
        const question = String(el("questionText").value || "").trim();
        const answers = parseAnswers(el("questionAnswers").value);

        if (!question) {
            showToast("Zadaj text otázky.", "error");
            return;
        }

        if (answers.length < 2 || answers.filter(function (answer) { return answer.correct; }).length !== 1) {
            showToast("Zadaj aspoň 2 odpovede a správnu označ *.", "error");
            return;
        }

        const payload = {
            subject_id: el("questionSubject").value,
            question: question,
            answers: answers,
            explanation: String(el("questionExplanation").value || "").trim(),
            visible: Boolean(el("questionVisible").checked),
            created_by: currentUser.id
        };

        setLoading(button, true, "Ukladám…");
        let result;
        if (form.dataset.editId) {
            result = await db().from("quiz_questions").update(payload).eq("id", form.dataset.editId);
        } else {
            result = await db().from("quiz_questions").insert(payload);
        }
        setLoading(button, false);

        if (result.error) {
            showToast("Otázka sa nepodarila uložiť.", "error");
            console.error(result.error);
            return;
        }

        form.reset();
        delete form.dataset.editId;
        button.dataset.originalText = "Uložiť otázku";
        button.textContent = "Uložiť otázku";
        el("questionVisible").checked = true;
        showToast("Otázka bola uložená do databázy.");
        await loadQuestions();
    }

    function renderSavedContent() {
        const host = el("adminSavedContent");
        if (!host) return;

        document.querySelectorAll("[data-admin-tab]").forEach(function (button) {
            button.classList.toggle("is-active", button.dataset.adminTab === activeSavedTab);
        });

        const list = activeSavedTab === "questions" ? questions : materials;
        const materialCount = el("adminMaterialCount");
        const questionCount = el("adminQuestionCount");
        if (materialCount) materialCount.textContent = materials.length;
        if (questionCount) questionCount.textContent = questions.length;

        if (!list.length) {
            host.innerHTML = '<div class="admin-empty-state"><strong>Zatiaľ tu nič nie je.</strong><p>Pridaj prvú položku cez formulár vyššie.</p></div>';
            return;
        }

        host.innerHTML = list.map(function (item) {
            const subject = subjectById(item.subject_id);
            const title = activeSavedTab === "questions" ? item.question : item.title;
            const type = activeSavedTab === "questions" ? "Kvízová otázka" : item.type;
            return '<article class="admin-saved-item" data-item-id="' + escapeHtml(item.id) + '">' +
                '<div><span>' + escapeHtml(subject?.name || "Predmet") + ' · ' + escapeHtml(type) + '</span>' +
                '<h3>' + escapeHtml(title) + '</h3>' +
                '<p>' + escapeHtml(activeSavedTab === "questions" ? item.explanation : item.description) + '</p>' +
                '<small>' + (item.visible ? "Viditeľné" : "Skryté") + ' · ' + formatDate(item.updated_at || item.created_at) + '</small></div>' +
                '<div class="admin-saved-actions">' +
                    '<button class="btn secondary" type="button" data-edit-item>Upraviť</button>' +
                    '<button class="btn secondary danger" type="button" data-delete-item>Vymazať</button>' +
                '</div>' +
            '</article>';
        }).join("");

        host.querySelectorAll("[data-edit-item]").forEach(function (button) {
            button.addEventListener("click", function () {
                const id = button.closest("[data-item-id]").dataset.itemId;
                if (activeSavedTab === "questions") editQuestion(id);
                else editMaterial(id);
            });
        });

        host.querySelectorAll("[data-delete-item]").forEach(function (button) {
            button.addEventListener("click", async function () {
                const row = button.closest("[data-item-id]");
                const id = row.dataset.itemId;
                if (!window.confirm("Naozaj chceš túto položku vymazať?")) return;
                const table = activeSavedTab === "questions" ? "quiz_questions" : "materials";
                setLoading(button, true, "Mažem…");
                const result = await db().from(table).delete().eq("id", id);
                setLoading(button, false);
                if (result.error) {
                    showToast("Položku sa nepodarilo vymazať.", "error");
                    return;
                }
                showToast("Položka bola vymazaná.");
                if (activeSavedTab === "questions") await loadQuestions();
                else await loadMaterials();
            });
        });
    }

    function editMaterial(id) {
        const item = materials.find(function (material) { return material.id === id; });
        if (!item) return;
        const form = el("materialForm");
        form.dataset.editId = item.id;
        el("materialSubject").value = item.subject_id;
        el("materialTitle").value = item.title || "";
        el("materialType").value = item.type || "poznamka";
        el("materialDescription").value = item.description || "";
        el("materialUrl").value = item.url || "";
        el("materialVisible").checked = item.visible !== false;
        const button = form.querySelector('button[type="submit"]');
        button.textContent = "Uložiť zmeny";
        button.dataset.originalText = "Uložiť zmeny";
        form.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    function editQuestion(id) {
        const item = questions.find(function (question) { return question.id === id; });
        if (!item) return;
        const form = el("questionForm");
        form.dataset.editId = item.id;
        el("questionSubject").value = item.subject_id;
        el("questionText").value = item.question || "";
        el("questionAnswers").value = answersToText(item.answers);
        el("questionExplanation").value = item.explanation || "";
        el("questionVisible").checked = item.visible !== false;
        const button = form.querySelector('button[type="submit"]');
        button.textContent = "Uložiť zmeny";
        button.dataset.originalText = "Uložiť zmeny";
        form.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    async function saveRoadmap(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const button = form.querySelector('button[type="submit"]');
        const title = String(el("roadmapTitle").value || "").trim();
        if (!title) {
            showToast("Zadaj názov roadmap položky.", "error");
            return;
        }

        const payload = {
            title: title,
            description: String(el("roadmapDescription").value || "").trim(),
            status: el("roadmapStatus").value,
            priority: el("roadmapPriority").value,
            subject: String(el("roadmapSubject").value || "").trim() || null,
            item_type: String(el("roadmapType").value || "").trim() || "funkcia",
            target_date: String(el("roadmapDate").value || "").trim() || null,
            visible: true,
            created_by: currentUser.id
        };

        setLoading(button, true, "Ukladám…");
        let result;
        if (form.dataset.editId) result = await db().from("roadmap_items").update(payload).eq("id", form.dataset.editId);
        else result = await db().from("roadmap_items").insert(payload);
        setLoading(button, false);

        if (result.error) {
            showToast("Roadmap položku sa nepodarilo uložiť.", "error");
            return;
        }

        form.reset();
        delete form.dataset.editId;
        button.textContent = "Uložiť do roadmapy";
        button.dataset.originalText = "Uložiť do roadmapy";
        showToast("Roadmapa bola aktualizovaná.");
        await loadRoadmap();
    }

    function renderRoadmapAdmin() {
        const host = el("adminRoadmapList");
        if (!host) return;
        if (!roadmapItems.length) {
            host.innerHTML = '<div class="admin-empty-state"><strong>Roadmap databáza je prázdna.</strong><p>Pridaj prvú položku.</p></div>';
            return;
        }

        host.innerHTML = roadmapItems.map(function (item) {
            return '<article class="admin-saved-item" data-roadmap-id="' + escapeHtml(item.id) + '">' +
                '<div><span>' + escapeHtml(item.status) + ' · ' + escapeHtml(item.priority) + '</span><h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.description) + '</p></div>' +
                '<div class="admin-saved-actions"><button class="btn secondary" data-edit-roadmap type="button">Upraviť</button><button class="btn secondary danger" data-delete-roadmap type="button">Vymazať</button></div>' +
            '</article>';
        }).join("");

        host.querySelectorAll("[data-edit-roadmap]").forEach(function (button) {
            button.addEventListener("click", function () {
                const id = button.closest("[data-roadmap-id]").dataset.roadmapId;
                const item = roadmapItems.find(function (row) { return row.id === id; });
                if (!item) return;
                const form = el("roadmapForm");
                form.dataset.editId = item.id;
                el("roadmapTitle").value = item.title || "";
                el("roadmapDescription").value = item.description || "";
                el("roadmapStatus").value = item.status || "napady";
                el("roadmapPriority").value = item.priority || "stredna";
                el("roadmapSubject").value = item.subject || "";
                el("roadmapType").value = item.item_type || "funkcia";
                el("roadmapDate").value = item.target_date || "";
                form.querySelector('button[type="submit"]').textContent = "Uložiť zmeny";
                form.scrollIntoView({ behavior: "smooth", block: "center" });
            });
        });

        host.querySelectorAll("[data-delete-roadmap]").forEach(function (button) {
            button.addEventListener("click", async function () {
                const id = button.closest("[data-roadmap-id]").dataset.roadmapId;
                if (!window.confirm("Vymazať položku roadmapy?")) return;
                const result = await db().from("roadmap_items").delete().eq("id", id);
                if (result.error) {
                    showToast("Roadmap položku sa nepodarilo vymazať.", "error");
                    return;
                }
                await loadRoadmap();
            });
        });
    }

    async function saveChangelog(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const button = form.querySelector('button[type="submit"]');
        const version = String(el("changelogVersion").value || "").trim();
        const title = String(el("changelogTitle").value || "").trim();

        if (!version || !title) {
            showToast("Zadaj verziu a názov zmeny.", "error");
            return;
        }

        const payload = {
            version: version,
            release_date: el("changelogDate").value || new Date().toISOString().slice(0, 10),
            change_type: el("changelogType").value,
            title: title,
            description: String(el("changelogDescription").value || "").trim(),
            visible: true,
            created_by: currentUser.id
        };

        setLoading(button, true, "Ukladám…");
        let result;
        if (form.dataset.editId) result = await db().from("changelog_entries").update(payload).eq("id", form.dataset.editId);
        else result = await db().from("changelog_entries").insert(payload);
        setLoading(button, false);

        if (result.error) {
            showToast("Changelog záznam sa nepodarilo uložiť.", "error");
            return;
        }

        form.reset();
        delete form.dataset.editId;
        button.textContent = "Pridať záznam";
        button.dataset.originalText = "Pridať záznam";
        el("changelogDate").value = new Date().toISOString().slice(0, 10);
        showToast("Changelog bol aktualizovaný.");
        await loadChangelog();
    }

    function renderChangelogAdmin() {
        const host = el("adminChangelogList");
        if (!host) return;

        if (!changelogEntries.length) {
            host.innerHTML = '<div class="admin-empty-state"><strong>Changelog databáza je prázdna.</strong><p>Pridaj prvý záznam.</p></div>';
            return;
        }

        host.innerHTML = changelogEntries.map(function (item) {
            return '<article class="admin-saved-item" data-changelog-id="' + escapeHtml(item.id) + '">' +
                '<div><span>' + escapeHtml(item.version) + ' · ' + escapeHtml(item.change_type) + ' · ' + formatDate(item.release_date) + '</span><h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.description) + '</p></div>' +
                '<div class="admin-saved-actions"><button class="btn secondary" data-edit-changelog type="button">Upraviť</button><button class="btn secondary danger" data-delete-changelog type="button">Vymazať</button></div>' +
            '</article>';
        }).join("");

        host.querySelectorAll("[data-edit-changelog]").forEach(function (button) {
            button.addEventListener("click", function () {
                const id = button.closest("[data-changelog-id]").dataset.changelogId;
                const item = changelogEntries.find(function (row) { return row.id === id; });
                if (!item) return;
                const form = el("changelogForm");
                form.dataset.editId = item.id;
                el("changelogVersion").value = item.version || "";
                el("changelogDate").value = item.release_date || "";
                el("changelogType").value = item.change_type || "new";
                el("changelogTitle").value = item.title || "";
                el("changelogDescription").value = item.description || "";
                form.querySelector('button[type="submit"]').textContent = "Uložiť zmeny";
                form.scrollIntoView({ behavior: "smooth", block: "center" });
            });
        });

        host.querySelectorAll("[data-delete-changelog]").forEach(function (button) {
            button.addEventListener("click", async function () {
                const id = button.closest("[data-changelog-id]").dataset.changelogId;
                if (!window.confirm("Vymazať záznam changelogu?")) return;
                const result = await db().from("changelog_entries").delete().eq("id", id);
                if (result.error) {
                    showToast("Changelog záznam sa nepodarilo vymazať.", "error");
                    return;
                }
                await loadChangelog();
            });
        });
    }

    function bindEvents() {
        const loginForm = el("adminLoginForm");
        const loginBtn = el("adminLoginBtn");
        const logoutBtn = el("adminLogoutBtn");
        const materialForm = el("materialForm");
        const questionForm = el("questionForm");
        const roadmapForm = el("roadmapForm");
        const changelogForm = el("changelogForm");

        if (loginForm) loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            if (!loginBtn?.disabled) login();
        });
        if (logoutBtn) logoutBtn.addEventListener("click", logout);
        if (materialForm) materialForm.addEventListener("submit", saveMaterial);
        if (questionForm) questionForm.addEventListener("submit", saveQuestion);
        if (roadmapForm) roadmapForm.addEventListener("submit", saveRoadmap);
        if (changelogForm) changelogForm.addEventListener("submit", saveChangelog);

        document.querySelectorAll("[data-admin-tab]").forEach(function (button) {
            button.addEventListener("click", function () {
                activeSavedTab = button.dataset.adminTab || "materials";
                renderSavedContent();
            });
        });

        if (db()) {
            db().auth.onAuthStateChange(function (event) {
                if (event === "SIGNED_OUT") {
                    currentUser = null;
                    currentProfile = null;
                    sessionStorage.removeItem("studyHubAdminUnlocked");
                    sessionStorage.removeItem("studyHubAdminLoggedIn");
                    const password = el("adminPasswordInput");
                    if (password) password.value = "";
                    showLogin();
                }
            });
        }
    }

    async function init() {
        bindEvents();
        const dateInput = el("changelogDate");
        if (dateInput && !dateInput.value) dateInput.value = new Date().toISOString().slice(0, 10);
        await verifySession();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
