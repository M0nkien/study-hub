/* Study Hub – viditeľnosť predmetov podľa Admin nastavenia
   + admin náhľad skrytých predmetov */

(function () {
    const SUBJECT_VISIBILITY_KEY = "studyHubVisibleSubjects";

    function isAdminPreviewMode() {
        const params = new URLSearchParams(window.location.search);
        return params.get("adminView") === "1" || params.get("admin") === "1";
    }

    function getCards() {
        return Array.from(document.querySelectorAll(".subjects-grid .subject-card[data-subject-id]"));
    }

    function getSavedVisibleIds(cards) {
        const allIds = cards.map(card => card.dataset.subjectId).filter(Boolean);
        const saved = localStorage.getItem(SUBJECT_VISIBILITY_KEY);

        if (!saved) {
            return new Set(allIds);
        }

        try {
            const parsed = JSON.parse(saved);
            if (!Array.isArray(parsed)) return new Set(allIds);
            return new Set(parsed.filter(id => allIds.includes(id)));
        } catch (error) {
            return new Set(allIds);
        }
    }

    function ensureAdminPreviewBadge(card) {
        if (card.querySelector(".subject-admin-preview-badge")) return;

        const badge = document.createElement("span");
        badge.className = "subject-admin-preview-badge";
        badge.textContent = "Skryté v admine";

        const tags = card.querySelector(".subject-card-tags");
        const action = card.querySelector(".subject-card-action");

        if (tags) {
            tags.appendChild(badge);
        } else if (action) {
            action.insertAdjacentElement("beforebegin", badge);
        } else {
            card.appendChild(badge);
        }
    }

    function removeAdminPreviewBadge(card) {
        const badge = card.querySelector(".subject-admin-preview-badge");
        if (badge) badge.remove();
    }

    function updateCounter(cards, adminPreview) {
        const count = document.getElementById("subjectFilterCount");
        const empty = document.getElementById("subjectFilterEmpty");
        if (!count && !empty) return;

        const allowedCards = cards.filter(card => card.dataset.adminVisible !== "false");
        const visibleCards = cards.filter(card => !card.hidden);
        const hiddenByAdmin = cards.filter(card => card.dataset.adminVisible === "false");

        if (count) {
            if (adminPreview) {
                count.textContent = "Admin náhľad: zobrazené všetky predmety " + visibleCards.length + " / " + cards.length + ", z toho skryté v bežnom zobrazení: " + hiddenByAdmin.length;
            } else {
                count.textContent = "Zobrazené predmety: " + allowedCards.filter(card => !card.hidden).length + " / " + allowedCards.length;
            }
        }

        if (empty) {
            if (!adminPreview && allowedCards.length === 0) {
                empty.hidden = false;
                empty.textContent = "V admin paneli nemáš povolený žiadny predmet. Otvor Admin → Viditeľnosť predmetov.";
            } else {
                empty.hidden = visibleCards.length !== 0;
                empty.textContent = "Nič sa nenašlo. Skús kratší výraz alebo iný tag.";
            }
        }
    }

    function showAdminPreviewNotice(cards) {
        if (!isAdminPreviewMode()) return;
        if (document.querySelector(".subjects-admin-preview-notice")) return;

        const hiddenCount = cards.filter(card => card.dataset.adminVisible === "false").length;
        const notice = document.createElement("div");
        notice.className = "subjects-admin-preview-notice";
        notice.innerHTML = `
            <strong>Admin náhľad</strong>
            <span>Zobrazuješ aj predmety, ktoré sú v bežnom zobrazení skryté. Skryté predmety majú štítok „Skryté v admine“.</span>
            <a href="subjects.html">Prepnúť na bežné zobrazenie</a>
        `;

        const target = document.querySelector(".subjects-toolbar") || document.querySelector(".subjects-grid") || document.querySelector("main");
        if (target) target.insertAdjacentElement("beforebegin", notice);
    }

    function applySubjectVisibility() {
        const cards = getCards();
        if (!cards.length) return;

        const adminPreview = isAdminPreviewMode();
        const visibleIds = getSavedVisibleIds(cards);

        cards.forEach(card => {
            const id = card.dataset.subjectId;
            const isAllowed = visibleIds.has(id);

            card.dataset.adminVisible = isAllowed ? "true" : "false";
            card.classList.toggle("subject-admin-hidden", !isAllowed && !adminPreview);
            card.classList.toggle("subject-admin-preview-hidden", !isAllowed && adminPreview);

            if (!isAllowed && !adminPreview) {
                card.hidden = true;
                removeAdminPreviewBadge(card);
            } else {
                card.hidden = false;
                if (!isAllowed && adminPreview) {
                    ensureAdminPreviewBadge(card);
                } else {
                    removeAdminPreviewBadge(card);
                }
            }
        });

        showAdminPreviewNotice(cards);
        updateCounter(cards, adminPreview);
    }

    function delayedApply() {
        window.setTimeout(applySubjectVisibility, 0);
    }

    function initSubjectVisibility() {
        applySubjectVisibility();

        const input = document.getElementById("subjectFilterInput");
        const reset = document.getElementById("subjectFilterReset");
        const chips = Array.from(document.querySelectorAll("[data-status-filter]"));

        if (input) input.addEventListener("input", delayedApply);
        if (reset) reset.addEventListener("click", delayedApply);
        chips.forEach(chip => chip.addEventListener("click", delayedApply));

        window.addEventListener("storage", function (event) {
            if (event.key === SUBJECT_VISIBILITY_KEY) {
                applySubjectVisibility();
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initSubjectVisibility);
    } else {
        initSubjectVisibility();
    }
})();
