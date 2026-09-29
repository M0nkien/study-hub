/* StudyHub v2.2 - subjects from Supabase with static HTML fallback */
(function () {
    "use strict";

    const LABELS = {
        hotove: "Hotové",
        rozpracovane: "Rozpracované",
        pripravovane: "Pripravované"
    };

    const CLASSES = {
        hotove: "state-done",
        rozpracovane: "state-progress",
        pripravovane: "state-planned"
    };

    async function loadSubjectsFromDatabase() {
        const db = window.studyHubSupabase;
        if (!db || !document.body.classList.contains("page-subjects")) return;

        const result = await db
            .from("subjects")
            .select("slug,name,short_name,description,status,href,color,visible,sort_order")
            .order("sort_order", { ascending: true });

        if (result.error || !Array.isArray(result.data)) {
            console.warn("StudyHub: subjects DB fallback", result.error || "No data");
            return;
        }

        const bySlug = new Map(result.data.map(function (item) { return [item.slug, item]; }));

        document.querySelectorAll(".subject-card[data-subject-id]").forEach(function (card) {
            const row = bySlug.get(card.dataset.subjectId);
            if (!row) return;

            card.dataset.status = row.status;
            card.dataset.dbVisible = row.visible ? "true" : "false";

            if (!row.visible) card.style.display = "none";
            else card.style.removeProperty("display");

            if (row.href) card.setAttribute("href", row.href);
            if (row.color) card.style.setProperty("--subject-card-accent", row.color);

            const badge = card.querySelector(".subject-badge");
            if (badge && row.short_name) badge.textContent = row.short_name;

            const title = card.querySelector("h3");
            if (title && row.name) title.textContent = row.name;

            const description = card.querySelector("h3 + p");
            if (description && row.description) description.textContent = row.description;

            const ribbon = card.querySelector(".subject-state-ribbon");
            if (ribbon) {
                ribbon.classList.remove("state-done", "state-progress", "state-planned");
                ribbon.classList.add(CLASSES[row.status] || "state-planned");
                const label = ribbon.querySelector("span");
                if (label) label.textContent = LABELS[row.status] || row.status;
            }
        });

        const visibleCards = Array.from(document.querySelectorAll(".subject-card[data-subject-id]"))
            .filter(function (card) { return card.dataset.dbVisible !== "false"; });

        const count = document.getElementById("subjectFilterCount");
        if (count) count.textContent = "Zobrazené predmety: " + visibleCards.length + " / " + visibleCards.length;

        document.dispatchEvent(new CustomEvent("studyhub:subjects-loaded", {
            detail: { count: result.data.length }
        }));
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", loadSubjectsFromDatabase);
    } else {
        loadSubjectsFromDatabase();
    }
})();
