/* StudyHub v2.2 - Supabase auth state reflected in the shared account menu */
(function () {
    "use strict";

    function rootPrefix() {
        return window.location.pathname.replace(/\\/g, "/").includes("/subjects/") ? "../" : "";
    }

    function adminIcon() {
        return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 4 5v6c0 5 3.5 9.4 8 11 4.5-1.6 8-6 8-11V5z"/><path d="m9 12 2 2 4-4"/></svg>';
    }

    function setGuestUi() {
        sessionStorage.removeItem("studyHubAdminUnlocked");
        sessionStorage.removeItem("studyHubAdminLoggedIn");

        const popover = document.querySelector(".v2-account-popover");
        if (!popover) return;

        popover.querySelectorAll(".v2-admin-logout").forEach(function (node) { node.remove(); });

        let adminLink = popover.querySelector('a[href$="admin.html"]');
        if (!adminLink) {
            adminLink = document.createElement("a");
            adminLink.href = rootPrefix() + "admin.html";
            const editProfile = popover.querySelector(".v2-edit-profile");
            if (editProfile) popover.insertBefore(adminLink, editProfile);
            else popover.appendChild(adminLink);
        }
        adminLink.innerHTML = adminIcon() + "<span>Admin prihlásenie</span>";

        const accountSmall = document.querySelector(".v2-account-copy small");
        if (accountSmall) accountSmall.textContent = "Lokálny profil";
    }

    function setAdminUi(user, profile) {
        sessionStorage.setItem("studyHubAdminUnlocked", "true");
        sessionStorage.setItem("studyHubAdminLoggedIn", "1");

        const popover = document.querySelector(".v2-account-popover");
        if (!popover) return;

        let adminLink = popover.querySelector('a[href$="admin.html"]');
        if (!adminLink) {
            adminLink = document.createElement("a");
            adminLink.href = rootPrefix() + "admin.html";
            const editProfile = popover.querySelector(".v2-edit-profile");
            if (editProfile) popover.insertBefore(adminLink, editProfile);
            else popover.appendChild(adminLink);
        }
        adminLink.innerHTML = adminIcon() + "<span>Admin panel</span>";

        let logout = popover.querySelector(".v2-admin-logout");
        if (!logout) {
            logout = document.createElement("button");
            logout.type = "button";
            logout.className = "v2-admin-logout";
            logout.innerHTML = adminIcon() + "<span>Odhlásiť admin</span>";
            adminLink.insertAdjacentElement("afterend", logout);
        }

        const accountSmall = document.querySelector(".v2-account-copy small");
        if (accountSmall) accountSmall.textContent = "Admin účet";

        const headSmall = popover.querySelector(".v2-account-head small");
        if (headSmall) headSmall.textContent = user?.email || "Prihlásený cez Supabase";

        const names = document.querySelectorAll(".v2-profile-name");
        const displayName = profile?.display_name || user?.email?.split("@")[0] || "Admin";
        names.forEach(function (node) { node.textContent = displayName; });

        logout.onclick = async function () {
            if (window.studyHubSupabase) await window.studyHubSupabase.auth.signOut();
            setGuestUi();
            window.location.href = rootPrefix() + "index.html";
        };
    }

    async function syncAuthUi() {
        const db = window.studyHubSupabase;
        if (!db) {
            setGuestUi();
            return;
        }

        const sessionResult = await db.auth.getSession();
        const user = sessionResult.data?.session?.user;
        if (!user) {
            setGuestUi();
            return;
        }

        const profileResult = await db
            .from("profiles")
            .select("display_name,role")
            .eq("id", user.id)
            .maybeSingle();

        if (profileResult.data?.role === "admin") setAdminUi(user, profileResult.data);
        else setGuestUi();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function () {
            window.setTimeout(syncAuthUi, 0);
        });
    } else {
        window.setTimeout(syncAuthUi, 0);
    }
})();