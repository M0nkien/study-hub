// Vyhľadávanie vnútri predmetovej stránky

(function () {
    const mount = document.getElementById("subjectSearchMount");
    if (!mount) return;

    mount.innerHTML = `
        <div class="subject-search-panel">
            <label for="subjectSearchInput">Vyhľadávanie v predmete</label>
            <div class="subject-search-row">
                <input id="subjectSearchInput" type="text" placeholder="Hľadať poznámky, príkazy, zadania, otázky..." autocomplete="off">
                <button id="subjectSearchClear" type="button">Vymazať</button>
            </div>
        </div>
    `;

    const input = document.getElementById("subjectSearchInput");
    const clearBtn = document.getElementById("subjectSearchClear");

    const selectors = [
        ".material-card",
        ".example-item",
        ".assignment-card",
        ".study-card",
        ".question-box",
        ".download-item",
        "tbody tr"
    ];

    function normalize(value) {
        return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    }

    function filterContent() {
        const query = normalize(input.value);
        const items = document.querySelectorAll(selectors.join(","));

        items.forEach(item => {
            item.classList.remove("search-hidden");
            item.classList.remove("search-highlight");

            if (!query) return;

            const text = normalize(item.textContent);

            if (text.includes(query)) {
                item.classList.add("search-highlight");
                const parentDetails = item.closest("details");
                if (parentDetails) parentDetails.open = true;
            } else {
                item.classList.add("search-hidden");
            }
        });
    }

    input.addEventListener("input", filterContent);

    clearBtn.addEventListener("click", function () {
        input.value = "";
        filterContent();
        input.focus();
    });
})();
