/* StudyHub v2.2 - augment global search index with Supabase content */
(function () {
    "use strict";

    async function augmentSearch() {
        const db = window.studyHubSupabase;
        if (!db || !Array.isArray(window.STUDYHUB_SEARCH_INDEX)) return;

        const [subjectsResult, materialsResult, roadmapResult, changelogResult] = await Promise.all([
            db.from("subjects").select("slug,name,description,href").eq("visible", true),
            db.from("materials").select("title,description,type,url,subject_id").eq("visible", true),
            db.from("roadmap_items").select("title,description,subject,status").eq("visible", true),
            db.from("changelog_entries").select("title,description,version,change_type").eq("visible", true)
        ]);

        const subjectMap = new Map();
        (subjectsResult.data || []).forEach(function (subject) {
            subjectMap.set(subject.slug, subject);
            window.STUDYHUB_SEARCH_INDEX.push({
                title: subject.name,
                type: "Predmet",
                url: subject.href,
                subject: subject.name,
                keywords: subject.description || "",
                snippet: subject.description || "Predmet StudyHub"
            });
        });

        const subjectById = new Map();
        if (!subjectsResult.error) {
            const idResult = await db.from("subjects").select("id,name,href").eq("visible", true);
            (idResult.data || []).forEach(function (subject) { subjectById.set(subject.id, subject); });
        }

        (materialsResult.data || []).forEach(function (item) {
            const subject = subjectById.get(item.subject_id);
            window.STUDYHUB_SEARCH_INDEX.push({
                title: item.title,
                type: item.type || "Materiál",
                url: item.url || subject?.href || "subjects.html",
                subject: subject?.name || "StudyHub",
                keywords: item.description || "",
                snippet: item.description || "Materiál z databázy"
            });
        });

        (roadmapResult.data || []).forEach(function (item) {
            window.STUDYHUB_SEARCH_INDEX.push({
                title: item.title,
                type: "Roadmapa",
                url: "roadmap.html",
                subject: item.subject || "StudyHub",
                keywords: (item.description || "") + " " + (item.status || ""),
                snippet: item.description || "Roadmap položka"
            });
        });

        (changelogResult.data || []).forEach(function (item) {
            window.STUDYHUB_SEARCH_INDEX.push({
                title: item.title,
                type: "Changelog",
                url: "changelog.html",
                subject: item.version || "StudyHub",
                keywords: (item.description || "") + " " + (item.change_type || ""),
                snippet: item.description || "Zmena StudyHub"
            });
        });

        document.dispatchEvent(new CustomEvent("studyhub:database-search-ready"));
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", augmentSearch);
    else augmentSearch();
})();
