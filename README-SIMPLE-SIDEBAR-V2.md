# StudyHub v2 — zjednodušený sidebar

Tento patch upravuje iba hlavnú ľavú navigáciu StudyHubu. Tmavý dashboard, topbar, účet, vyhľadávanie, predmetové stránky a ostatné funkcie zostávajú zachované.

## Nové rozloženie sidebaru

V ľavom paneli sa teraz zobrazujú iba tieto hlavné položky:

1. **Domov** — `index.html`
2. **Predmety** — `subjects.html`
3. **Flashcards** — `flashcards.html`
4. **Výsledky** — `results.html`
5. **Roadmapa** — `roadmap.html`
6. **Podpora** — `support.html`

## Čo bolo odstránené zo sidebaru

- samostatné odkazy na MSD,
- Linux,
- Cisco CCNA / PIKS,
- VVS,
- Fyziku,
- Matematiku,
- 3D tlač,
- Algebru,
- Praktikum z programovania,
- Úvod do štúdia,
- nadpisy „Ďalšie predmety“ a „Nástroje“,
- spodný blok s verziou stránky a stavom systému.

Všetky predmety zostávajú dostupné cez stránku **Predmety**.

## Aktívna navigácia

Keď používateľ otvorí napríklad:

- `subjects/linux.html`,
- `subjects/msd.html`,
- `subjects/fyzika.html`,
- alebo inú predmetovú podstránku,

v hlavnom sidebare zostane zvýraznená položka **Predmety**. Používateľ tak vždy vie, v ktorej hlavnej časti StudyHubu sa nachádza.

## Dizajn

- pôvodný tmavý StudyHub v2 dizajn zostáva zachovaný,
- položky sidebaru majú jednotnú výšku,
- medzi položkami je väčší a pravidelný rozostup,
- aktívna položka používa rovnaké modré zvýraznenie ako doteraz,
- mobilné vysúvacie menu funguje rovnako ako pred úpravou.

## Zmenené súbory

- `script/v2.js` — nové zjednodušené menu a aktívny stav položky Predmety,
- `style/v2.css` — rozostupy pre nové jednoduché menu,
- všetky HTML stránky — nový cache parameter pre `v2.css` a `v2.js`, aby prehliadač/GitHub Pages nenačítal starú verziu.

## Ako patch nahrať

1. Rozbaľ ZIP.
2. Otvor koreň svojho StudyHub projektu.
3. Skopíruj obsah priečinka `studyhub/` do projektu.
4. Potvrď **Replace / Prepísať**.
5. Nahraj zmeny na GitHub.
6. Po deployi urob `Ctrl + F5`.

## Kontrola

- `script/v2.js` prešiel Node syntax kontrolou,
- nové odkazy smerujú na existujúce stránky,
- predmetové podstránky automaticky zvýrazňujú položku **Predmety**.
