/* StudyHub v2.1.1 - viditeľnosť predmetov */
(function () {
    "use strict";
    function parseVisibility() {
        try {
            const raw = localStorage.getItem("studyHubSubjectVisibility");
            return raw ? JSON.parse(raw) : {};
        } catch (e) { return {}; }
    }
    document.addEventListener("DOMContentLoaded", function () {
        if (!document.body.classList.contains("page-subjects")) return;
        const visibility = parseVisibility();
        const params = new URLSearchParams(window.location.search);
        const adminView = params.get("adminView") === "1";
        document.querySelectorAll(".subject-card[data-subject-id]").forEach(function (card) {
            const hidden = visibility[card.dataset.subjectId] === false && !adminView;
            card.setAttribute("data-visibility-hidden", hidden ? "true" : "false");
            card.classList.toggle("is-admin-hidden-preview", adminView && visibility[card.dataset.subjectId] === false);
        });
        document.dispatchEvent(new CustomEvent("studyhub:subject-visibility-changed"));
    });
})();
