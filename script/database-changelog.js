/* StudyHub v2.2 - Changelog from Supabase, with static fallback */
(function () {
    "use strict";

    const GROUP_LABELS = { new: "Nové", changed: "Upravené", fixed: "Opravené" };
    const GROUP_CLASSES = { new: "changelog-new", changed: "changelog-changed", fixed: "changelog-fixed" };

    function esc(value) {
        return String(value == null ? "" : value)
            .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;").replaceAll("'", "&#039;");
    }

    function formatDate(value) {
        if (!value) return "";
        try { return new Date(value + "T12:00:00").toLocaleDateString("sk-SK"); }
        catch (e) { return value; }
    }

    async function loadChangelog() {
        const db = window.studyHubSupabase;
        const timeline = document.querySelector(".changelog-timeline");
        if (!db || !timeline || !document.body.classList.contains("page-changelog")) return;

        const result = await db
            .from("changelog_entries")
            .select("id,version,release_date,change_type,title,description,visible,sort_order")
            .eq("visible", true)
            .order("release_date", { ascending: false })
            .order("sort_order", { ascending: true });

        if (result.error || !Array.isArray(result.data) || !result.data.length) return;

        const groups = [];
        const byKey = new Map();

        result.data.forEach(function (item) {
            const key = item.version + "|" + item.release_date;
            if (!byKey.has(key)) {
                const group = {
                    version: item.version,
                    release_date: item.release_date,
                    items: []
                };
                byKey.set(key, group);
                groups.push(group);
            }
            byKey.get(key).items.push(item);
        });

        timeline.innerHTML = groups.map(function (group, index) {
            const perType = { new: [], changed: [], fixed: [] };
            group.items.forEach(function (item) {
                if (perType[item.change_type]) perType[item.change_type].push(item);
            });

            return '<article class="changelog-entry' + (index === 0 ? " current" : "") + '">' +
                '<div class="changelog-date">' + esc(formatDate(group.release_date)) + '</div>' +
                '<div class="changelog-card">' +
                    '<p class="small-title">' + esc(group.version) + '</p>' +
                    '<h3>' + esc(group.items[0]?.title || "Aktualizácia StudyHub") + '</h3>' +
                    Object.keys(perType).map(function (type) {
                        if (!perType[type].length) return "";
                        return '<div class="changelog-change-group ' + GROUP_CLASSES[type] + '">' +
                            '<h4>' + GROUP_LABELS[type] + '</h4><ul>' +
                            perType[type].map(function (item) {
                                return '<li><strong>' + esc(item.title) + ':</strong> ' + esc(item.description) + '</li>';
                            }).join("") +
                            '</ul></div>';
                    }).join("") +
                '</div>' +
            '</article>';
        }).join("");

        const versionNode = document.querySelector(".changelog-summary h2");
        const dateNode = document.querySelector(".changelog-summary > p:not(.small-title)");
        if (versionNode) versionNode.textContent = "StudyHub " + groups[0].version;
        if (dateNode) dateNode.textContent = "Posledná aktualizácia: " + formatDate(groups[0].release_date);
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", loadChangelog);
    else loadChangelog();
})();
