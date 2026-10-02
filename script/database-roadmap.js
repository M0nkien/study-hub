/* StudyHub v2.2 - Roadmap from Supabase, with static fallback */
(function () {
    "use strict";

    const LABELS = {
        napady: "Nápady",
        planovane: "Plánované",
        pracuje_sa: "Pracuje sa",
        hotove: "Hotové"
    };

    const CLASSES = {
        napady: "ideas",
        planovane: "planned",
        pracuje_sa: "progress",
        hotove: "done"
    };

    function esc(value) {
        return String(value == null ? "" : value)
            .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;").replaceAll("'", "&#039;");
    }

    async function loadRoadmap() {
        const db = window.studyHubSupabase;
        const board = document.querySelector(".roadmap-board");
        if (!db || !board || !document.body.classList.contains("page-roadmap")) return;

        const result = await db
            .from("roadmap_items")
            .select("id,title,description,status,priority,subject,item_type,target_date,visible,sort_order")
            .eq("visible", true)
            .eq("publication_status","published")
            .order("sort_order", { ascending: true })
            .order("created_at", { ascending: false });

        if (result.error || !Array.isArray(result.data)) return;

        const grouped = { napady: [], planovane: [], pracuje_sa: [], hotove: [] };
        result.data.forEach(function (item) {
            if (grouped[item.status]) grouped[item.status].push(item);
        });

        board.innerHTML = Object.keys(grouped).map(function (status) {
            const items = grouped[status];
            return '<section class="roadmap-lane ' + CLASSES[status] + '">' +
                '<header><span>' + LABELS[status] + '</span><strong>' + items.length + '</strong></header>' +
                items.map(function (item) {
                    return '<article class="roadmap-ticket" data-priority="' + esc(item.priority) + '">' +
                        '<h3>' + esc(item.title) + '</h3>' +
                        '<p>' + esc(item.description) + '</p>' +
                        '<div class="roadmap-ticket-meta">' +
                            '<span class="meta-subject">' + esc(item.subject || "Web") + '</span>' +
                            '<span class="meta-priority">' + esc(item.priority) + '</span>' +
                            '<span class="meta-date">' + esc(item.target_date || "priebežne") + '</span>' +
                            '<span class="meta-type">' + esc(item.item_type || "funkcia") + '</span>' +
                        '</div>' +
                    '</article>';
                }).join("") +
            '</section>';
        }).join("");
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", loadRoadmap);
    else loadRoadmap();
})();
