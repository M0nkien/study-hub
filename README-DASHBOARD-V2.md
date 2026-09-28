# StudyHub v2 — Light Dashboard redesign

Tento patch prerába vizuál StudyHubu do svetlého dashboard štýlu podľa odsúhlaseného návrhu. Zachováva existujúci obsah a pôvodné funkčné skripty; nový vzhľad je aplikovaný cez `style/v2.css` a spoločný app shell cez `script/v2.js`.

## Hlavné zmeny

- nový svetlý StudyHub v2 dashboard namiesto pôvodného tmavého Midnight Workspace dizajnu,
- pevný ľavý sidebar s predmetmi a nástrojmi,
- horný panel s globálnym vyhľadávaním, prepínačom témy, upozorneniami a lokálnym používateľským profilom,
- nový layout domovskej stránky podľa schváleného mockupu,
- sekcie **Pokračovať tam, kde som skončil**, **Posledný otvorený predmet**, **Najnovšie pridané**, **Mini dashboard**, **Čo je StudyHub?** a **Rýchle odkazy**,
- dynamické zobrazovanie lokálneho progresu a výsledkov z `localStorage`, ak sú v prehliadači dostupné,
- StudyHub si ukladá posledný otvorený predmet a použije ho na karte „Posledný otvorený predmet“,
- lokálny profil používateľa — meno sa dá zmeniť v menu účtu a uloží sa len do daného prehliadača,
- svetlý/tmavý režim s uložením preferencie do `localStorage`,
- mobilný off-canvas sidebar a responzívny dashboard,
- nový jednotný vizuálny systém pre Predmety, predmetové podstránky, Flashcards, Výsledky, Roadmapu, Changelog, Podporu a Admin,
- predmetové karty používajú jemné vlastné farby predmetov, ale zostávajú v spoločnom dizajne,
- upravené formuláre, karty, sidebary, výsledky, roadmapa, admin a footer,
- nové cache-busting verzie `studyhub-dashboard-v2-20260928`, aby sa po nahratí na GitHub Pages nenačítal starý V2 CSS/JS z cache.

## Zmenené súbory

### Hlavné súbory
- `index.html` — kompletne nový dashboard domovskej stránky.
- `style/v2.css` — nový svetlý dashboard dizajn pre celý projekt.
- `script/v2.js` — spoločný sidebar/topbar, účet, vyhľadávanie, téma, mobilné menu, progres a posledný predmet.

### HTML súbory s novým cache-busting parametrom
- `subjects.html`
- `flashcards.html`
- `results.html`
- `roadmap.html`
- `changelog.html`
- `support.html`
- `admin.html`
- `subjects/3d-tlac.html`
- `subjects/algebra.html`
- `subjects/ccna.html`
- `subjects/fyzika.html`
- `subjects/java.html`
- `subjects/linux.html`
- `subjects/mat.html`
- `subjects/msd.html`
- `subjects/praktikum.html`
- `subjects/uvod-do-studia.html`
- `subjects/vvs.html`

## Ako patch nahrať do projektu

1. Rozbaľ ZIP patch.
2. Otvor svoj hlavný priečinok StudyHub projektu.
3. Skopíruj obsah priečinka `studyhub/` z patchu do koreňa svojho projektu.
4. Pri otázke na prepísanie súborov potvrď **Replace / Prepísať**.
5. Zachovaj rovnakú priečinkovú štruktúru (`style/`, `script/`, `subjects/`).
6. Spusť `index.html` lokálne alebo nahraj zmeny na GitHub.
7. Pri GitHub Pages odporúčam po deployi spraviť tvrdý refresh (`Ctrl + F5`).

## Dôležité

- Patch nemení hlavný obsah predmetov ani ich poznámky.
- Pôvodné skripty `main.js`, `fix.js`, admin skripty a predmetová logika zostávajú zachované a nový V2 shell je nad nimi.
- „Účet“ je vizuálny **lokálny profil**, nie serverové prihlasovanie používateľa. Meno a téma sa ukladajú iba v `localStorage` aktuálneho prehliadača.
- Admin panel používa pôvodný spôsob prihlásenia projektu; nový používateľský panel v hornom menu nemení bezpečnostný model admina.
- Hero obrázok na domovskej stránke je urobený čisto cez HTML/CSS, takže patch nepotrebuje ďalšie obrázkové súbory.

## Kontrola

- `script/v2.js` prešiel syntax kontrolou cez Node.js.
- `style/v2.css` bol parsovaný bez CSS parse chýb.
- HTML súbory zachovávajú pôvodnú štruktúru a používajú nový V2 CSS/JS cache parameter.
