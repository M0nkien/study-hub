// Checklist pred skúškou pre každý predmet

const CHECKLIST_KEY = "studyHubChecklist";

function getChecklistStore() {
    const saved = localStorage.getItem(CHECKLIST_KEY);
    if (!saved) return {};
    try { return JSON.parse(saved); } catch { return {}; }
}

function saveChecklistStore(store) {
    localStorage.setItem(CHECKLIST_KEY, JSON.stringify(store));
}

function updateChecklist(subject) {
    const boxes = document.querySelectorAll(`input[data-checklist-subject="${subject}"]`);
    const store = getChecklistStore();
    let done = 0;

    boxes.forEach(box => {
        const key = `${subject}:${box.dataset.checklistItem}`;
        box.checked = !!store[key];
        if (box.checked) done++;
    });

    const count = document.querySelector(`[data-checklist-count="${subject}"]`);
    const fill = document.querySelector(`[data-checklist-fill="${subject}"]`);
    const percent = boxes.length ? Math.round((done / boxes.length) * 100) : 0;

    if (count) count.textContent = done;
    if (fill) fill.style.width = percent + "%";
}

document.addEventListener("DOMContentLoaded", function () {
    const store = getChecklistStore();
    const subjects = new Set();

    document.querySelectorAll("input[data-checklist-subject]").forEach(box => {
        subjects.add(box.dataset.checklistSubject);

        const key = `${box.dataset.checklistSubject}:${box.dataset.checklistItem}`;
        box.checked = !!store[key];

        box.addEventListener("change", function () {
            const next = getChecklistStore();
            next[key] = box.checked;
            saveChecklistStore(next);
            updateChecklist(box.dataset.checklistSubject);
        });
    });

    subjects.forEach(updateChecklist);
});
