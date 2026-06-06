// Progres učenia a tlačidlá „Označiť ako naučené / urobené / prejdené“

function getLearnedStore() {
    const saved = localStorage.getItem("studyHubProgress");
    if (!saved) return {};
    try { return JSON.parse(saved); } catch { return {}; }
}

function saveLearnedStore(store) {
    localStorage.setItem("studyHubProgress", JSON.stringify(store));
    // spätná kompatibilita so starším názvom z predchádzajúcej verzie
    localStorage.setItem("mikStudyLearned", JSON.stringify(store));
}

function updateSubjectPageProgress() {
    const panel = document.querySelector("[data-progress-subject]");
    if (!panel) return;

    const subjectId = panel.dataset.progressSubject;
    const buttons = document.querySelectorAll(`.learn-btn[data-subject="${subjectId}"]`);
    const store = getLearnedStore();

    let done = 0;

    buttons.forEach(button => {
        const key = `${subjectId}:${button.dataset.key}`;
        const pendingText = button.dataset.pendingText || "Označiť ako naučené";
        const doneText = button.dataset.doneText || "Naučené ✓";

        if (store[key]) {
            done++;
            button.classList.add("done");
            button.textContent = doneText;
        } else {
            button.classList.remove("done");
            button.textContent = pendingText;
        }
    });

    const total = buttons.length || 1;
    const progress = Math.round((done / total) * 100);

    const text = panel.querySelector(".js-subject-progress-text");
    const fill = panel.querySelector(".js-subject-progress-fill");

    if (text) text.textContent = progress + "%";
    if (fill) fill.style.width = progress + "%";
}

function initLearnButtons() {
    document.querySelectorAll(".learn-btn").forEach(button => {
        button.addEventListener("click", function () {
            const subjectId = button.dataset.subject;
            const key = `${subjectId}:${button.dataset.key}`;
            const store = getLearnedStore();

            store[key] = !store[key];

            saveLearnedStore(store);
            updateSubjectPageProgress();
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initLearnButtons();
    updateSubjectPageProgress();
});
