/* Study Hub – checklist localStorage */

(function () {
    function storageKey(section) {
        return "studyHubChecklist:" + (section.dataset.checklistSubject || "general");
    }

    function readState(section) {
        try { return JSON.parse(localStorage.getItem(storageKey(section)) || "{}"); }
        catch { return {}; }
    }

    function saveState(section, state) {
        localStorage.setItem(storageKey(section), JSON.stringify(state));
    }

    function update(section) {
        const items = Array.from(section.querySelectorAll("[data-checklist-item]"));
        const checked = items.filter(item => item.checked).length;
        const count = section.querySelector(".checklist-count");
        const fill = section.querySelector(".checklist-progress-fill");

        if (count) count.textContent = checked + " / " + items.length;
        if (fill) fill.style.width = items.length ? Math.round((checked / items.length) * 100) + "%" : "0%";
    }

    function initChecklist(section) {
        const state = readState(section);
        const items = Array.from(section.querySelectorAll("[data-checklist-item]"));

        items.forEach(item => {
            const id = item.dataset.checklistItem;
            item.checked = !!state[id];

            item.addEventListener("change", () => {
                state[id] = item.checked;
                saveState(section, state);
                update(section);
            });
        });

        section.querySelector(".checklist-complete-btn")?.addEventListener("click", () => {
            items.forEach(item => {
                item.checked = true;
                state[item.dataset.checklistItem] = true;
            });
            saveState(section, state);
            update(section);
        });

        section.querySelector(".checklist-reset-btn")?.addEventListener("click", () => {
            items.forEach(item => {
                item.checked = false;
                state[item.dataset.checklistItem] = false;
            });
            saveState(section, state);
            update(section);
        });

        update(section);
    }

    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".checklist-section[data-checklist-subject]").forEach(initChecklist);
    });
})();
