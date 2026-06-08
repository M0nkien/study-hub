/* =========================================================
   Study Hub – GitHub repair JS
   Opravuje filter predmetov aj vtedy, keď starý main.js zlyhá.
   ========================================================= */

(function () {
    function normalizeText(value) {
        return String(value || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    function cleanupDuplicateSubjectStatus() {
        document.querySelectorAll(".subject-card").forEach(function (card) {
            card.querySelectorAll(".subject-status").forEach(function (el) {
                el.remove();
            });

            const ribbons = card.querySelectorAll(".subject-state-ribbon");
            ribbons.forEach(function (ribbon, index) {
                if (index > 0) ribbon.remove();
            });
        });
    }

    function initSubjectFilter() {
        const input = document.getElementById("subjectFilterInput");
        const reset = document.getElementById("subjectFilterReset");
        const count = document.getElementById("subjectFilterCount");
        const empty = document.getElementById("subjectFilterEmpty");
        const chips = Array.from(document.querySelectorAll("[data-status-filter]"));
        const cards = Array.from(document.querySelectorAll(".subjects-grid .subject-card"));

        if (!input || !cards.length) {
            if (count) count.textContent = "Zobrazené predmety: " + cards.length;
            return;
        }

        let activeStatus = "all";

        function cardText(card) {
            return normalizeText([
                card.dataset.search || "",
                card.dataset.subjectId || "",
                card.textContent || ""
            ].join(" "));
        }

        function cardStatus(card) {
            const statusEl = card.querySelector(".subject-state-ribbon span");
            return normalizeText(statusEl ? statusEl.textContent : "");
        }

        function applyFilter() {
            const words = normalizeText(input.value).split(/\s+/).filter(Boolean);
            let visible = 0;

            cards.forEach(function (card) {
                const text = cardText(card);
                const status = cardStatus(card);

                const textMatch = words.length === 0 || words.every(function (word) {
                    return text.includes(word);
                });

                const statusMatch = activeStatus === "all" || status.includes(normalizeText(activeStatus));
                const show = textMatch && statusMatch;

                card.hidden = !show;
                if (show) visible++;
            });

            if (count) count.textContent = "Zobrazené predmety: " + visible + " / " + cards.length;
            if (empty) empty.hidden = visible !== 0;
        }

        input.addEventListener("input", applyFilter);

        if (reset) {
            reset.addEventListener("click", function () {
                input.value = "";
                activeStatus = "all";
                chips.forEach(function (chip) {
                    chip.classList.toggle("active", chip.dataset.statusFilter === "all");
                });
                applyFilter();
                input.focus();
            });
        }

        chips.forEach(function (chip) {
            chip.addEventListener("click", function () {
                activeStatus = chip.dataset.statusFilter || "all";
                chips.forEach(function (item) {
                    item.classList.toggle("active", item === chip);
                });
                applyFilter();
            });
        });

        applyFilter();
    }

    function initRepair() {
        cleanupDuplicateSubjectStatus();
        initSubjectFilter();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initRepair);
    } else {
        initRepair();
    }
})();
