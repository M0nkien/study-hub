/* =========================================================
   Study Hub – viditeľnosť predmetov podľa Admin nastavenia
   ========================================================= */

(function () {
    const SUBJECT_VISIBILITY_KEY = "studyHubVisibleSubjects";

    function getCards() {
        return Array.from(document.querySelectorAll(".subjects-grid .subject-card[data-subject-id]"));
    }

    function getSavedVisibleIds(cards) {
        const allIds = cards.map(card => card.dataset.subjectId).filter(Boolean);
        const saved = localStorage.getItem(SUBJECT_VISIBILITY_KEY);

        if (!saved) {
            return new Set(allIds);
        }

        try {
            const parsed = JSON.parse(saved);
            if (!Array.isArray(parsed)) return new Set(allIds);
            return new Set(parsed.filter(id => allIds.includes(id)));
        } catch (error) {
            return new Set(allIds);
        }
    }

    function updateCounter(cards) {
        const count = document.getElementById("subjectFilterCount");
        const empty = document.getElementById("subjectFilterEmpty");
        if (!count && !empty) return;

        const allowedCards = cards.filter(card => card.dataset.adminVisible !== "false");
        const visibleCards = allowedCards.filter(card => !card.hidden);

        if (count) {
            count.textContent = "Zobrazené predmety: " + visibleCards.length + " / " + allowedCards.length;
        }

        if (empty) {
            if (allowedCards.length === 0) {
                empty.hidden = false;
                empty.textContent = "V admin paneli nemáš povolený žiadny predmet. Otvor Admin → Viditeľnosť predmetov.";
            } else {
                empty.hidden = visibleCards.length !== 0;
                empty.textContent = "Nič sa nenašlo. Skús kratší výraz alebo iný tag.";
            }
        }
    }

    function applySubjectVisibility() {
        const cards = getCards();
        if (!cards.length) return;

        const visibleIds = getSavedVisibleIds(cards);

        cards.forEach(card => {
            const id = card.dataset.subjectId;
            const isAllowed = visibleIds.has(id);

            card.dataset.adminVisible = isAllowed ? "true" : "false";
            card.classList.toggle("subject-admin-hidden", !isAllowed);

            if (!isAllowed) {
                card.hidden = true;
            }
        });

        updateCounter(cards);
    }

    function delayedApply() {
        window.setTimeout(applySubjectVisibility, 0);
    }

    function initSubjectVisibility() {
        applySubjectVisibility();

        const input = document.getElementById("subjectFilterInput");
        const reset = document.getElementById("subjectFilterReset");
        const chips = Array.from(document.querySelectorAll("[data-status-filter]"));

        if (input) input.addEventListener("input", delayedApply);
        if (reset) reset.addEventListener("click", delayedApply);
        chips.forEach(chip => chip.addEventListener("click", delayedApply));

        window.addEventListener("storage", function (event) {
            if (event.key === SUBJECT_VISIBILITY_KEY) {
                applySubjectVisibility();
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initSubjectVisibility);
    } else {
        initSubjectVisibility();
    }
})();
