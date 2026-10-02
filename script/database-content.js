/* StudyHub v2.2 - public DB materials on subject pages */
(function () {
    "use strict";

    function esc(value) {
        return String(value == null ? "" : value)
            .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;").replaceAll("'", "&#039;");
    }

    function currentSlug() {
        const match = window.location.pathname.replace(/\\/g, "/").match(/\/subjects\/([^\/]+)\.html$/);
        if (!match) return "";
        const filename = match[1];
        const aliases = { "3d-tlac": "tlac3d", "uvod-do-studia": "uvod" };
        return aliases[filename] || filename;
    }

    async function loadMaterials() {
        const db = window.studyHubSupabase;
        const slug = currentSlug();
        if (!db || !slug) return;

        const subjectResult = await db
            .from("subjects")
            .select("id,name")
            .eq("slug", slug)
            .maybeSingle();

        if (subjectResult.error || !subjectResult.data) return;

        const result = await db
            .from("materials")
            .select("id,title,type,description,url,created_at")
            .eq("subject_id", subjectResult.data.id)
            .eq("visible", true)
            .order("created_at", { ascending: false });

        if (result.error || !Array.isArray(result.data) || !result.data.length) return;

        const main = document.querySelector("main");
        if (!main || document.getElementById("databaseMaterialsSection")) return;

        const section = document.createElement("section");
        section.className = "subject-content";
        section.id = "databaseMaterialsSection";
        section.innerHTML =
            '<div class="container"><div class="content-block">' +
                '<p class="small-title">Databáza</p>' +
                '<h2>Materiály pridané cez Admin</h2>' +
                '<p class="section-description">Tieto materiály sa načítali priamo zo StudyHub databázy.</p>' +
                '<div class="materials-grid">' +
                    result.data.map(function (item) {
                        const body =
                            '<div class="material-card filterable-material" data-type="' + esc(item.type) + '">' +
                                '<span class="material-type">' + esc(item.type) + '</span>' +
                                '<h3>' + esc(item.title) + '</h3>' +
                                '<p>' + esc(item.description) + '</p>' +
                                (item.url
                                    ? '<a class="btn secondary" href="' + esc(item.url) + '" target="_blank" rel="noopener">Otvoriť materiál</a>'
                                    : '') +
                            '</div>';
                        return body;
                    }).join("") +
                '</div>' +
            '</div></div>';

        main.appendChild(section);
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", loadMaterials);
    else loadMaterials();
})();
