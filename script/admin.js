/* StudyHub v2.1.1 - funkčný lokálny Admin editor */
(function () {
    "use strict";

    const DEFAULT_PASSWORD = "studyhub";
    const SUBJECTS = [
        { id: "vvs", name: "VVS", href: "subjects/vvs.html", status: "Rozpracované" },
        { id: "msd", name: "MSD", href: "subjects/msd.html", status: "Rozpracované" },
        { id: "mat", name: "Matematika", href: "subjects/mat.html", status: "Rozpracované" },
        { id: "ccna", name: "CCNA", href: "subjects/ccna.html", status: "Rozpracované" },
        { id: "linux", name: "Linux", href: "subjects/linux.html", status: "Hotové" },
        { id: "java", name: "Java", href: "subjects/java.html", status: "Rozpracované" },
        { id: "fyzika", name: "Fyzika", href: "subjects/fyzika.html", status: "Hotové" },
        { id: "tlac3d", name: "3D tlač", href: "subjects/3d-tlac.html", status: "Pripravované" },
        { id: "algebra", name: "Algebra", href: "subjects/algebra.html", status: "Pripravované" },
        { id: "praktikum", name: "Praktikum z programovania", href: "subjects/praktikum.html", status: "Pripravované" },
        { id: "uvod", name: "Úvod do štúdia", href: "subjects/uvod-do-studia.html", status: "Pripravované" }
    ];

    function parseJSON(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch (e) { return fallback; }
    }

    function saveJSON(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function uid(prefix) {
        return prefix + "-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
    }

    function setLoginState(loggedIn) {
        const login = document.getElementById("adminLogin");
        const content = document.getElementById("adminContent");
        if (login) login.classList.toggle("hidden", loggedIn);
        if (content) content.classList.toggle("hidden", !loggedIn);
        if (loggedIn) sessionStorage.setItem("studyHubAdminLoggedIn", "1");
    }

    function initLogin() {
        const input = document.getElementById("adminPasswordInput");
        const btn = document.getElementById("adminLoginBtn");
        const error = document.getElementById("adminLoginError");
        if (!input || !btn) return;

        if (sessionStorage.getItem("studyHubAdminLoggedIn") === "1") setLoginState(true);

        function login() {
            const configured = localStorage.getItem("studyHubAdminPassword") || DEFAULT_PASSWORD;
            if (input.value === configured) {
                if (error) error.classList.add("hidden");
                input.value = "";
                setLoginState(true);
                window.setTimeout(function () { window.scrollTo({ top: 0, behavior: "smooth" }); }, 10);
            } else {
                if (error) error.classList.remove("hidden");
                input.select();
            }
        }
        btn.addEventListener("click", login);
        input.addEventListener("keydown", function (event) { if (event.key === "Enter") login(); });
    }

    function fillSubjectSelects() {
        ["materialSubject", "questionSubject"].forEach(function (id) {
            const select = document.getElementById(id);
            if (!select) return;
            const current = select.value;
            select.innerHTML = "";
            SUBJECTS.forEach(function (subject) {
                const option = document.createElement("option");
                option.value = subject.name;
                option.textContent = subject.name;
                select.appendChild(option);
            });
            if (SUBJECTS.some(function (x) { return x.name === current; })) select.value = current;
        });
    }

    function showStatus(text, type) {
        let toast = document.querySelector(".admin-v21-toast");
        if (!toast) {
            toast = document.createElement("div");
            toast.className = "admin-v21-toast";
            document.body.appendChild(toast);
        }
        toast.textContent = text;
        toast.className = "admin-v21-toast is-visible " + (type || "success");
        clearTimeout(showStatus.timer);
        showStatus.timer = setTimeout(function () { toast.classList.remove("is-visible"); }, 2600);
    }

    function parseAnswers(raw) {
        return String(raw || "").split(/\r?\n/).map(function (line) { return line.trim(); }).filter(Boolean).map(function (line) {
            const correct = line.startsWith("*");
            return { text: correct ? line.slice(1).trim() : line, correct: correct };
        });
    }

    function answersToText(answers) {
        if (!Array.isArray(answers)) return "";
        return answers.map(function (answer) { return (answer.correct ? "*" : "") + answer.text; }).join("\n");
    }

    function initMaterialForm() {
        const form = document.getElementById("materialForm");
        if (!form) return;
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const title = document.getElementById("materialTitle").value.trim();
            const description = document.getElementById("materialDescription").value.trim();
            if (!title) { showStatus("Zadaj názov materiálu.", "error"); return; }
            const items = parseJSON("studyHubAdminMaterials", []);
            const editId = form.dataset.editId;
            const item = {
                id: editId || uid("mat"),
                subject: document.getElementById("materialSubject").value,
                title: title,
                type: document.getElementById("materialType").value,
                description: description,
                updatedAt: new Date().toISOString()
            };
            if (editId) {
                const index = items.findIndex(function (x) { return x.id === editId; });
                if (index >= 0) items[index] = Object.assign({}, items[index], item);
                delete form.dataset.editId;
                form.querySelector('button[type="submit"]').textContent = "Uložiť materiál";
                showStatus("Materiál bol upravený.");
            } else {
                item.createdAt = item.updatedAt;
                items.unshift(item);
                showStatus("Materiál bol uložený.");
            }
            saveJSON("studyHubAdminMaterials", items);
            form.reset();
            fillSubjectSelects();
            renderSavedContent("materials");
        });
    }

    function initQuestionForm() {
        const form = document.getElementById("questionForm");
        if (!form) return;
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const question = document.getElementById("questionText").value.trim();
            const answers = parseAnswers(document.getElementById("questionAnswers").value);
            if (!question) { showStatus("Zadaj text otázky.", "error"); return; }
            if (answers.length < 2 || !answers.some(function (a) { return a.correct; })) {
                showStatus("Zadaj aspoň 2 odpovede a správnu označ hviezdičkou *.", "error"); return;
            }
            const items = parseJSON("studyHubAdminQuestions", []);
            const editId = form.dataset.editId;
            const item = {
                id: editId || uid("q"),
                subject: document.getElementById("questionSubject").value,
                question: question,
                answers: answers,
                explanation: document.getElementById("questionExplanation").value.trim(),
                updatedAt: new Date().toISOString()
            };
            if (editId) {
                const index = items.findIndex(function (x) { return x.id === editId; });
                if (index >= 0) items[index] = Object.assign({}, items[index], item);
                delete form.dataset.editId;
                form.querySelector('button[type="submit"]').textContent = "Uložiť otázku";
                showStatus("Otázka bola upravená.");
            } else {
                item.createdAt = item.updatedAt;
                items.unshift(item);
                showStatus("Otázka bola uložená.");
            }
            saveJSON("studyHubAdminQuestions", items);
            form.reset();
            fillSubjectSelects();
            renderSavedContent("questions");
        });
    }

    function renderSavedContent(forcedTab) {
        const host = document.getElementById("adminSavedContent");
        if (!host) return;
        const tabs = Array.from(document.querySelectorAll("[data-admin-tab]"));
        let tab = forcedTab || (tabs.find(function (x) { return x.classList.contains("is-active"); }) || {}).dataset?.adminTab || "materials";
        tabs.forEach(function (btn) { btn.classList.toggle("is-active", btn.dataset.adminTab === tab); });
        const materials = parseJSON("studyHubAdminMaterials", []);
        const questions = parseJSON("studyHubAdminQuestions", []);
        const mc = document.getElementById("adminMaterialCount");
        const qc = document.getElementById("adminQuestionCount");
        if (mc) mc.textContent = materials.length;
        if (qc) qc.textContent = questions.length;
        const list = tab === "questions" ? questions : materials;
        if (!list.length) {
            host.innerHTML = '<div class="admin-empty-state"><strong>Zatiaľ tu nič nie je.</strong><p>Pridaj prvú položku cez formulár vyššie.</p></div>';
            return;
        }
        host.innerHTML = "";
        list.forEach(function (item) {
            const row = document.createElement("article");
            row.className = "admin-saved-item";
            const title = tab === "questions" ? item.question : item.title;
            const meta = [item.subject, tab === "questions" ? "kvízová otázka" : item.type].filter(Boolean).join(" · ");
            row.innerHTML = '<div><span></span><h3></h3><p></p></div><div class="admin-saved-actions"><button class="btn secondary" type="button" data-edit>Upraviť</button><button class="btn secondary danger" type="button" data-delete>Vymazať</button></div>';
            row.querySelector("span").textContent = meta;
            row.querySelector("h3").textContent = title || "Bez názvu";
            row.querySelector("p").textContent = tab === "questions" ? (item.explanation || "Bez vysvetlenia") : (item.description || "Bez popisu");
            row.querySelector("[data-delete]").addEventListener("click", function () {
                if (!window.confirm('Vymazať položku „' + (title || "") + '“?')) return;
                const key = tab === "questions" ? "studyHubAdminQuestions" : "studyHubAdminMaterials";
                const source = parseJSON(key, []).filter(function (x) { return x.id !== item.id; });
                saveJSON(key, source);
                renderSavedContent(tab);
                showStatus("Položka bola vymazaná.");
            });
            row.querySelector("[data-edit]").addEventListener("click", function () {
                if (tab === "questions") {
                    const form = document.getElementById("questionForm");
                    form.dataset.editId = item.id;
                    document.getElementById("questionSubject").value = item.subject;
                    document.getElementById("questionText").value = item.question || "";
                    document.getElementById("questionAnswers").value = answersToText(item.answers);
                    document.getElementById("questionExplanation").value = item.explanation || "";
                    form.querySelector('button[type="submit"]').textContent = "Uložiť zmeny otázky";
                    form.scrollIntoView({ behavior: "smooth", block: "center" });
                } else {
                    const form = document.getElementById("materialForm");
                    form.dataset.editId = item.id;
                    document.getElementById("materialSubject").value = item.subject;
                    document.getElementById("materialTitle").value = item.title || "";
                    document.getElementById("materialType").value = item.type || "pdf";
                    document.getElementById("materialDescription").value = item.description || "";
                    form.querySelector('button[type="submit"]').textContent = "Uložiť zmeny materiálu";
                    form.scrollIntoView({ behavior: "smooth", block: "center" });
                }
            });
            host.appendChild(row);
        });
    }

    function initSavedTabs() {
        document.querySelectorAll("[data-admin-tab]").forEach(function (button) {
            button.addEventListener("click", function () { renderSavedContent(button.dataset.adminTab); });
        });
        renderSavedContent("materials");
    }

    function renderVisibilityEditor() {
        const host = document.getElementById("subjectVisibilityAdmin");
        if (!host) return;
        const visibility = parseJSON("studyHubSubjectVisibility", {});
        host.innerHTML = "";
        SUBJECTS.forEach(function (subject) {
            const visible = visibility[subject.id] !== false;
            const label = document.createElement("label");
            label.className = "admin-subject-option";
            label.innerHTML = '<span class="admin-subject-check"><input type="checkbox" data-subject-id="' + subject.id + '" ' + (visible ? 'checked' : '') + '><i></i></span><div><strong>' + subject.name + '</strong><small>' + subject.status + '</small></div><a href="' + subject.href + '" target="_blank" rel="noopener">Otvoriť →</a>';
            host.appendChild(label);
        });
        updateHiddenPreview();
    }

    function currentVisibilityFromForm() {
        const value = {};
        document.querySelectorAll("#subjectVisibilityAdmin input[data-subject-id]").forEach(function (input) {
            value[input.dataset.subjectId] = input.checked;
        });
        return value;
    }

    function updateHiddenPreview() {
        const host = document.getElementById("hiddenSubjectsPreview");
        if (!host) return;
        const formInputs = document.querySelectorAll("#subjectVisibilityAdmin input[data-subject-id]");
        let visibility;
        if (formInputs.length) visibility = currentVisibilityFromForm();
        else visibility = parseJSON("studyHubSubjectVisibility", {});
        const hidden = SUBJECTS.filter(function (s) { return visibility[s.id] === false; });
        host.innerHTML = hidden.length ? '<strong>Skryté predmety:</strong> ' + hidden.map(function (x) { return x.name; }).join(", ") : '<strong>Skryté predmety:</strong> žiadne';
    }

    function initVisibilityEditor() {
        renderVisibilityEditor();
        const host = document.getElementById("subjectVisibilityAdmin");
        if (host) host.addEventListener("change", updateHiddenPreview);
        const all = document.getElementById("selectAllSubjectsBtn");
        const none = document.getElementById("hideAllSubjectsBtn");
        const reset = document.getElementById("resetSubjectVisibilityBtn");
        const save = document.getElementById("saveSubjectVisibilityBtn");
        if (all) all.addEventListener("click", function () { host.querySelectorAll('input[type="checkbox"]').forEach(function (x) { x.checked = true; }); updateHiddenPreview(); });
        if (none) none.addEventListener("click", function () { host.querySelectorAll('input[type="checkbox"]').forEach(function (x) { x.checked = false; }); updateHiddenPreview(); });
        if (reset) reset.addEventListener("click", function () { localStorage.removeItem("studyHubSubjectVisibility"); renderVisibilityEditor(); showStatus("Viditeľnosť bola resetovaná."); });
        if (save) save.addEventListener("click", function () {
            saveJSON("studyHubSubjectVisibility", currentVisibilityFromForm());
            const status = document.getElementById("subjectVisibilityStatus");
            if (status) status.textContent = "Uložené " + new Date().toLocaleTimeString("sk-SK", { hour: "2-digit", minute: "2-digit" }) + ".";
            showStatus("Viditeľnosť predmetov bola uložená.");
        });
    }

    function initExport() {
        const exportBtn = document.getElementById("exportBtn");
        const clearBtn = document.getElementById("clearBtn");
        const output = document.getElementById("adminOutput");
        if (exportBtn && output) exportBtn.addEventListener("click", function () {
            const data = {
                version: "2.1.0",
                exportedAt: new Date().toISOString(),
                materials: parseJSON("studyHubAdminMaterials", []),
                questions: parseJSON("studyHubAdminQuestions", []),
                subjectVisibility: parseJSON("studyHubSubjectVisibility", {})
            };
            output.textContent = JSON.stringify(data, null, 2);
            output.scrollIntoView({ behavior: "smooth", block: "center" });
        });
        if (clearBtn) clearBtn.addEventListener("click", function () {
            if (!window.confirm("Naozaj vymazať lokálne admin materiály, otázky a nastavenie viditeľnosti predmetov?")) return;
            ["studyHubAdminMaterials", "studyHubAdminQuestions", "studyHubSubjectVisibility"].forEach(function (key) { localStorage.removeItem(key); });
            renderSavedContent("materials");
            renderVisibilityEditor();
            if (output) output.textContent = "";
            showStatus("Lokálne admin dáta boli vymazané.");
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        initLogin();
        fillSubjectSelects();
        initMaterialForm();
        initQuestionForm();
        initSavedTabs();
        initVisibilityEditor();
        initExport();
    });
})();
