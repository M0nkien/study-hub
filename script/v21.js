/* =========================================================
   StudyHub v2.1.1 enhancements
   - Study streak
   - Global live search
   - Subject status filters
   - Mobile bottom navigation
   - Local admin content rendering
   ========================================================= */
(function () {
    "use strict";

    function normalize(value) {
        return String(value || "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/\s+/g, " ")
            .trim();
    }

    function parseJSON(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch (error) {
            return fallback;
        }
    }

    function rootPrefix() {
        return window.location.pathname.replace(/\\/g, "/").includes("/subjects/") ? "../" : "";
    }

    function rootUrl(url) {
        if (!url) return "#";
        if (/^(https?:|mailto:|tel:|#)/i.test(url)) return url;
        return rootPrefix() + url.replace(/^\.\//, "");
    }

    function localDate(date) {
        const d = date || new Date();
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return y + "-" + m + "-" + day;
    }

    function dayDiff(a, b) {
        const aa = new Date(a + "T12:00:00");
        const bb = new Date(b + "T12:00:00");
        return Math.round((bb - aa) / 86400000);
    }

    function isStudyActivityPage() {
        const file = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
        if (window.location.pathname.includes("/subjects/")) return true;
        return ["index.html", "subjects.html", "flashcards.html", "results.html", ""].includes(file);
    }

    function updateStudyStreak() {
        let data = parseJSON("studyHubStreakData", null);
        if (!data || typeof data !== "object") data = { current: 0, best: 0, lastDate: "", days: [] };
        if (!Array.isArray(data.days)) data.days = [];

        const today = localDate();
        if (isStudyActivityPage() && data.lastDate !== today) {
            if (!data.lastDate) data.current = 1;
            else {
                const diff = dayDiff(data.lastDate, today);
                data.current = diff === 1 ? Math.max(1, Number(data.current) || 0) + 1 : 1;
            }
            data.lastDate = today;
            if (!data.days.includes(today)) data.days.push(today);
            data.days = data.days.slice(-90);
            data.best = Math.max(Number(data.best) || 0, Number(data.current) || 0);
            try {
                localStorage.setItem("studyHubStreakData", JSON.stringify(data));
                localStorage.setItem("studyHubStreak", String(data.current));

            } catch (error) { /* localStorage unavailable */ }
        }

        const current = Number(data.current) || 0;
        const best = Number(data.best) || current;
        const forms = function (n) { return n === 1 ? " deň" : (n >= 2 && n <= 4 ? " dni" : " dní"); };
        document.querySelectorAll("#v2StudyStreak, #v21StreakCurrent").forEach(function (el) {
            el.textContent = current + forms(current);
        });
        const bestEl = document.getElementById("v21StreakBest");
        if (bestEl) bestEl.textContent = best + forms(best);

        const heat = document.getElementById("v21StreakDays");
        if (heat) {
            heat.innerHTML = "";
            const active = new Set(data.days);
            for (let offset = 27; offset >= 0; offset -= 1) {
                const d = new Date();
                d.setHours(12, 0, 0, 0);
                d.setDate(d.getDate() - offset);
                const key = localDate(d);
                const cell = document.createElement("span");
                if (active.has(key)) cell.classList.add("is-active");
                if (key === today) cell.classList.add("is-today");
                cell.title = key + (active.has(key) ? " – aktivita" : " – bez aktivity");
                heat.appendChild(cell);
            }
        }
    }

    function getRuntimeSearchEntries() {
        const items = Array.isArray(window.STUDYHUB_SEARCH_INDEX) ? window.STUDYHUB_SEARCH_INDEX.slice() : [];
        const subjectRoutes = {
            Linux: "subjects/linux.html", MSD: "subjects/msd.html", CCNA: "subjects/ccna.html",
            VVS: "subjects/vvs.html", Matematika: "subjects/mat.html", Java: "subjects/java.html",
            Fyzika: "subjects/fyzika.html", Algebra: "subjects/algebra.html", "3D tlač": "subjects/3d-tlac.html",
            "Praktikum z programovania": "subjects/praktikum.html", "Úvod do štúdia": "subjects/uvod-do-studia.html"
        };
        const materials = parseJSON("studyHubAdminMaterials", []);
        const questions = parseJSON("studyHubAdminQuestions", []);
        if (Array.isArray(materials)) materials.forEach(function (item) {
            const typeMap = { pdf: "PDF", kviz: "Kvíz", zadanie: "Zadanie", tahak: "Poznámka", poznamka: "Poznámka" };
            items.push({
                title: item.title || "Materiál",
                type: typeMap[item.type] || "Poznámka",
                url: (subjectRoutes[item.subject] || "subjects.html") + "#admin-local-content",
                subject: item.subject || "",
                keywords: (item.description || "") + " " + (item.type || ""),
                snippet: item.description || "Lokálne pridaný materiál"
            });
        });
        if (Array.isArray(questions)) questions.forEach(function (item) {
            items.push({
                title: item.question || item.text || "Kvízová otázka",
                type: "Kvíz",
                url: (subjectRoutes[item.subject] || "results.html") + "#admin-local-content",
                subject: item.subject || "",
                keywords: item.explanation || "",
                snippet: item.explanation || "Lokálne pridaná otázka"
            });
        });
        return items;
    }

    function initGlobalLiveSearch() {
        const form = document.querySelector(".v2-global-search");
        const input = form && form.querySelector("input");
        if (!form || !input) return;

        let box = form.querySelector(".v21-search-results");
        if (!box) {
            box = document.createElement("div");
            box.className = "v21-search-results";
            box.hidden = true;
            form.appendChild(box);
        }

        function close() {
            box.hidden = true;
            box.innerHTML = "";
            form.classList.remove("has-results");
        }

        function entryText(item) {
            return normalize([item.title, item.type, item.subject, item.keywords, item.snippet].join(" "));
        }

        function render() {
            const q = normalize(input.value);
            if (q.length < 2) { close(); return; }
            const words = q.split(" ").filter(Boolean);
            const matches = getRuntimeSearchEntries().map(function (item) {
                const text = entryText(item);
                if (!words.every(function (word) { return text.includes(word); })) return null;
                let score = 0;
                const title = normalize(item.title);
                if (title === q) score += 100;
                if (title.startsWith(q)) score += 50;
                if (title.includes(q)) score += 25;
                if (normalize(item.subject).includes(q)) score += 12;
                return { item: item, score: score };
            }).filter(Boolean).sort(function (a, b) { return b.score - a.score || a.item.title.localeCompare(b.item.title, "sk"); });

            if (!matches.length) {
                box.innerHTML = '<div class="v21-search-empty"><strong>Nič sa nenašlo</strong><span>Skús iný názov témy, predmetu alebo materiálu.</span></div>';
                box.hidden = false; form.classList.add("has-results"); return;
            }

            const order = ["Predmet", "Téma", "Poznámka", "Zadanie", "Kvíz", "PDF", "Flashcards"];
            const grouped = {};
            matches.slice(0, 60).forEach(function (row) {
                const type = row.item.type || "Téma";
                (grouped[type] || (grouped[type] = [])).push(row.item);
            });
            let html = '<div class="v21-search-summary">Výsledky pre <strong>' + input.value.replace(/[<>]/g, "") + '</strong><span>' + matches.length + ' nájdených</span></div>';
            order.concat(Object.keys(grouped).filter(function (x) { return !order.includes(x); })).forEach(function (type) {
                const list = grouped[type];
                if (!list || !list.length) return;
                html += '<section class="v21-search-group"><h3>' + type + '<span>' + list.length + '</span></h3>';
                list.slice(0, 5).forEach(function (item) {
                    html += '<a href="' + rootUrl(item.url) + '" class="v21-search-item"><span class="v21-search-type">' + type.charAt(0) + '</span><div><strong>' + String(item.title).replace(/[<>]/g, "") + '</strong><small>' + [item.subject, item.snippet].filter(Boolean).join(" · ").replace(/[<>]/g, "") + '</small></div><b>→</b></a>';
                });
                html += '</section>';
            });
            box.innerHTML = html;
            box.hidden = false;
            form.classList.add("has-results");
        }

        input.addEventListener("input", render);
        input.addEventListener("focus", function () { if (input.value.trim().length >= 2) render(); });
        input.addEventListener("keydown", function (event) {
            if (event.key === "Escape") { close(); input.blur(); }
        });
        document.addEventListener("click", function (event) {
            if (!form.contains(event.target)) close();
        });

        // V2 had a submit redirect. Capture submit first and use the first live result instead.
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            const first = box.querySelector("a.v21-search-item");
            if (first) window.location.href = first.href;
            else render();
        }, true);
    }

    function initSubjectFilters() {
        if (!document.body.classList.contains("page-subjects")) return;
        const input = document.getElementById("subjectFilterInput");
        const reset = document.getElementById("subjectFilterReset");
        const count = document.getElementById("subjectFilterCount");
        const empty = document.getElementById("subjectFilterEmpty");
        const chips = Array.from(document.querySelectorAll("[data-status-filter]"));
        const cards = function () { return Array.from(document.querySelectorAll(".subject-card[data-subject-id]")); };
        if (!cards().length) return;
        let status = "all";

        function apply() {
            const q = normalize(input ? input.value : "");
            let visible = 0;
            cards().forEach(function (card) {
                const text = normalize((card.getAttribute("data-search") || "") + " " + card.textContent);
                const matchesText = !q || q.split(" ").filter(Boolean).every(function (w) { return text.includes(w); });
                const matchesStatus = status === "all" || card.getAttribute("data-status") === status;
                const allowedByAdmin = card.getAttribute("data-visibility-hidden") !== "true";
                const show = matchesText && matchesStatus && allowedByAdmin;
                card.hidden = !show;
                card.classList.toggle("is-filtered-out", !show);
                if (show) visible += 1;
            });
            if (count) count.textContent = "Zobrazené predmety: " + visible + " / " + cards().filter(function (c) { return c.getAttribute("data-visibility-hidden") !== "true"; }).length;
            if (empty) empty.hidden = visible !== 0;
        }

        chips.forEach(function (chip) {
            chip.addEventListener("click", function (event) {
                event.stopImmediatePropagation();
                status = chip.getAttribute("data-status-filter") || "all";
                chips.forEach(function (c) { c.classList.toggle("active", c === chip); });
                apply();
            }, true);
        });
        if (input) input.addEventListener("input", function (event) {
            event.stopImmediatePropagation();
            apply();
        }, true);
        if (reset) reset.addEventListener("click", function (event) {
            event.stopImmediatePropagation();
            if (input) input.value = "";
            status = "all";
            chips.forEach(function (c) { c.classList.toggle("active", c.getAttribute("data-status-filter") === "all"); });
            apply();
        }, true);
        document.addEventListener("studyhub:subject-visibility-changed", apply);

        const params = new URLSearchParams(window.location.search);
        const incoming = params.get("search");
        if (incoming && input) input.value = incoming;
        window.setTimeout(apply, 0);
    }

    function initMobileBottomNav() {
        if (document.querySelector(".v21-mobile-bottom-nav")) return;
        const nav = document.createElement("nav");
        nav.className = "v21-mobile-bottom-nav";
        nav.setAttribute("aria-label", "Mobilná navigácia");
        const items = [
            ["index.html", "⌂", "Domov"],
            ["subjects.html", "▦", "Predmety"],
            ["flashcards.html", "▣", "Flashcards"],
            ["results.html", "▥", "Výsledky"]
        ];
        const current = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
        items.forEach(function (item) {
            const a = document.createElement("a");
            a.href = rootUrl(item[0]);
            a.innerHTML = '<span>' + item[1] + '</span><small>' + item[2] + '</small>';
            if (current === item[0] || (item[0] === "subjects.html" && (window.location.pathname.includes("/subjects/") || current === "subject.html"))) a.classList.add("is-active");
            nav.appendChild(a);
        });
        document.body.appendChild(nav);
    }

    function subjectNameFromPath() {
        const file = (window.location.pathname.split("/").pop() || "").toLowerCase();
        const map = {
            "linux.html":"Linux", "msd.html":"MSD", "ccna.html":"CCNA", "vvs.html":"VVS", "mat.html":"Matematika",
            "java.html":"Java", "fyzika.html":"Fyzika", "algebra.html":"Algebra", "3d-tlac.html":"3D tlač",
            "praktikum.html":"Praktikum z programovania", "uvod-do-studia.html":"Úvod do štúdia"
        };
        return map[file] || "";
    }

    function injectAdminContent() {
        if (window.studyHubSupabase) return; // cloud content is authoritative after migration
        if (!window.location.pathname.includes("/subjects/")) return;
        const subject = subjectNameFromPath();
        if (!subject) return;
        const materials = parseJSON("studyHubAdminMaterials", []);
        const questions = parseJSON("studyHubAdminQuestions", []);
        const m = Array.isArray(materials) ? materials.filter(function (x) { return x.subject === subject; }) : [];
        const q = Array.isArray(questions) ? questions.filter(function (x) { return x.subject === subject; }) : [];
        if (!m.length && !q.length) return;

        const container = document.querySelector(".subject-content .container") || document.querySelector("main .container");
        if (!container || document.getElementById("admin-local-content")) return;
        const block = document.createElement("section");
        block.className = "content-block v21-admin-local-content";
        block.id = "admin-local-content";
        block.innerHTML = '<div class="section-heading"><p class="small-title">Lokálny admin obsah</p><h2>Pridané cez Admin editor</h2><p>Tieto položky sú uložené iba v tomto prehliadači.</p></div><div class="v21-admin-content-grid"></div>';
        const grid = block.querySelector(".v21-admin-content-grid");
        m.forEach(function (item) {
            const card = document.createElement("article");
            card.className = "v21-local-card";
            card.innerHTML = '<span>' + (item.type || "materiál") + '</span><h3></h3><p></p>';
            card.querySelector("h3").textContent = item.title || "Materiál";
            card.querySelector("p").textContent = item.description || "Bez popisu";
            grid.appendChild(card);
        });
        q.forEach(function (item) {
            const card = document.createElement("article");
            card.className = "v21-local-card question";
            card.innerHTML = '<span>Kvízová otázka</span><h3></h3><p></p>';
            card.querySelector("h3").textContent = item.question || "Otázka";
            card.querySelector("p").textContent = item.explanation || "Otázka uložená v admin editore.";
            grid.appendChild(card);
        });
        container.appendChild(block);
    }

    function updateSidebarMeta() {
        const rows = document.querySelectorAll(".v2-sidebar-meta > div");
        if (rows[0]) { const strong = rows[0].querySelector("strong"); if (strong) strong.textContent = "v2.3.0"; }
        if (rows[1]) { const strong = rows[1].querySelector("strong"); if (strong) strong.textContent = "2. 10. 2026"; }
    }

    document.addEventListener("DOMContentLoaded", function () {
        updateSidebarMeta();
        updateStudyStreak();
        initGlobalLiveSearch();
        initSubjectFilters();
        initMobileBottomNav();
        injectAdminContent();
    });
})();
