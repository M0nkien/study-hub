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
