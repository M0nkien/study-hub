/* StudyHub v2.2 - cloud Study streak for authenticated users */
(function () {
    "use strict";

    function dateKey(date) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");
        return y + "-" + m + "-" + d;
    }

    function calculateStreak(dates) {
        const unique = Array.from(new Set(dates)).sort();
        const set = new Set(unique);
        let current = 0;
        let cursor = new Date();
        cursor.setHours(12, 0, 0, 0);

        while (set.has(dateKey(cursor))) {
            current++;
            cursor.setDate(cursor.getDate() - 1);
        }

        let best = 0;
        let run = 0;
        let previous = null;
        unique.forEach(function (key) {
            const currentDate = new Date(key + "T12:00:00");
            if (previous) {
                const diff = Math.round((currentDate - previous) / 86400000);
                run = diff === 1 ? run + 1 : 1;
            } else {
                run = 1;
            }
            if (run > best) best = run;
            previous = currentDate;
        });

        return { current: current, best: best };
    }

    function syncUi(streak) {
        const current = document.getElementById("v21StreakCurrent");
        const best = document.getElementById("v21StreakBest");
        const mini = document.getElementById("v2StudyStreak");

        if (current) current.textContent = streak.current + (streak.current === 1 ? " deň" : " dní");
        if (best) best.textContent = streak.best + (streak.best === 1 ? " deň" : " dní");
        if (mini) mini.textContent = streak.current + (streak.current === 1 ? " deň" : " dní");
    }

    async function syncActivity() {
        const db = window.studyHubSupabase;
        if (!db) return;

        const sessionResult = await db.auth.getSession();
        const user = sessionResult.data?.session?.user;
        if (!user) return;

        const today = dateKey(new Date());
        const upsert = await db
            .from("user_activity")
            .upsert({
                user_id: user.id,
                activity_date: today,
                activity_type: "study"
            }, {
                onConflict: "user_id,activity_date,activity_type",
                ignoreDuplicates: true
            });

        if (upsert.error) {
            console.warn("StudyHub activity sync:", upsert.error.message);
            return;
        }

        const from = new Date();
        from.setDate(from.getDate() - 365);

        const result = await db
            .from("user_activity")
            .select("activity_date")
            .eq("user_id", user.id)
            .gte("activity_date", dateKey(from))
            .order("activity_date", { ascending: true });

        if (result.error) return;
        const streak = calculateStreak((result.data || []).map(function (row) { return row.activity_date; }));
        syncUi(streak);
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () {
        window.setTimeout(syncActivity, 100);
    });
    else window.setTimeout(syncActivity, 100);
})();
