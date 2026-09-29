/* StudyHub v2.2 - shared Supabase browser client */
(function () {
    "use strict";

    const cfg = window.STUDYHUB_SUPABASE_CONFIG || {};
    const url = String(cfg.url || "").trim();
    const key = String(cfg.publishableKey || "").trim();

    window.studyHubSupabaseState = {
        configured: false,
        message: "Supabase ešte nie je nakonfigurovaný."
    };

    if (!url || !key) {
        document.dispatchEvent(new CustomEvent("studyhub:supabase-state", {
            detail: window.studyHubSupabaseState
        }));
        return;
    }

    if (!window.supabase || typeof window.supabase.createClient !== "function") {
        window.studyHubSupabaseState.message = "Nepodarilo sa načítať Supabase JavaScript klienta.";
        document.dispatchEvent(new CustomEvent("studyhub:supabase-state", {
            detail: window.studyHubSupabaseState
        }));
        return;
    }

    window.studyHubSupabase = window.supabase.createClient(url, key, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
        }
    });

    window.studyHubSupabaseState = {
        configured: true,
        message: "Supabase je pripojený."
    };

    document.dispatchEvent(new CustomEvent("studyhub:supabase-ready", {
        detail: window.studyHubSupabaseState
    }));
})();
