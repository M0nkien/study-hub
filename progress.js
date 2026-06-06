// Progres učenia a tlačidlá „Označiť ako naučené“

function getLearnedStore() {
    const saved = localStorage.getItem("mikStudyLearned");
    if (!saved) return {};
    try { return JSON.parse(saved); } catch { return {}; }
}

function saveLearnedStore(store) {
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

        if (store[key]) {
            done++;
            button.classList.add("done");
            button.textContent = "Naučené ✓";
        } else {
            button.classList.remove("done");
            button.textContent = "Označiť ako naučené";
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
