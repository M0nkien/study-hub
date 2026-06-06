// Hlavné funkcie: vyhľadávanie na indexe, mobilné menu, progres na kartách

const SUBJECT_TOTALS = {
    linux: 4,
    msd: 4,
    ccna: 6,
    vvs: 5,
    mat: 5,
    java: 5
};

function getLearned() {
    const saved = localStorage.getItem("mikStudyLearned");
    if (!saved) return {};
    try { return JSON.parse(saved); } catch { return {}; }
}

function getSubjectProgress(subjectId) {
    const learned = getLearned();
    const count = Object.keys(learned).filter(key => key.startsWith(subjectId + ":") && learned[key]).length;
    const total = SUBJECT_TOTALS[subjectId] || 1;
    return Math.min(100, Math.round((count / total) * 100));
}

function updateIndexProgress() {
    document.querySelectorAll("[data-subject-id]").forEach(card => {
        const subjectId = card.dataset.subjectId;
        const progress = getSubjectProgress(subjectId);
        const text = card.querySelector(".js-progress-text");
        const fill = card.querySelector(".js-progress-fill");

        if (text) text.textContent = progress + "%";
        if (fill) fill.style.width = progress + "%";
    });
}

function initIndexSearch() {
    const searchInput = document.getElementById("searchInput");
    const subjectCards = document.querySelectorAll(".subject-card");

    if (!searchInput) return;

    searchInput.addEventListener("input", function () {
        const searchText = searchInput.value.toLowerCase().trim();

        subjectCards.forEach(function (card) {
            const text = (card.dataset.search || "").toLowerCase();
            card.style.display = text.includes(searchText) ? "block" : "none";
        });
    });
}

function initMobileMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
        nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => nav.classList.remove("open"));
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initMobileMenu();
    initIndexSearch();
    updateIndexProgress();
});
