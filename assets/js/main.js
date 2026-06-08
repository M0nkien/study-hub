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
    fyzika: { label: "dopĺňa sa", className: "status-updating", updated: "Pridané vzorce, jednotky a otázky" },
    tlac3d: { label: "rozpracované", className: "status-progress", updated: "Pridané technológie 3D tlače a projekt" },
    algebra: { label: "rozpracované", className: "status-progress", updated: "Pridané matice, determinanty a sústavy" },
    praktikum: { label: "rozpracované", className: "status-progress", updated: "Pridané Java základy a školské zadania" },
    uvod: { label: "rozpracované", className: "status-progress", updated: "Pridaný Mazy Mouse, UML a obhajoba" },
};

function addSubjectStatusBadges() {
    document.querySelectorAll(".subject-card[data-subject-id]").forEach(card => {
        
        if (card.querySelector(".subject-state-ribbon") || card.classList.contains("subject-card-with-static-tags")) return;
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



/* =========================================================
   Study Hub – unikátny dizajn predmetových kariet a tagy
   ========================================================= */

const STUDY_HUB_SUBJECT_TAGS = {
    linux: ["CLI", "práva", "kvíz"],
    msd: ["Excel", "Fourier", "zadania"],
    ccna: ["siete", "ARP", "Packet Tracer"],
    fyzika: ["vzorce", "labáky", "skúška"],
    mat: ["DR", "Laplace", "rady"],
    vvs: ["ESP32", "MicroPython", "projekt"],
    java: ["OOP", "UML", "semestrálka"],
    tlac3d: ["3D tlač", "slicer", "projekt"],
    algebra: ["matice", "sústavy", "vektory"],
    praktikum: ["Java", "ArrayList", "OOP"],
    uvod: ["UML", "projekt", "obhajoba"]
};

const STUDY_HUB_SUBJECT_ACTIONS = {
    linux: "Príkazy, práva, procesy, shell",
    msd: "Výpočty, grafy, zadania, Excel",
    ccna: "Konfigurácie, siete, kvízy",
    fyzika: "Teória, vzorce, odvodenia",
    mat: "Postupy, vzorce, príklady",
    vvs: "ESP32, kódy, obhajoba",
    java: "OOP, triedy, UML, projekt",
    tlac3d: "Modelovanie, slicer, tlač",
    algebra: "Matice, sústavy, determinanty",
    praktikum: "Java úlohy, ArrayList, triedy",
    uvod: "Projekt, dokumentácia, prezentácia"
};

function addSubjectCardTags() {
    document.querySelectorAll(".subject-card[data-subject-id]").forEach(card => {
        const id = card.dataset.subjectId;
        const tags = STUDY_HUB_SUBJECT_TAGS[id] || [];
        const action = STUDY_HUB_SUBJECT_ACTIONS[id] || "";

        if (!card.querySelector(".subject-card-tags") && tags.length) {
            const tagBox = document.createElement("div");
            tagBox.className = "subject-card-tags";
            tagBox.innerHTML = tags.map(tag => `<span>${tag}</span>`).join("");
            const paragraph = card.querySelector("p");
            if (paragraph) paragraph.insertAdjacentElement("afterend", tagBox);
        }

        if (!card.querySelector(".subject-card-action") && action) {
            const actionBox = document.createElement("div");
            actionBox.className = "subject-card-action";
            actionBox.textContent = action;
            const tagsBox = card.querySelector(".subject-card-tags");
            if (tagsBox) tagsBox.insertAdjacentElement("afterend", actionBox);
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    addSubjectCardTags();
});



/* =========================================================
   Study Hub – stavové tagy na kartách predmetov
   ========================================================= */

const STUDY_HUB_STATE_TAGS = {
    linux: { label: "Hotové", key: "done", description: "pripravené" },
    msd: { label: "Dopĺňa sa", key: "updating", description: "zadania + Excel" },
    ccna: { label: "Dopĺňa sa", key: "updating", description: "kvízy + siete" },
    fyzika: { label: "Dopĺňa sa", key: "updating", description: "odvodenia + príklady" },
    mat: { label: "Rozpracované", key: "progress", description: "vzorce + príklady" },
    vvs: { label: "Rozpracované", key: "progress", description: "ESP32 + kódy" },
    java: { label: "Rozpracované", key: "progress", description: "OOP + projekt" },
    tlac3d: { label: "Rozpracované", key: "progress", description: "slicer + projekt" },
    algebra: { label: "Rozpracované", key: "progress", description: "matice + sústavy" },
    praktikum: { label: "Rozpracované", key: "progress", description: "Java úlohy" },
    uvod: { label: "Rozpracované", key: "progress", description: "UML + obhajoba" }
};

function addSubjectStateTags() {
    document.querySelectorAll(".subject-card[data-subject-id]").forEach(card => {
        const id = card.dataset.subjectId;
        const state = STUDY_HUB_STATE_TAGS[id];
        if (!state || card.querySelector(".subject-state-ribbon")) return;

        const ribbon = document.createElement("div");
        ribbon.className = "subject-state-ribbon state-" + state.key;
        ribbon.innerHTML = `<span>${state.label}</span><small>${state.description}</small>`;

        const top = card.querySelector(".card-top");
        if (top) top.insertAdjacentElement("afterend", ribbon);
        else card.prepend(ribbon);
    });
}

document.addEventListener("DOMContentLoaded", addSubjectStateTags);



/* =========================================================
   Study Hub – tagy priamo na každej predmetovej stránke
   ========================================================= */

const STUDY_HUB_SUBJECT_PAGE_TAGS = {
    linux: {
        label: "Linux Essentials",
        status: "Hotové",
        tags: ["CLI", "shell", "príkazy", "chmod", "procesy", "skúška"]
    },
    msd: {
        label: "MSD",
        status: "Dopĺňa sa",
        tags: ["Excel", "časové rady", "Fourier", "pravdepodobnosť", "zadania", "grafy"]
    },
    ccna: {
        label: "Cisco / CCNA",
        status: "Dopĺňa sa",
        tags: ["Packet Tracer", "ARP/ND", "Ethernet", "VLSM", "VLAN", "kvízy"]
    },
    fyzika: {
        label: "Fyzika",
        status: "Dopĺňa sa",
        tags: ["vzorce", "odvodenia", "okruhy skúška", "vzorová písomka", "labáky", "príklady"]
    },
    mat: {
        label: "Matematika",
        status: "Rozpracované",
        tags: ["DR", "Laplace", "Fourierov rad", "číselné rady", "gradient", "vzorce"]
    },
    vvs: {
        label: "VVS / ESP32",
        status: "Rozpracované",
        tags: ["ESP32", "MicroPython", "GPIO", "PWM", "UART", "obhajoba"]
    },
    java: {
        label: "Java",
        status: "Rozpracované",
        tags: ["OOP", "dedičnosť", "polymorfizmus", "UML", "Javadoc", "semestrálka"]
    },
    tlac3d: {
        label: "3D tlač",
        status: "Rozpracované",
        tags: ["FDM/FFF", "SLA", "SLS", "PrusaSlicer", "PLA", "projekt"]
    },
    algebra: {
        label: "Algebra",
        status: "Rozpracované",
        tags: ["matice", "determinanty", "Gauss", "sústavy", "vlastné čísla", "vektory"]
    },
    praktikum: {
        label: "Praktikum z programovania",
        status: "Rozpracované",
        tags: ["Java", "ArrayList", "triedy", "objekty", "Internát", "testové úlohy"]
    },
    uvod: {
        label: "Úvod do štúdia",
        status: "Rozpracované",
        tags: ["Mazy Mouse", "UML", "dokumentácia", "prezentácia", "obhajoba", "projekt"]
    }
};

function getSubjectIdFromBody() {
    const body = document.body;
    const match = Array.from(body.classList).find(cls => cls.startsWith("subject-theme-"));
    if (!match) return null;
    return match.replace("subject-theme-", "");
}

function addSubjectPageTags() {
    const subjectId = getSubjectIdFromBody();
    if (!subjectId) return;

    const data = STUDY_HUB_SUBJECT_PAGE_TAGS[subjectId];
    if (!data) return;

    const heroContent = document.querySelector(".subject-hero-content");
    if (!heroContent || heroContent.querySelector(".subject-page-tags")) return;

    const tagBox = document.createElement("div");
    tagBox.className = "subject-page-tags";
    tagBox.innerHTML = `
        <div class="subject-page-tag-head">
            <span>${data.label}</span>
            <strong>${data.status}</strong>
        </div>
        <div class="subject-page-tag-list">
            ${data.tags.map(tag => `<span>${tag}</span>`).join("")}
        </div>
    `;

    const heroText = heroContent.querySelector("p");
    if (heroText) {
        heroText.insertAdjacentElement("afterend", tagBox);
    } else {
        heroContent.appendChild(tagBox);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    addSubjectPageTags();
});



/* =========================================================
   Study Hub – funkčný vyhľadávač a filter predmetov
   ========================================================= */

function normalizeStudyHubText(value) {
    return String(value || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

function initSubjectCardsFilter() {
    const input = document.getElementById("subjectFilterInput");
    const reset = document.getElementById("subjectFilterReset");
    const count = document.getElementById("subjectFilterCount");
    const empty = document.getElementById("subjectFilterEmpty");
    const chips = Array.from(document.querySelectorAll("[data-status-filter]"));
    let cards = Array.from(document.querySelectorAll(".subjects-grid .subject-card"));
    if (!cards.length) {
        cards = Array.from(document.querySelectorAll(".subject-card"));
    }

    if (!input) return;

    let activeStatus = "all";

    function getCardSearchText(card) {
        if (!card.dataset.fullSearchText) {
            const rawText = [
                card.dataset.search || "",
                card.dataset.subjectId || "",
                card.textContent || ""
            ].join(" ");
            card.dataset.fullSearchText = normalizeStudyHubText(rawText);
        }
        return card.dataset.fullSearchText;
    }

    function getCardStatus(card) {
        const statusEl = card.querySelector(".subject-state-ribbon span");
        return normalizeStudyHubText(statusEl ? statusEl.textContent : "");
    }

    function applyFilter() {
        const query = normalizeStudyHubText(input.value);
        const words = query.split(/\s+/).filter(Boolean);
        let visible = 0;

        cards.forEach(card => {
            const text = getCardSearchText(card);
            const status = getCardStatus(card);

            const textMatch = words.length === 0 || words.every(word => text.includes(word));
            const statusMatch = activeStatus === "all" || status.includes(normalizeStudyHubText(activeStatus));

            const show = textMatch && statusMatch;
            card.hidden = !show;
            card.classList.toggle("is-filtered-out", !show);

            if (show) visible++;
        });

        if (count) {
            count.textContent = `Zobrazené predmety: ${visible} / ${cards.length}`;
        }

        if (empty) {
            empty.hidden = visible !== 0;
        }
    }

    input.addEventListener("input", applyFilter);

    if (reset) {
        reset.addEventListener("click", () => {
            input.value = "";
            activeStatus = "all";
            chips.forEach(chip => chip.classList.toggle("active", chip.dataset.statusFilter === "all"));
            applyFilter();
            input.focus();
        });
    }

    chips.forEach(chip => {
        chip.addEventListener("click", () => {
            activeStatus = chip.dataset.statusFilter || "all";
            chips.forEach(item => item.classList.toggle("active", item === chip));
            applyFilter();
        });
    });

    applyFilter();
}

document.addEventListener("DOMContentLoaded", function () {
    initSubjectCardsFilter();
});



/* =========================================================
   Study Hub – prepínanie témy čierna / svetlá
   ========================================================= */

function initStudyHubThemeToggle() {
    const storageKey = "studyHubTheme";
    const body = document.body;

    function applyTheme(theme) {
        body.classList.toggle("theme-light", theme === "light");
        body.classList.toggle("theme-dark", theme !== "light");

        const btn = document.querySelector(".theme-toggle-btn");
        if (btn) {
            btn.textContent = theme === "light" ? "Čierny režim" : "Svetlý režim";
            btn.setAttribute("aria-label", theme === "light" ? "Prepnúť na čierny režim" : "Prepnúť na svetlý režim");
        }
    }

    const saved = localStorage.getItem(storageKey) || "dark";
    applyTheme(saved);

    const headerContent = document.querySelector(".header-content");
    if (!headerContent || document.querySelector(".theme-toggle-btn")) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "theme-toggle-btn";
    headerContent.appendChild(button);

    applyTheme(localStorage.getItem(storageKey) || "dark");

    button.addEventListener("click", () => {
        const next = body.classList.contains("theme-light") ? "dark" : "light";
        localStorage.setItem(storageKey, next);
        applyTheme(next);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initStudyHubThemeToggle();
});
