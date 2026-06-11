// Jednoduché heslo pre statickú stránku.
// POZOR: Pri obyčajnom HTML/JS webe to nie je skutočné serverové zabezpečenie,
// lebo heslo je v zdrojovom kóde. Na reálne zabezpečenie treba Firebase Auth alebo server.
const ADMIN_PASSWORD = "studyhub2026";

const ADMIN_DATA_KEY = "mikStudyAdminData";
const SUBJECT_VISIBILITY_KEY = "studyHubVisibleSubjects";

const STUDY_HUB_SUBJECTS = [
    { id: "vvs", badge: "VVS", title: "Vývoj vstavaných systémov", note: "ESP32, MicroPython" },
    { id: "msd", badge: "MSD", title: "Metódy spracovania dát", note: "Excel, Fourier, zadania" },
    { id: "mat", badge: "MAT", title: "Matematika", note: "DR, Laplace, rady" },
    { id: "ccna", badge: "NET", title: "Cisco / CCNA", note: "VLSM, VLAN, Packet Tracer" },
    { id: "linux", badge: "LNX", title: "Linux Essentials", note: "CLI, chmod, kvíz" },
    { id: "java", badge: "JAVA", title: "Informatika / Java", note: "OOP, UML, semestrálka" },
    { id: "fyzika", badge: "FYZ", title: "Fyzika", note: "vzorce, odvodenia, skúška" },
    { id: "tlac3d", badge: "3D", title: "3D tlač", note: "FDM/FFF, slicer, projekt" },
    { id: "algebra", badge: "ALG", title: "Algebra", note: "matice, Gauss, vektory" },
    { id: "praktikum", badge: "PRG", title: "Praktikum z programovania", note: "Java, ArrayList, OOP" },
    { id: "uvod", badge: "ÚDS", title: "Úvod do štúdia", note: "UML, projekt, obhajoba" }
];

function initAdminLogin() {
    const loginSection = document.getElementById("adminLogin");
    const content = document.getElementById("adminContent");
    const input = document.getElementById("adminPasswordInput");
    const button = document.getElementById("adminLoginBtn");
    const error = document.getElementById("adminLoginError");

    if (!loginSection || !content || !input || !button) {
        return;
    }

    function unlock() {
        sessionStorage.setItem("studyHubAdminUnlocked", "true");
        loginSection.classList.add("hidden");
        content.classList.remove("hidden");
    }

    if (sessionStorage.getItem("studyHubAdminUnlocked") === "true") {
        unlock();
        return;
    }

    function checkPassword() {
        if (input.value === ADMIN_PASSWORD) {
            unlock();
        } else {
            if (error) error.classList.remove("hidden");
            input.value = "";
            input.focus();
        }
    }

    button.addEventListener("click", checkPassword);
    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            checkPassword();
        }
    });

    input.focus();
}

function getData() {
    const saved = localStorage.getItem(ADMIN_DATA_KEY);
    if (!saved) return { materials: [], questions: [] };

    try {
        return JSON.parse(saved);
    } catch (error) {
        return { materials: [], questions: [] };
    }
}

function saveData(data) {
    localStorage.setItem(ADMIN_DATA_KEY, JSON.stringify(data, null, 2));
}

function showExport() {
    const output = document.getElementById("adminOutput");
    if (!output) return;
    output.textContent = JSON.stringify(getData(), null, 2);
}

function initMaterialForm() {
    const form = document.getElementById("materialForm");
    if (!form) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const data = getData();

        data.materials.push({
            subject: document.getElementById("materialSubject")?.value || "",
            title: document.getElementById("materialTitle")?.value || "",
            type: document.getElementById("materialType")?.value || "",
            description: document.getElementById("materialDescription")?.value || "",
            createdAt: new Date().toISOString()
        });

        saveData(data);
        form.reset();
        showExport();
    });
}

function initQuestionForm() {
    const form = document.getElementById("questionForm");
    if (!form) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const data = getData();

        const rawAnswers = (document.getElementById("questionAnswers")?.value || "")
            .split("\n")
            .map(line => line.trim())
            .filter(Boolean);

        const answers = rawAnswers.map(line => {
            const correct = line.startsWith("*");
            return {
                text: correct ? line.slice(1).trim() : line,
                correct
            };
        });

        data.questions.push({
            subject: document.getElementById("questionSubject")?.value || "",
            text: document.getElementById("questionText")?.value || "",
            answers,
            explanation: document.getElementById("questionExplanation")?.value || "",
            createdAt: new Date().toISOString()
        });

        saveData(data);
        form.reset();
        showExport();
    });
}

function initExportButtons() {
    const exportBtn = document.getElementById("exportBtn");
    const clearBtn = document.getElementById("clearBtn");

    if (exportBtn) {
        exportBtn.addEventListener("click", showExport);
    }

    if (clearBtn) {
        clearBtn.addEventListener("click", function () {
            if (confirm("Naozaj chceš vymazať lokálne admin dáta?")) {
                localStorage.removeItem(ADMIN_DATA_KEY);
                showExport();
            }
        });
    }
}

function getVisibleSubjectIds() {
    const allIds = STUDY_HUB_SUBJECTS.map(subject => subject.id);
    const saved = localStorage.getItem(SUBJECT_VISIBILITY_KEY);

    if (!saved) {
        return allIds;
    }

    try {
        const parsed = JSON.parse(saved);
        if (!Array.isArray(parsed)) return allIds;
        return parsed.filter(id => allIds.includes(id));
    } catch (error) {
        return allIds;
    }
}

function saveVisibleSubjectIds(ids) {
    const allIds = STUDY_HUB_SUBJECTS.map(subject => subject.id);
    const cleaned = ids.filter(id => allIds.includes(id));
    localStorage.setItem(SUBJECT_VISIBILITY_KEY, JSON.stringify(cleaned, null, 2));
}

function setSubjectVisibilityStatus(message) {
    const status = document.getElementById("subjectVisibilityStatus");
    if (!status) return;
    status.textContent = message;
}

function renderSubjectVisibilityAdmin() {
    const container = document.getElementById("subjectVisibilityAdmin");
    if (!container) return;

    const visibleIds = new Set(getVisibleSubjectIds());

    container.innerHTML = STUDY_HUB_SUBJECTS.map(subject => `
        <label class="admin-subject-toggle">
            <input type="checkbox" value="${subject.id}" ${visibleIds.has(subject.id) ? "checked" : ""}>
            <span class="admin-subject-toggle-badge">${subject.badge}</span>
            <span class="admin-subject-toggle-text">
                <strong>${subject.title}</strong>
                <small>${subject.note}</small>
            </span>
        </label>
    `).join("");

    updateSubjectVisibilityStatusFromChecks();

    container.querySelectorAll("input[type='checkbox']").forEach(input => {
        input.addEventListener("change", updateSubjectVisibilityStatusFromChecks);
    });
}

function getCheckedSubjectIdsFromAdmin() {
    return Array.from(document.querySelectorAll("#subjectVisibilityAdmin input[type='checkbox']:checked"))
        .map(input => input.value);
}

function updateSubjectVisibilityStatusFromChecks() {
    const checked = getCheckedSubjectIdsFromAdmin();
    setSubjectVisibilityStatus("Vybrané predmety: " + checked.length + " / " + STUDY_HUB_SUBJECTS.length);
}

function initSubjectVisibilityAdmin() {
    const container = document.getElementById("subjectVisibilityAdmin");
    if (!container) return;

    renderSubjectVisibilityAdmin();

    const saveBtn = document.getElementById("saveSubjectVisibilityBtn");
    const selectAllBtn = document.getElementById("selectAllSubjectsBtn");
    const hideAllBtn = document.getElementById("hideAllSubjectsBtn");
    const resetBtn = document.getElementById("resetSubjectVisibilityBtn");

    if (saveBtn) {
        saveBtn.addEventListener("click", function () {
            const ids = getCheckedSubjectIdsFromAdmin();
            saveVisibleSubjectIds(ids);
            setSubjectVisibilityStatus("Uložené. Na stránke Predmety sa zobrazí " + ids.length + " predmetov.");
        });
    }

    if (selectAllBtn) {
        selectAllBtn.addEventListener("click", function () {
            container.querySelectorAll("input[type='checkbox']").forEach(input => input.checked = true);
            updateSubjectVisibilityStatusFromChecks();
        });
    }

    if (hideAllBtn) {
        hideAllBtn.addEventListener("click", function () {
            container.querySelectorAll("input[type='checkbox']").forEach(input => input.checked = false);
            updateSubjectVisibilityStatusFromChecks();
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener("click", function () {
            localStorage.removeItem(SUBJECT_VISIBILITY_KEY);
            renderSubjectVisibilityAdmin();
            setSubjectVisibilityStatus("Resetované. Predvolene sa zobrazujú všetky predmety.");
        });
    }
}

// ===== Podpora stránky – staré lokálne správy od študentov =====

const SUPPORT_KEY = "studyHubSupportMessages";

function getSupportMessagesAdmin() {
    const saved = localStorage.getItem(SUPPORT_KEY);
    if (!saved) return [];

    try {
        return JSON.parse(saved);
    } catch (error) {
        return [];
    }
}

function saveSupportMessagesAdmin(messages) {
    localStorage.setItem(SUPPORT_KEY, JSON.stringify(messages, null, 2));
}

function formatSupportDate(value) {
    try {
        return new Date(value).toLocaleString("sk-SK");
    } catch (error) {
        return value;
    }
}

function escapeSupportHtml(value) {
    return String(value || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function renderSupportMessages() {
    const list = document.getElementById("supportMessagesList");
    if (!list) return;

    const messages = getSupportMessagesAdmin();

    if (messages.length === 0) {
        list.innerHTML = `<div class="support-empty">Zatiaľ nie sú uložené žiadne správy.</div>`;
        return;
    }

    list.innerHTML = messages.map(item => `
        <article class="support-admin-item ${item.status === "vyriešené" ? "resolved" : ""}">
            <div class="support-admin-top">
                <span>${escapeSupportHtml(item.subject)}</span>
                <em>${escapeSupportHtml(item.status || "nové")}</em>
            </div>

            <h3>${escapeSupportHtml(item.title)}</h3>
            <p>${escapeSupportHtml(item.message)}</p>

            <div class="support-admin-meta">
                <strong>Typ:</strong> ${escapeSupportHtml(item.type)}
                ${item.contact ? `<strong>Kontakt:</strong> ${escapeSupportHtml(item.contact)}` : ""}
                <strong>Dátum:</strong> ${formatSupportDate(item.createdAt)}
            </div>

            <div class="support-admin-actions">
                <button type="button" class="btn secondary" onclick="markSupportResolved(${item.id})">Označiť ako vyriešené</button>
                <button type="button" class="btn secondary" onclick="deleteSupportMessage(${item.id})">Vymazať</button>
            </div>
        </article>
    `).join("");
}

function markSupportResolved(id) {
    const messages = getSupportMessagesAdmin().map(item => {
        if (item.id === id) {
            return { ...item, status: "vyriešené" };
        }
        return item;
    });

    saveSupportMessagesAdmin(messages);
    renderSupportMessages();
}

function deleteSupportMessage(id) {
    const messages = getSupportMessagesAdmin().filter(item => item.id !== id);
    saveSupportMessagesAdmin(messages);
    renderSupportMessages();
}

function initSupportAdmin() {
    const refreshSupportBtn = document.getElementById("refreshSupportBtn");
    if (refreshSupportBtn) {
        refreshSupportBtn.addEventListener("click", renderSupportMessages);
    }

    const clearResolvedSupportBtn = document.getElementById("clearResolvedSupportBtn");
    if (clearResolvedSupportBtn) {
        clearResolvedSupportBtn.addEventListener("click", function () {
            const messages = getSupportMessagesAdmin().filter(item => item.status !== "vyriešené");
            saveSupportMessagesAdmin(messages);
            renderSupportMessages();
        });
    }

    renderSupportMessages();
}

function initAdminPage() {
    initAdminLogin();
    initMaterialForm();
    initQuestionForm();
    initExportButtons();
    initSubjectVisibilityAdmin();
    initSupportAdmin();
    showExport();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAdminPage);
} else {
    initAdminPage();
}
