// Filtrovanie materiálov podľa typu: PDF, kvíz, zadanie, ťahák

function initMaterialFilters() {
    document.querySelectorAll("[data-filter-panel]").forEach(panel => {
        const targetSelector = panel.dataset.target || ".filterable-material";

        panel.querySelectorAll(".filter-btn").forEach(button => {
            button.addEventListener("click", function () {
                const type = button.dataset.filter;

                panel.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                document.querySelectorAll(targetSelector).forEach(item => {
                    const itemType = (item.dataset.type || "").toLowerCase();

                    if (type === "all" || itemType === type) {
                        item.classList.remove("search-hidden");
                    } else {
                        item.classList.add("search-hidden");
                    }
                });
            });
        });
    });
}

document.addEventListener("DOMContentLoaded", initMaterialFilters);
