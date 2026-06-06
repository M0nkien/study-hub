// Jednoduché heslo pre statickú stránku.
// POZOR: Pri obyčajnom HTML/JS webe to nie je skutočné serverové zabezpečenie,
// lebo heslo je v zdrojovom kóde. Na reálne zabezpečenie treba Firebase Auth alebo server.
const ADMIN_PASSWORD = "studyhub2026";

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
            error.classList.remove("hidden");
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

initAdminLogin();

const STORAGE_KEY = "mikStudyAdminData";

function getData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return { materials: [], questions: [] };

    try { return JSON.parse(saved); } catch { return { materials: [], questions: [] }; }
}

function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data, null, 2));
}

function showExport() {
    document.getElementById("adminOutput").textContent = JSON.stringify(getData(), null, 2);
}

document.getElementById("materialForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const data = getData();

    data.materials.push({
        subject: document.getElementById("materialSubject").value,
        title: document.getElementById("materialTitle").value,
        type: document.getElementById("materialType").value,
        description: document.getElementById("materialDescription").value,
        createdAt: new Date().toISOString()
    });

    saveData(data);
    this.reset();
    showExport();
});

document.getElementById("questionForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const data = getData();

    const rawAnswers = document.getElementById("questionAnswers").value
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
        subject: document.getElementById("questionSubject").value,
        text: document.getElementById("questionText").value,
        answers,
        explanation: document.getElementById("questionExplanation").value,
        createdAt: new Date().toISOString()
    });

    saveData(data);
    this.reset();
    showExport();
});

document.getElementById("exportBtn").addEventListener("click", showExport);

document.getElementById("clearBtn").addEventListener("click", function () {
    if (confirm("Naozaj chceš vymazať lokálne admin dáta?")) {
        localStorage.removeItem(STORAGE_KEY);
        showExport();
    }
});

showExport();



// ===== Podpora stránky – správy od študentov =====

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
                <span>${item.subject}</span>
                <em>${item.status || "nové"}</em>
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

function escapeSupportHtml(value) {
    return String(value || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
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
