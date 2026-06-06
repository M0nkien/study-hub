const SUPPORT_KEY = "studyHubSupportMessages";

function getSupportMessages() {
    const saved = localStorage.getItem(SUPPORT_KEY);
    if (!saved) return [];

    try {
        return JSON.parse(saved);
    } catch (error) {
        return [];
    }
}

function saveSupportMessages(messages) {
    localStorage.setItem(SUPPORT_KEY, JSON.stringify(messages, null, 2));
}

const supportForm = document.getElementById("supportForm");
const supportStatus = document.getElementById("supportStatus");

if (supportForm) {
    supportForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const messages = getSupportMessages();

        messages.unshift({
            id: Date.now(),
            type: document.getElementById("supportType").value,
            subject: document.getElementById("supportSubject").value,
            title: document.getElementById("supportTitle").value.trim(),
            message: document.getElementById("supportMessage").value.trim(),
            contact: document.getElementById("supportContact").value.trim(),
            status: "nové",
            createdAt: new Date().toISOString()
        });

        saveSupportMessages(messages);

        supportForm.reset();

        supportStatus.className = "support-status success";
        supportStatus.textContent = "Správa bola uložená. Admin ju uvidí v admin paneli.";
    });
}
