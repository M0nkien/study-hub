// Hlavné funkcie: vyhľadávanie na indexe, mobilné menu, progres na kartách

const SUBJECT_TOTALS = {
    linux: 4,
    msd: 4,
    ccna: 6,
    vvs: 5,
    mat: 5,
    java: 5,
    fyzika: 8
};

function getLearned() {
    const saved = localStorage.getItem("studyHubProgress") || localStorage.getItem("mikStudyLearned");
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



/* =========================================================
   Study Hub – dashboard, status predmetov a pokračovanie
   ========================================================= */

const STUDY_HUB_SUBJECT_STATUS = {
    linux: { label: "hotové", className: "status-done", updated: "Linux kvíz a štúdium príkazov sú pripravené" },
    msd: { label: "dopĺňa sa", className: "status-updating", updated: "Rozšírené zadania, Excel vzorce a chyby" },
    ccna: { label: "dopĺňa sa", className: "status-updating", updated: "Packet Tracer, VLSM a troubleshooting" },
    vvs: { label: "rozpracované", className: "status-progress", updated: "Pripravujú sa kódy a obhajoba" },
    mat: { label: "rozpracované", className: "status-progress", updated: "Pripravujú sa DR, Laplace a rady" },
    java: { label: "rozpracované", className: "status-progress", updated: "Pripravuje sa OOP a semestrálka" },
    fyzika: { label: "dopĺňa sa", className: "status-updating", updated: "Pridané vzorce, jednotky a otázky" }
};

function addSubjectStatusBadges() {
    document.querySelectorAll(".subject-card[data-subject-id]").forEach(card => {
        const subjectId = card.dataset.subjectId;
        const status = STUDY_HUB_SUBJECT_STATUS[subjectId];

        if (!status || card.querySelector(".subject-status")) return;

        const statusEl = document.createElement("div");
        statusEl.className = "subject-status " + status.className;
        statusEl.innerHTML = `<span>${status.label}</span><small>${status.updated}</small>`;

        const cardTop = card.querySelector(".card-top");
        if (cardTop) cardTop.insertAdjacentElement("afterend", statusEl);
    });
}

function normalizeStudyHubHref() {
    const path = window.location.pathname.replace(/\\/g, "/");
    const hash = window.location.hash || "";

    const subjectMatch = path.match(/subjects\/([^\/]+\.html)$/);
    if (subjectMatch) return "subjects/" + subjectMatch[1] + hash;
    if (path.endsWith("subjects.html")) return "subjects.html";
    if (path.endsWith("flashcards.html")) return "flashcards.html";
    if (path.endsWith("results.html")) return "results.html";
    if (path.endsWith("roadmap.html")) return "roadmap.html";
    return "";
}

function saveLastStudyLocation(label) {
    const href = normalizeStudyHubHref();
    if (!href) return;

    localStorage.setItem("studyHubLastLocation", JSON.stringify({
        href,
        label: label || document.title || "Study Hub",
        savedAt: new Date().toISOString()
    }));
}

function initLastLocationTracking() {
    const href = normalizeStudyHubHref();
    if (href && href.includes("subjects/")) {
        saveLastStudyLocation(document.title.replace("| Study Hub", "").trim());
    }

    window.addEventListener("hashchange", function () {
        const hrefNow = normalizeStudyHubHref();
        if (hrefNow.includes("subjects/")) {
            const activeSection = document.querySelector(window.location.hash);
            const title = activeSection ? activeSection.querySelector("h2")?.textContent : document.title;
            saveLastStudyLocation(title || document.title);
        }
    });

    document.querySelectorAll(".subject-sidebar a").forEach(link => {
        link.addEventListener("click", function () {
            setTimeout(() => saveLastStudyLocation(link.textContent.trim()), 100);
        });
    });
}

function initContinueButton() {
    const btn = document.getElementById("continueLearningBtn");
    const label = document.getElementById("continueLearningLabel");
    if (!btn) return;

    const savedRaw = localStorage.getItem("studyHubLastLocation");
    if (!savedRaw) {
        btn.href = "subjects.html";
        if (label) label.textContent = "Zatiaľ nemáš uložené miesto. Začni výberom predmetu.";
        return;
    }

    try {
        const saved = JSON.parse(savedRaw);
        btn.href = saved.href || "subjects.html";
        if (label) label.textContent = "Naposledy: " + (saved.label || saved.href);
    } catch {
        btn.href = "subjects.html";
    }
}

function updateDashboard() {
    const dash = document.getElementById("studyHubDashboard");
    if (!dash) return;

    const learnedRaw = localStorage.getItem("studyHubProgress") || localStorage.getItem("mikStudyLearned") || "{}";
    const resultsRaw = localStorage.getItem("studyHubQuizResults") || "[]";
    const lastRaw = localStorage.getItem("studyHubLastLocation");

    let learned = {};
    let results = [];
    let last = null;

    try { learned = JSON.parse(learnedRaw); } catch {}
    try { results = JSON.parse(resultsRaw); } catch {}
    try { last = lastRaw ? JSON.parse(lastRaw) : null; } catch {}

    const doneSections = Object.values(learned).filter(Boolean).length;
    const best = results.length ? Math.max(...results.map(r => r.percent || 0)) : 0;
    const inProgress = Object.values(STUDY_HUB_SUBJECT_STATUS).filter(s => s.label !== "hotové").length;

    const dashInProgress = document.getElementById("dashInProgress");
    const dashDoneSections = document.getElementById("dashDoneSections");
    const dashBestQuiz = document.getElementById("dashBestQuiz");
    const dashLastOpen = document.getElementById("dashLastOpen");

    if (dashInProgress) dashInProgress.textContent = inProgress;
    if (dashDoneSections) dashDoneSections.textContent = doneSections;
    if (dashBestQuiz) dashBestQuiz.textContent = best + "%";
    if (dashLastOpen) dashLastOpen.textContent = last ? last.label : "—";
}

function addMaterialTags() {
    document.querySelectorAll(".material-card.filterable-material").forEach(card => {
        if (card.querySelector(".material-tags")) return;

        const type = card.dataset.type || "materiál";
        const tags = [type];

        if (card.textContent.toLowerCase().includes("skúšk")) tags.push("skúška");
        if (card.textContent.toLowerCase().includes("lab")) tags.push("lab");
        if (card.textContent.toLowerCase().includes("výpoč")) tags.push("výpočet");
        if (card.textContent.toLowerCase().includes("teóri")) tags.push("teória");

        const tagBox = document.createElement("div");
        tagBox.className = "material-tags";
        tagBox.innerHTML = tags.map(t => `<span>${t}</span>`).join("");
        card.appendChild(tagBox);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    addSubjectStatusBadges();
    initLastLocationTracking();
    initContinueButton();
    updateDashboard();
    addMaterialTags();
});
