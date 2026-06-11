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


## Rozdelenie style.css do CSS modulov

Upravené:
- pôvodný veľký `assets/css/style.css` bol rozdelený do priečinka `assets/css/modules/`,
- `style.css` teraz slúži ako hlavný importný súbor,
- pridaný `assets/css/README-CSS.md`,
- v HTML súboroch bol pridaný cache-busting parameter `?v=20260608-split`,
- poradie importov zachováva pôvodné poradie CSS pravidiel.


## Priečinky style a script

Upravené:
- CSS súbory boli presunuté do priečinka `style/`,
- hlavný CSS súbor je `style/main.css`,
- JavaScript súbory boli presunuté do priečinka `script/`,
- hlavný JS súbor je `script/main.js`,
- opravný JS súbor je `script/fix.js`,
- HTML stránky používajú nové cesty s cache-busting parametrom `?v=20260608-style-script`.


## Predmetové pozadia, roadmapa a README.md

Upravené:
- vrátené farebné pozadia predmetových podstránok,
- doplnené viditeľné farby stavov Hotové / Dopĺňa sa / Rozpracované,
- vytvorený `style/subject-pages.css`, pretože HTML naň odkazovalo,
- doplnený `style/fix.css` ako posledný opravný CSS súbor,
- flashcards používajú farbu aktuálne zvoleného predmetu,
- roadmapa bola prepracovaná na nové rozloženie,
- pridaný hlavný `README.md` pre GitHub.


## Oprava šírky checklistu na predmetových stránkach

Upravené:
- checklist pred skúškou už nemá pôsobiť ako sekcia na celú šírku obrazovky,
- v `style/fix.css` a `style/subject-pages.css` bol pridaný blok na obmedzenie šírky checklistu,
- ak je checklist mimo hlavného content stĺpca, nastaví sa na šírku `min(100%, 920px)`,
- do `README.md` boli doplnené odporúčané vylepšenia projektu.


## Finálna oprava checklist layoutu

Upravené:
- pridaný `style/checklist.css`,
- checklist v predmetoch má obmedzenú šírku na `min(100%, 920px)`,
- ak je checklist vo vnútri `.subject-main`, správa sa ako ostatné obsahové sekcie,
- položky checklistu majú 2 stĺpce na veľkej obrazovke a 1 stĺpec na mobile,
- README.md bol doplnený o návrhy ďalších úprav.


## Study Hub v3.3 – changelog a veľké frontendové vylepšenia

Pridané:
- `changelog.html`,
- vylepšená hlavná stránka s mini dashboardom,
- tlačidlo Pokračovať tam, kde som skončil,
- najnovšie pridané,
- nové flashcards režimy,
- história flashcards,
- export flashcards,
- roadmapa ako projektový plán,
- sekcia Štruktúra predmetu v každom predmete,
- nové tematické checklisty,
- `script/checklist.js`.


## Presmerovanie starých JS odkazov

Upravené:
- staré `assets/js/*.js` odkazy boli prepísané na `script/*.js`,
- do patchu boli doplnené pôvodné pomocné skripty pre kvízy, filtre a progress,
- tým sa znižuje riziko 404 chýb po presune štruktúry.


## Flashcards história iba 3 posledné položky

Upravené:
- v `script/flashcards.js` sa v histórii učenia zobrazujú iba 3 posledné záznamy,
- pôvodné zobrazenie viacerých posledných položiek bolo skrátené na 3,
- počítadlo História zobrazuje maximálne hodnotu 3.


## Kvízy – farby a navigácia podľa režimu

Upravené:
- správna odpoveď v cvičnom režime je zelená,
- nesprávna odpoveď ostáva červená,
- vysvetlenie odpovede má žltú/oranžovú farbu,
- v skúškovom režime sa nedá vracať späť k otázkam,
- v cvičnom režime sa dá vracať späť,
- kvíz si pamätá zodpovedané otázky, aby sa skóre nezapočítalo viackrát.


## Fyzika – teória, vzorce, jednotky a labáky

Upravené:
- vo `subjects/fyzika.html` bola doplnená farebná legenda k vzorovej písomke,
- červená = odvodenie, žltá = príklad, modrá = teoretická otázka,
- rozšírená bola teória ku skúške,
- doplnené boli vzorce na výpočty,
- doplnená bola tabuľka veličín a jednotiek,
- doplnené boli detailné karty vzorcov s vysvetlením písmen,
- laboratórne merania boli rozšírené na 5 vzorových labákov,
- pridaná bola štruktúra protokolu z labáku,
- v `style/fix.css` a `style/subject-pages.css` boli doplnené štýly pre nové fyzikálne bloky.


## Fyzika – ďalšie skúškové písomky

Upravené:
- v `subjects/fyzika.html` bola rozšírená sekcia `Vzorová písomka`,
- doplnené boli 4 varianty skúškových písomiek z fotiek,
- úlohy sú farebne rozlíšené podľa typu:
  - červená = odvodenie,
  - žltá = výpočtový príklad,
  - modrá = teoretická otázka,
- pridaný bol prehľad najčastejších tém, ktoré sa v písomkách opakujú,
- v `style/fix.css` a `style/subject-pages.css` boli pridané štýly pre bloky variantov.


## Fyzika – riešené príklady ako otváracie časti

Upravené:
- v `subjects/fyzika.html` bola rozšírená sekcia `Vzorový príklad`,
- doplnené boli riešené príklady 5.1 až 5.7,
- každý príklad je samostatný `<details>` blok,
- príklady sa dajú otvárať a zatvárať,
- každý príklad obsahuje zadanie, známe hodnoty, riešenie a výsledok,
- výpočty boli skontrolované,
- v `style/fix.css` a `style/subject-pages.css` boli doplnené štýly pre otváracie príklady.


## Admin – viditeľnosť predmetov

Pridané súbory a zmeny:

```text
admin.html
subjects.html
script/admin.js
script/subject-visibility.js
style/fix.css
```

Funkcia:

```text
- v admin paneli sa dá nastaviť, ktoré predmety budú viditeľné na stránke subjects.html,
- nastavenie sa ukladá do localStorage pod kľúč studyHubVisibleSubjects,
- subjects.html cez script/subject-visibility.js skryje predmetové karty podľa data-subject-id,
- predvolene sa zobrazujú všetky predmety,
- nastavenie je lokálne pre konkrétny prehliadač.
```


## Admin – náhľad skrytých predmetov

Pridané k nastaveniu viditeľnosti predmetov:

```text
- tlačidlo „Admin náhľad – aj skryté“ v admin paneli,
- admin otvorí `subjects.html?adminView=1`,
- v tomto režime sa zobrazia aj predmety skryté v bežnom zobrazení,
- skryté predmety majú vizuálny štítok „Skryté v admine“,
- v admin paneli je zoznam aktuálne skrytých predmetov.
```

Bežné zobrazenie `subjects.html` ostáva nezmenené. Skryté predmety sa tam nezobrazujú.


## Admin – presmerovanie na konkrétny predmet

Doplnené:

- v `script/admin.js` má každý predmet vlastnosť `path`,
- v admin sekcii Viditeľnosť predmetov je pri každom predmete odkaz `Otvoriť predmet`,
- pridaný je aj odkaz `Náhľad v zozname`, ktorý otvorí `subjects.html?adminView=1`,
- v `style/fix.css` sú doplnené štýly pre nové admin odkazy,
- v `admin.html` sú upravené cache verzie CSS/JS.
