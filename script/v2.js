/* =========================================================
   STUDYHUB V2 — DARK DASHBOARD UI
   Shared sidebar, topbar, profile controls and dashboard helpers.
   Existing StudyHub content logic remains in the original scripts.
   ========================================================= */

(function () {
    "use strict";

    // Predmety sa zobrazujú na samostatnej stránke subjects.html.
    // Sidebar zostáva zámerne jednoduchý a obsahuje iba hlavné sekcie StudyHubu.

    function normalizedPath() {
        return window.location.pathname.replace(/\\/g, "/").replace(/\/$/, "");
    }

    function isSubjectDetail() {
        return normalizedPath().includes("/subjects/");
    }

    function rootPrefix() {
        return isSubjectDetail() ? "../" : "";
    }

    function rootHref(path) {
        return rootPrefix() + path;
    }

    function parseJSON(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch (error) {
            return fallback;
        }
    }

    function safeText(value, fallback) {
        return typeof value === "string" && value.trim() ? value.trim() : fallback;
    }

    function iconSvg(name) {
        const icons = {
            home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5v8a1 1 0 0 1-1 1h-5.5v-6h-5v6H4a1 1 0 0 1-1-1z"/></svg>',
            search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg>',
            sun: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.41M17.66 6.34l1.41-1.41"/></svg>',
            moon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.2A8 8 0 0 1 8.8 4a8.7 8.7 0 1 0 11.2 11.2Z"/></svg>',
            bell: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 9a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7"/><path d="M10 20h4"/></svg>',
            user: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
            menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
            close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>',
            book: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H20v17H7.5A3.5 3.5 0 0 0 4 22z"/><path d="M4 5.5V22M8 6h8M8 10h8"/></svg>',
            chart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20V7"/></svg>',
            map: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15M15 6v15"/></svg>',
            help: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.4 2.4 0 1 1 4.2 1.6c-1.2 1.2-2 1.6-2 3M12 17.5h.01"/></svg>',
            grid: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
            card: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 9h5M7 13h8"/></svg>',
            history: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/></svg>',
            admin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 4 5v6c0 5 3.5 9.4 8 11 4.5-1.6 8-6 8-11V5z"/><path d="m9 12 2 2 4-4"/></svg>'
        };
        return icons[name] || icons.grid;
    }

    function navLink(href, label, icon, extraClass) {
        return '<a class="v2-side-link ' + (extraClass || "") + '" href="' + rootHref(href) + '" data-nav-href="' + href + '">' +
            '<span class="v2-side-icon">' + (icon.indexOf("<svg") === 0 ? icon : '<span>' + icon + '</span>') + '</span>' +
            '<span class="v2-side-label">' + label + '</span>' +
            '</a>';
    }

    function createAppShell() {
        if (document.querySelector(".v2-app-sidebar")) return;

        const profileName = safeText(localStorage.getItem("studyHubProfileName"), "Študent")
            .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;").replaceAll("'", "&#039;");
        const sidebar = document.createElement("aside");
        sidebar.className = "v2-app-sidebar";
        sidebar.setAttribute("aria-label", "StudyHub navigácia");
        sidebar.innerHTML =
            '<div class="v2-sidebar-brand">' +
                '<a href="' + rootHref("index.html") + '" class="v2-brand-link">' +
                    '<span class="v2-brand-mark"><span class="v2-cap-top"></span><span class="v2-cap-base"></span></span>' +
                    '<span class="v2-brand-copy"><strong>StudyHub <em>v2</em></strong><small>Tvoje štúdium na jednom mieste</small></span>' +
                '</a>' +
            '</div>' +
            '<nav class="v2-sidebar-nav v2-sidebar-nav-simple">' +
                navLink("index.html", "Domov", iconSvg("home"), "primary-nav") +
                navLink("subjects.html", "Predmety", iconSvg("grid"), "primary-nav subjects-main-nav") +
                navLink("flashcards.html", "Flashcards", iconSvg("card"), "primary-nav") +
                navLink("results.html", "Výsledky", iconSvg("chart"), "primary-nav") +
                navLink("roadmap.html", "Roadmapa", iconSvg("map"), "primary-nav") +
                navLink("support.html", "Podpora", iconSvg("help"), "primary-nav") +
            '</nav>' +
            '<div class="v2-sidebar-meta">' +
                '<div><span>Verzia stránky</span><strong>v2.3.0</strong></div>' +
                '<div><span>Posledná aktualizácia</span><strong>2. 10. 2026</strong></div>' +
                '<p><i></i>Overovanie služieb…</p>' +
            '</div>';

        const topbar = document.createElement("div");
        topbar.className = "v2-app-topbar";
        topbar.innerHTML =
            '<button class="v2-mobile-nav-btn" type="button" aria-label="Otvoriť menu" aria-expanded="false">' + iconSvg("menu") + '</button>' +
            '<form class="v2-global-search" role="search">' +
                '<span>' + iconSvg("search") + '</span>' +
                '<input type="search" aria-label="Hľadať v StudyHube" placeholder="Hľadaj poznámky, kvízy, témy..." autocomplete="off">' +
            '</form>' +
            '<div class="v2-top-actions">' +
                '<button class="v2-icon-btn v2-theme-btn" type="button" aria-label="Prepnúť vzhľad">' + iconSvg("sun") + '</button>' +
                '<div class="v2-popover-wrap">' +
                    '<button class="v2-icon-btn v2-notification-btn" type="button" aria-label="Upozornenia" aria-expanded="false">' + iconSvg("bell") + '<i></i></button>' +
                    '<div class="v2-popover v2-notification-popover" hidden>' +
                        '<div class="v2-popover-title"><strong>Upozornenia</strong><span>StudyHub</span></div>' +
                        '<div class="v2-notice-item"><b>Nový StudyHub v2 dizajn</b><p>Dashboard, navigácia a predmety majú nový spoločný vzhľad.</p></div>' +
                    '</div>' +
                '</div>' +
                '<div class="v2-popover-wrap">' +
                    '<button class="v2-account-btn" type="button" aria-expanded="false">' +
                        '<span class="v2-account-avatar">' + iconSvg("user") + '</span>' +
                        '<span class="v2-account-copy"><strong class="v2-profile-name">' + profileName + '</strong><small>Lokálny profil</small></span>' +
                        '<b>⌄</b>' +
                    '</button>' +
                    '<div class="v2-popover v2-account-popover" hidden>' +
                        '<div class="v2-account-head"><span class="v2-account-avatar large">' + iconSvg("user") + '</span><div><strong class="v2-profile-name">' + profileName + '</strong><small>Údaje sa ukladajú iba v tomto prehliadači.</small></div></div>' +
                        '<a href="' + rootHref("results.html") + '">' + iconSvg("chart") + '<span>Moje výsledky</span></a>' +
                        (sessionStorage.getItem("studyHubAdminUnlocked") === "true"
                            ? '<a href="' + rootHref("admin.html") + '">' + iconSvg("admin") + '<span>Admin panel</span></a>' +
                              '<button class="v2-admin-logout" type="button">' + iconSvg("admin") + '<span>Odhlásiť admin</span></button>'
                            : '<a href="' + rootHref("admin.html") + '">' + iconSvg("admin") + '<span>Admin prihlásenie</span></a>') +
                        '<button class="v2-edit-profile" type="button">' + iconSvg("user") + '<span>Upraviť meno profilu</span></button>' +
                    '</div>' +
                '</div>' +
            '</div>';

        const backdrop = document.createElement("button");
        backdrop.className = "v2-sidebar-backdrop";
        backdrop.type = "button";
        backdrop.setAttribute("aria-label", "Zavrieť menu");

        document.body.insertBefore(sidebar, document.body.firstChild);
        document.body.insertBefore(topbar, sidebar.nextSibling);
        document.body.insertBefore(backdrop, topbar.nextSibling);
        document.body.classList.add("v2-shell-ready");
    }

    function markActiveNavigation() {
        const path = normalizedPath();
        let current = path.split("/").pop() || "index.html";
        if (!current.includes(".")) current = "index.html";

        document.querySelectorAll(".v2-side-link").forEach(function (link) {
            const href = link.getAttribute("data-nav-href") || "";
            const target = href.split("/").pop();
            let active = target === current;

            // Na každej predmetovej podstránke zostáva v hlavnom sidebare aktívna položka „Predmety“.
            if (href === "subjects.html" && (current === "subjects.html" || current === "subject.html" || isSubjectDetail())) active = true;
            link.classList.toggle("is-active", active);
            if (active) link.setAttribute("aria-current", "page");
            else link.removeAttribute("aria-current");
        });

        document.querySelectorAll(".nav a").forEach(function (link) {
            const href = (link.getAttribute("href") || "").split("#")[0];
            const target = href.split("/").pop();
            const active = target === current || ((isSubjectDetail() || current === "subject.html") && target === "subjects.html");
            link.classList.toggle("v2-active", active);
        });
    }

    function initMobileSidebar() {
        const sidebar = document.querySelector(".v2-app-sidebar");
        const button = document.querySelector(".v2-mobile-nav-btn");
        const backdrop = document.querySelector(".v2-sidebar-backdrop");
        if (!sidebar || !button || !backdrop) return;

        function setOpen(open) {
            document.body.classList.toggle("v2-sidebar-open", open);
            button.setAttribute("aria-expanded", open ? "true" : "false");
            button.innerHTML = open ? iconSvg("close") : iconSvg("menu");
        }

        button.addEventListener("click", function () {
            setOpen(!document.body.classList.contains("v2-sidebar-open"));
        });
        backdrop.addEventListener("click", function () { setOpen(false); });
        sidebar.addEventListener("click", function (event) {
            if (event.target.closest("a") && window.innerWidth <= 980) setOpen(false);
        });
    }

    function initPopovers() {
        const notificationBtn = document.querySelector(".v2-notification-btn");
        const notification = document.querySelector(".v2-notification-popover");
        const accountBtn = document.querySelector(".v2-account-btn");
        const account = document.querySelector(".v2-account-popover");

        function setPopover(button, popover, open) {
            if (!button || !popover) return;
            popover.hidden = !open;
            button.setAttribute("aria-expanded", open ? "true" : "false");
        }

        if (notificationBtn && notification) {
            notificationBtn.addEventListener("click", function (event) {
                event.stopPropagation();
                const open = notification.hidden;
                setPopover(accountBtn, account, false);
                setPopover(notificationBtn, notification, open);
            });
        }

        if (accountBtn && account) {
            accountBtn.addEventListener("click", function (event) {
                event.stopPropagation();
                const open = account.hidden;
                setPopover(notificationBtn, notification, false);
                setPopover(accountBtn, account, open);
            });
        }

        document.addEventListener("click", function (event) {
            if (!event.target.closest(".v2-popover-wrap")) {
                setPopover(notificationBtn, notification, false);
                setPopover(accountBtn, account, false);
            }
        });

        const editProfile = document.querySelector(".v2-edit-profile");
        if (editProfile) {
            editProfile.addEventListener("click", function () {
                const current = safeText(localStorage.getItem("studyHubProfileName"), "Študent");
                const next = window.prompt("Meno zobrazené v StudyHube:", current);
                if (next === null) return;
                const cleaned = next.trim().slice(0, 24) || "Študent";
                localStorage.setItem("studyHubProfileName", cleaned);
                document.querySelectorAll(".v2-profile-name").forEach(function (el) { el.textContent = cleaned; });
                setPopover(accountBtn, account, false);
            });
        }
    }

    function initTheme() {
        const themeVersion = "studyhub-dark-dashboard-v2";
        const migratedVersion = localStorage.getItem("studyHubThemeVersion");
        let saved = localStorage.getItem("studyHubTheme");

        // The dark dashboard is the new primary StudyHub visual. Force it once
        // after this redesign so an older saved "light" preference does not
        // keep the previous white design active. The user can still toggle later.
        if (migratedVersion !== themeVersion) {
            saved = "dark";
            localStorage.setItem("studyHubTheme", saved);
            localStorage.setItem("studyHubThemeVersion", themeVersion);
        }

        if (saved !== "light" && saved !== "dark") saved = "dark";
        document.documentElement.dataset.theme = saved;
        const button = document.querySelector(".v2-theme-btn");
        if (!button) return;

        function syncIcon() {
            const dark = document.documentElement.dataset.theme === "dark";
            button.innerHTML = dark ? iconSvg("sun") : iconSvg("moon");
            button.setAttribute("aria-label", dark ? "Použiť svetlý vzhľad" : "Použiť tmavý vzhľad");
        }

        button.addEventListener("click", function () {
            const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
            document.documentElement.dataset.theme = next;
            localStorage.setItem("studyHubTheme", next);
            syncIcon();
        });
        syncIcon();
    }

    function initGlobalSearch() {
        const form = document.querySelector(".v2-global-search");
        const input = form ? form.querySelector("input") : null;
        if (!form || !input) return;

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const query = input.value.trim();
            if (!query) return;

            if (document.body.classList.contains("page-subjects")) {
                const filterInput = document.getElementById("subjectFilterInput");
                if (filterInput) {
                    filterInput.value = query;
                    filterInput.dispatchEvent(new Event("input", { bubbles: true }));
                    filterInput.scrollIntoView({ behavior: "smooth", block: "center" });
                    filterInput.focus();
                    return;
                }
            }
            window.location.href = rootHref("subjects.html") + "?search=" + encodeURIComponent(query);
        });

        if (document.body.classList.contains("page-subjects")) {
            const params = new URLSearchParams(window.location.search);
            const query = params.get("search");
            if (query) {
                input.value = query;
                window.setTimeout(function () {
                    const filterInput = document.getElementById("subjectFilterInput");
                    if (!filterInput) return;
                    filterInput.value = query;
                    filterInput.dispatchEvent(new Event("input", { bubbles: true }));
                }, 80);
            }
        }
    }

    function getProgressObject() {
        const a = parseJSON("studyHubProgress", null);
        const b = parseJSON("mikStudyLearned", null);
        return (a && typeof a === "object" ? a : (b && typeof b === "object" ? b : {}));
    }

    function progressEntries() {
        return Object.entries(getProgressObject());
    }

    function subjectAliases(id) {
        const aliases = {
            linux: ["linux"],
            msd: ["msd", "spracovania-dat", "spracovania_dat"],
            mat: ["mat", "matematika", "math"],
            ccna: ["ccna", "cisco", "piks"],
            vvs: ["vvs", "vstavane"],
            fyzika: ["fyzika", "physics"]
        };
        return aliases[id] || [id];
    }

    function getSubjectProgress(id) {
        const aliases = subjectAliases(id);
        const entries = progressEntries().filter(function (pair) {
            const key = String(pair[0]).toLowerCase();
            return aliases.some(function (alias) { return key.includes(alias); });
        });
        if (!entries.length) return 0;
        const done = entries.filter(function (pair) { return Boolean(pair[1]); }).length;
        return Math.round((done / entries.length) * 100);
    }

    function getAllDoneCount() {
        return progressEntries().filter(function (pair) { return Boolean(pair[1]); }).length;
    }

    function getQuizResults() {
        const candidates = [
            parseJSON("studyHubQuizResults", null),
            parseJSON("quizHistory", null),
            parseJSON("studyHubQuizHistory", null)
        ];
        for (let i = 0; i < candidates.length; i += 1) {
            if (Array.isArray(candidates[i])) return candidates[i];
        }
        return [];
    }

    function updateHomeDashboard() {
        const root = document.getElementById("v2HomeSnapshot");
        if (!root) return;

        const done = getAllDoneCount();
        const results = getQuizResults();
        const best = results.length ? Math.max.apply(null, results.map(function (item) {
            return Number(item.percent ?? item.percentage ?? item.score) || 0;
        })) : 0;
        const last = parseJSON("studyHubLastLocation", null);
        const streak = Number(localStorage.getItem("studyHubStreak")) || 0;

        const doneEl = document.getElementById("v2DoneSections");
        const quizCountEl = document.getElementById("v2QuizCount");
        const bestEl = document.getElementById("v2BestQuiz");
        const streakEl = document.getElementById("v2StudyStreak");
        const lastEl = document.getElementById("v2LastOpen");
        const lastMeta = document.getElementById("v2LastMeta");
        const continueLink = document.getElementById("v2ContinueLink");
        const lastProgress = document.getElementById("v2LastProgress");

        if (doneEl) doneEl.textContent = String(done);
        if (quizCountEl) quizCountEl.textContent = String(results.length);
        if (bestEl) bestEl.textContent = Math.min(best, 100) + "%";
        if (streakEl) streakEl.textContent = streak + (streak === 1 ? " deň" : " dní");

        if (last && last.label) {
            if (lastEl) lastEl.textContent = last.label;
            if (lastMeta) lastMeta.textContent = "Pokračuj tam, kde si naposledy skončil.";
            if (continueLink && last.href) continueLink.href = last.href;
            if (lastProgress) {
                const id = detectSubjectId(last.href || "");
                lastProgress.style.width = getSubjectProgress(id) + "%";
            }
        }

        document.querySelectorAll("[data-progress-subject]").forEach(function (card) {
            const id = card.getAttribute("data-progress-subject");
            const value = getSubjectProgress(id);
            const label = card.querySelector(".hub-progress-value");
            const fill = card.querySelector(".hub-progress span");
            if (label) label.textContent = value + " %";
            if (fill) fill.style.width = value + "%";
        });
    }

    function detectSubjectId(href) {
        const text = String(href).toLowerCase();
        if (text.includes("linux")) return "linux";
        if (text.includes("msd")) return "msd";
        if (text.includes("mat")) return "mat";
        if (text.includes("ccna")) return "ccna";
        if (text.includes("vvs")) return "vvs";
        if (text.includes("fyzika")) return "fyzika";
        return "";
    }

    function initLastLocationTracking() {
        function storeFromLink(link) {
            const href = link.getAttribute("href") || "";
            if (!/subjects\/[^/]+\.html/.test(href)) return;
            let label = link.getAttribute("data-subject-label");
            if (!label) {
                const heading = link.querySelector("h3, strong, .v2-side-label");
                label = heading ? heading.textContent.trim() : "Predmet";
            }
            try {
                localStorage.setItem("studyHubLastLocation", JSON.stringify({ label: label, href: href, savedAt: Date.now() }));
            } catch (error) { /* localStorage can be unavailable in private contexts */ }
        }

        document.addEventListener("click", function (event) {
            const link = event.target.closest('a[href*="subjects/"]');
            if (link) storeFromLink(link);
        });

        if (isSubjectDetail()) {
            const currentFile = normalizedPath().split("/").pop();
            const subjectHeading = document.querySelector(".subject-hero h1, .subject-hero h2");
            const label = subjectHeading ? subjectHeading.textContent.replace(/\s+/g, " ").trim() : document.title.split("|")[0].trim();
            try {
                localStorage.setItem("studyHubLastLocation", JSON.stringify({
                    label: label || "Predmet",
                    href: "subjects/" + currentFile,
                    savedAt: Date.now()
                }));
            } catch (error) { /* noop */ }
        }
    }

    function initScrollTop() {
        if (document.querySelector(".v2-scroll-top")) return;
        const button = document.createElement("button");
        button.className = "v2-scroll-top";
        button.type = "button";
        button.setAttribute("aria-label", "Späť hore");
        button.textContent = "↑";
        document.body.appendChild(button);

        function sync() { button.classList.toggle("visible", window.scrollY > 520); }
        window.addEventListener("scroll", sync, { passive: true });
        button.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
        sync();
    }

    function initReveal() {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const candidates = document.querySelectorAll(
            ".hub-panel, .hub-progress-card, .hub-resource-card, .subject-card, .content-block, .roadmap-lane, .admin-card, .support-box"
        );
        if (!candidates.length || !("IntersectionObserver" in window)) return;
        candidates.forEach(function (el) { el.classList.add("v2-reveal"); });
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("v2-visible");
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.06, rootMargin: "0px 0px -18px 0px" });
        candidates.forEach(function (el) { observer.observe(el); });
    }

    function initSubjectSectionSpy() {
        const sidebar = document.querySelector(".subject-sidebar");
        if (!sidebar || !("IntersectionObserver" in window)) return;
        const links = Array.from(sidebar.querySelectorAll('a[href^="#"]'));
        const sections = links.map(function (link) {
            const id = link.getAttribute("href").slice(1);
            const section = document.getElementById(id);
            return section ? { link: link, section: section } : null;
        }).filter(Boolean);
        if (!sections.length) return;

        const observer = new IntersectionObserver(function (entries) {
            const visible = entries.filter(function (entry) { return entry.isIntersecting; })
                .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });
            if (!visible.length) return;
            const id = visible[0].target.id;
            sections.forEach(function (item) {
                item.link.classList.toggle("v2-section-active", item.section.id === id);
            });
        }, { rootMargin: "-22% 0px -62% 0px", threshold: [0, .08, .2, .5] });
        sections.forEach(function (item) { observer.observe(item.section); });
    }

    document.addEventListener("DOMContentLoaded", function () {
        createAppShell();
        markActiveNavigation();
        initMobileSidebar();
        initPopovers();
        initTheme();
        initGlobalSearch();
        initLastLocationTracking();
        updateHomeDashboard();
        initSubjectSectionSpy();
        initScrollTop();
        window.requestAnimationFrame(initReveal);
    });
})();
