# Study Hub – nová štruktúra súborov

Tento patch upratuje frontend štruktúru projektu.

## Nové priečinky

```text
assets/
├── css/
│   ├── style.css
│   ├── subjects.css
│   ├── quiz.css
│   ├── admin.css
│   └── responsive.css
│
├── js/
│   ├── main.js
│   ├── progress.js
│   ├── subject-search.js
│   ├── filters.js
│   ├── quiz-engine.js
│   ├── quiz-linux.js
│   ├── quiz-msd.js
│   ├── quiz-ccna.js
│   ├── checklist.js
│   ├── flashcards.js
│   ├── results.js
│   ├── ccna-tools.js
│   ├── admin.js
│   ├── support.js
│   └── data-loader.js
│
└── img/
    ├── icons/
    └── subjects/

data/
├── subjects.json
├── materials.json
├── quizzes.json
├── flashcards.json
├── roadmap.json
└── changelog.json
```

## Dôležité

HTML súbory už načítavajú CSS a JS z `assets/`.

Staré súbory v koreňovom priečinku, napríklad `style.css`, `script.js`, `flashcards.js`, `quiz-engine.js`,
môžeš po otestovaní odstrániť. Na to je pripravený súbor `cleanup-old-root-files.ps1`.

## Git príkazy

```bash
git add .
git commit -m "Reorganize frontend assets and add JSON data"
git push
```


## Nové predmety

Pridané predmety: 3D tlač, Algebra, Praktikum z programovania, Úvod do štúdia.

## Unikátny vzhľad predmetov

Pridaný bol nový dizajn predmetových kariet:
- odstránená vodorovná čiarka/progress bar z kariet,
- pridané tagy predmetov,
- pridaný krátky popis, čo sa v predmete robí,
- odstránené vyhľadávacie pole zo stránky predmetov,
- upravený vizuál tak, aby Study Hub pôsobil viac vlastne a menej ako Fricapsule.

## Status tagy a ďalší dizajn

Pridané:
- stavový tag na každú kartu predmetu,
- legenda stavov: Hotové / Dopĺňa sa / Rozpracované,
- nové dizajnové návrhy do roadmapy,
- predmety pôsobia viac ako Study Hub dashboard a menej ako Fricapsule.

## Unikátny vzhľad všetkých stránok

Pridané body classes a špecifické vizuálne akcenty:
- page-home
- page-subjects
- page-flashcards
- page-results
- page-roadmap
- page-support
- page-admin
- page-subject-detail + subject-theme-*

Každá časť stránky má jemne odlišný vizuálny štýl:
- hlavná stránka ako čistý portál,
- predmety ako dashboard,
- kartičky ako kartotéka,
- výsledky ako dátový panel,
- roadmapa ako produktová mapa,
- podpora ako kontaktný portál,
- admin ako kontrolný panel,
- každý predmet má vlastný farebný akcent.

## Tagy priamo v predmetoch

Každá predmetová stránka má teraz vlastné tagy v hornej hero sekcii.
Tagy ukazujú hlavné témy predmetu, napríklad:
- Fyzika: vzorce, odvodenia, okruhy skúška, písomka,
- CCNA: Packet Tracer, ARP/ND, Ethernet, VLSM,
- Matematika: DR, Laplace, Fourierov rad, rady,
- Praktikum: Java, ArrayList, triedy, testové úlohy.

## Tagy priamo na kartách predmetov

Na stránke `subjects.html` sú tagy a stav predmetu zapísané priamo v HTML kartách.
To znamená, že sa zobrazia aj bez čakania na JavaScript.

Každá karta obsahuje:
- stav predmetu,
- krátku poznámku k stavu,
- 3 hlavné tagy predmetu,
- percento progresu vpravo hore.

## Vlastná farba každého predmetu

Každý predmet má vlastnú akcentovú farbu na karte aj na detailnej stránke.

Príklady:
- Linux: svetlomodrá,
- MSD: tyrkysová,
- CCNA: modrá,
- Fyzika: oranžová,
- Matematika: fialová,
- VVS: zelená,
- Java: oranžová,
- 3D tlač: ružová,
- Algebra: fialovo-ružová,
- Praktikum: žltá,
- Úvod do štúdia: tyrkysovo-zelená.

## Opravený vyhľadávač predmetov a extra kartičky

Pridané:
- funkčný vyhľadávač predmetov na `subjects.html`,
- filtrovanie podľa textu, tagov, názvu a popisu,
- filtrovanie podľa stavu: Hotové / Dopĺňa sa / Rozpracované,
- vyhľadávanie funguje aj bez diakritiky,
- viac základných flashcards ku každému predmetu.


## Study Hub v3.1 – hlavná stránka a témy

Pridané:
- nové rozloženie hlavnej stránky,
- odstránenie textového pozadia STUDYHUB,
- dekoratívne tvary namiesto textového pozadia,
- čitateľnejšia pätička,
- text Vytvorené MG,
- prepínanie čiernej a svetlej témy cez localStorage.


## Hlavná stránka späť na čistejšie rozloženie

Upravené:
- odstránené dekoratívne tvary z hlavnej stránky,
- vrátené centrované rozloženie hero sekcie,
- ponechané tlačidlo Nahlásiť chybu,
- ponechaná nová čitateľnejšia pätička,
- ponechaný text Vytvorené MG.


## Zjednotená pätička na všetkých podstránkach

Upravené:
- rovnaká pätička ako na hlavnej stránke bola pridaná na všetky hlavné podstránky,
- rovnaká pätička bola pridaná aj na všetky predmetové stránky,
- z podstránok boli odstránené veľké dekoratívne nápisy v pozadí,
- na hlavnej stránke boli pridané jemné tvary bez textového pozadia STUDYHUB.


## Oprava vyhľadávania, farby kartičiek a checklist naspodok

Upravené:
- opravená syntax chyba v main.js, ktorá blokovala vyhľadávač predmetov,
- vyhľadávač predmetov filtruje karty podľa názvu, tagov a textu,
- odstránené druhé vyhľadávanie z jednotlivých predmetov,
- flashcards menia farbu podľa zvoleného predmetu,
- checklist „Čo by som mal vedieť“ je presunutý ako posledná sekcia,
- hover v bočnom paneli predmetu používa farbu daného predmetu.


## Vycentrovanie panelu tagov v predmete

Upravené:
- panel tagov v hero časti predmetovej stránky je vycentrovaný,
- napríklad pri Matematike je panel zarovnaný na stred stránky,
- na mobile sa vypne posun, aby nevznikol horizontálny scroll.


## Iba jeden stavový tag na karte a statický stav na podstránkach

Upravené:
- na kartách predmetov sa už nemá zobrazovať duplicitný stavový tag,
- starší JS status badge sa nepridá, ak karta už má statický status,
- každá predmetová podstránka má stav a tagy zapísané priamo v HTML,
- stavové tagy na podstránkach sú farebne odlíšené podľa stavu.


## Oprava rozbitého vzhľadu po GitHub Pages

Pridané:
- `assets/css/studyhub-fix.css`,
- `assets/js/studyhub-fix.js`,
- odkazy na opravné súbory vo všetkých hlavných stránkach a predmetových stránkach,
- cache-busting parameter `?v=20260608`,
- oprava vyhľadávania predmetov aj v prípade, že starý main.js zlyhá.

Dôvod:
- po nahratí na GitHub Pages sa časť štýlov a JS správania nezobrazovala správne,
- nový fix súbor sa načíta ako posledný a opraví layout.
