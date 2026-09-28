# Study Hub V2 — Midnight Workspace

Dátum redizajnu: **28. 9. 2026**

Táto verzia predstavuje kompletný vizuálny redizajn pôvodného Study Hubu. Obsah predmetov, dáta, PDF súbory a existujúca študijná logika zostali zachované. Nová vrstva V2 mení vzhľad a používateľské rozhranie naprieč celým projektom bez potreby prepisovať existujúce kvízy, progres, filtre alebo checklisty.

## Hlavné zmeny

- nový dizajnový systém **Midnight Workspace**,
- hlavná farba Study Hubu zostáva `#65d4f2`,
- odstránený výrazný neonový vzhľad z produkčných stránok,
- nový sticky header a kompaktnejšia navigácia,
- nové označenie **V2** pri logu,
- nová hlavná stránka s dashboardom,
- dynamický študijný snapshot z localStorage,
- pokračovanie na poslednom otvorenom mieste,
- nové karty rýchlych nástrojov,
- prepracované predmetové karty,
- jemné vlastné farby jednotlivých predmetov,
- prepracovaný hero blok na interných stránkach,
- nový sticky sidebar na predmetových stránkach,
- aktívna sekcia v sidebare podľa scrollovania,
- nový vzhľad obsahových blokov, materiálov, otázok a riešených príkladov,
- zjednotený vzhľad Flashcards, Results, Roadmap, Support a Admin,
- prepracovaná pätička,
- nové mobilné menu,
- nové responzívne rozloženie pre tablet a mobil,
- tlačidlo na návrat hore,
- jemné reveal animácie s podporou `prefers-reduced-motion`,
- changelog doplnený o verziu V2,
- roadmapa premenovaná na V2,
- pätičky aktualizované na `Study Hub V2 • Aktualizácia: 09/2026`.

## Nové súbory

### `style/v2.css`
Hlavná vizuálna vrstva Study Hub V2. Načítava sa ako posledný CSS súbor a preberá vizuálne riadenie nad pôvodnými štýlmi.

### `script/v2.js`
Obsahuje UI funkcie V2:
- aktívny odkaz v navigácii,
- aktívnu sekciu predmetového sidebaru,
- tlačidlo „späť hore“,
- animácie zobrazovania kariet,
- domáci snapshot progresu,
- vylepšenie mobilného menu,
- aktualizáciu označenia verzie v pätičke.

## Upravené súbory

### Hlavné stránky
- `index.html` — kompletne nová domovská stránka V2,
- `subjects.html`,
- `flashcards.html`,
- `results.html`,
- `roadmap.html`,
- `changelog.html`,
- `support.html`,
- `admin.html`.

### Predmetové stránky
- `subjects/3d-tlac.html`,
- `subjects/algebra.html`,
- `subjects/ccna.html`,
- `subjects/fyzika.html`,
- `subjects/java.html`,
- `subjects/linux.html`,
- `subjects/mat.html`,
- `subjects/msd.html`,
- `subjects/praktikum.html`,
- `subjects/uvod-do-studia.html`,
- `subjects/vvs.html`.

Na týchto stránkach bol pridaný nový `v2.css` a `v2.js`. Obsah predmetov nebol odstránený.

## Čo zostalo zachované

- všetky predmetové HTML stránky,
- všetky PDF a obrázky,
- `data/*.json`,
- progres učenia v localStorage,
- označovanie sekcií ako naučené,
- checklisty,
- filtre materiálov,
- vyhľadávanie predmetov,
- flashcards,
- kvízové enginy,
- história výsledkov,
- predmetové farby a tematické rozlíšenie,
- admin logika,
- podpora cez Google Forms.

## Pôvodný neonový dizajn

Súbor `style/neon-dashboard.css` zostal v projekte kvôli histórii a preview stránkam, ale produkčné stránky ho už nenačítavajú. Preto sa s novým V2 vzhľadom nebije.

## Nahratie na GitHub Pages — celý balík

1. Rozbaľ `studyhub-v2.zip`.
2. Otvor priečinok `studyhub`.
3. Nahraď obsah svojho GitHub repozitára obsahom tohto priečinka.
4. Zachovaj rovnakú adresárovú štruktúru (`style`, `script`, `data`, `subjects`, `files`, `images`).
5. Commitni a pushni zmeny.
6. Po nasadení sprav tvrdý refresh stránky: `Ctrl + F5`.

## Nahratie na GitHub Pages — patch

Ak už máš poslednú verziu `studyhub-modern-neon-applied`, môžeš použiť iba patch:

1. Rozbaľ `studyhub-v2-patch.zip`.
2. Skopíruj obsah priečinka `studyhub` do koreňa existujúceho projektu.
3. Pri otázke na prepísanie súborov zvoľ **Replace / Prepísať**.
4. Nové súbory `style/v2.css`, `script/v2.js` a `README-V2.md` musia zostať v príslušných priečinkoch.
5. Commitni a pushni zmeny.
6. Na GitHub Pages sprav `Ctrl + F5`.

## Kontrola po nahratí

Skontroluj najmä:

- `index.html` — nový V2 dashboard,
- `subjects.html` — nové predmetové karty a filter,
- `subjects/fyzika.html` — nový sidebar a obsahové bloky,
- `flashcards.html` — dizajn kartičiek,
- `roadmap.html` — nové V2 panely,
- mobilné menu pri úzkom okne,
- progres a tlačidlá „Označiť ako naučené“,
- vyhľadávanie predmetov,
- kvízy a výsledky.

## Cache

V2 súbory sú pripájané s verziou:

- `style/v2.css?v=studyhub-v2-20260928`
- `script/v2.js?v=studyhub-v2-20260928`

To pomáha obísť starú cache prehliadača a GitHub Pages.
