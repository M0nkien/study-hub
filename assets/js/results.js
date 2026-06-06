const RESULTS_KEY = "studyHubQuizResults";

function getResults() {
    const saved = localStorage.getItem(RESULTS_KEY);
    if (!saved) return [];
    try { return JSON.parse(saved); } catch { return []; }
}

function formatDate(value) {
    try { return new Date(value).toLocaleString("sk-SK"); } catch { return value; }
}

function renderResults() {
    const results = getResults();
    const summary = document.getElementById("resultsSummary");
    const list = document.getElementById("resultsList");

    if (!summary || !list) return;

    const best = results.reduce((max, item) => Math.max(max, item.percent || 0), 0);
    const average = results.length ? Math.round(results.reduce((s, i) => s + (i.percent || 0), 0) / results.length) : 0;

    summary.innerHTML = `
        <div class="dashboard-card"><span>Počet testov</span><strong>${results.length}</strong></div>
        <div class="dashboard-card"><span>Najlepší výsledok</span><strong>${best}%</strong></div>
        <div class="dashboard-card"><span>Priemer</span><strong>${average}%</strong></div>
    `;

    if (results.length === 0) {
        list.innerHTML = `<div class="support-empty">Zatiaľ nemáš uložené výsledky. Spusti kvíz v predmete a dokonči ho.</div>`;
        return;
    }

    list.innerHTML = results.map(item => `
        <article class="result-item">
            <div>
                <span>${item.subject || "Kvíz"}</span>
                <h3>${item.testTitle || item.setId || "Test"}</h3>
                <p>${formatDate(item.date)} • režim: ${item.mode}</p>
            </div>
            <strong>${item.score}/${item.total} – ${item.percent}%</strong>
        </article>
    `).join("");
}

document.getElementById("clearResultsBtn")?.addEventListener("click", () => {
    if (confirm("Naozaj chceš vymazať históriu výsledkov?")) {
        localStorage.removeItem(RESULTS_KEY);
        renderResults();
    }
});

renderResults();
