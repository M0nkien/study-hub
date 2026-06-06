# Study Hub – verzia 3.0

**Study Hub** je neoficiálna študentská webová stránka vytvorená ako digitálna študovňa pre študentov.  
Cieľom stránky je mať na jednom mieste poznámky, zadania, návody, kvízy, kartičky na učenie, checklisty a materiály z viacerých predmetov.

Stránka je zatiaľ riešená ako **statický frontend web**:

```text
HTML
CSS
JavaScript
JSON dáta
localStorage
Google Forms
GitHub Pages
```

Backend zatiaľ nie je potrebný. Stránka funguje priamo v prehliadači a môže byť hostovaná cez GitHub Pages.

---

## Obsah README

```text
1. Čo je Study Hub
2. Aktuálna verzia
3. Hlavné stránky webu
4. Predmety
5. Nová štruktúra priečinkov
6. Frontend súbory
7. JSON dáta
8. Funkcie webu
9. Kvízy
10. Flashcards
11. Checklisty
12. Progres učenia
13. Podpora stránky
14. Admin panel
15. Roadmapa
16. Ako spustiť web lokálne
17. Ako nahrať zmeny na GitHub
18. Čo ešte dopĺňať
19. Plán do budúcna
```

---

# 1. Čo je Study Hub

Study Hub je študentská pomôcka na učenie.  
Je určená na zhromažďovanie školských materiálov z predmetov ako:

```text
Linux
MSD
Cisco / CCNA
Fyzika
Matematika
VVS / ESP32
Java
```

Stránka obsahuje:

```text
- poznámky
- teóriu
- vzorce
- zadania
- postupy výpočtov
- kvízy
- kartičky na učenie
- checklisty pred skúškou
- roadmapu
- podporu cez Google Forms
```

Stránka je vytvorená študentom pre študentov.

---

# 2. Aktuálna verzia

```text
Study Hub v3.0
Posledná väčšia úprava: 06/2026
```

Verzia 3.0 prináša hlavne:

```text
- upratanú štruktúru súborov
- presun CSS do assets/css/
- presun JS do assets/js/
- pridanie JSON dát do data/
- rozšírenie predmetov
- rozšírenie kartičiek
- rozšírenie roadmapy
- CCNA kvízy
- checklisty pred skúškou
- výsledky kvízov
- podporu cez Google Forms
```

---

# 3. Hlavné stránky webu

V hlavnom priečinku sú tieto HTML stránky:

```text
index.html          hlavná stránka
subjects.html       zoznam všetkých predmetov
flashcards.html     kartičky na učenie
results.html        výsledky kvízov
roadmap.html        plán vývoja stránky
support.html        podpora cez Google Forms
admin.html          jednoduchý admin panel
```

## index.html

Hlavná stránka je jednoduchá a čistá.

Obsahuje:

```text
- úvodnú hero sekciu
- tlačidlo „Začať študovať“
- krátke vysvetlenie projektu
- footer
```

Predmety už nie sú priamo na hlavnej stránke.  
Sú presunuté na samostatnú stránku:

```text
subjects.html
```

---

# 4. Predmety

Každý predmet má vlastnú HTML stránku v priečinku:

```text
subjects/
```

Aktuálne predmety:

```text
subjects/linux.html
subjects/msd.html
subjects/ccna.html
subjects/fyzika.html
subjects/mat.html
subjects/vvs.html
subjects/java.html
```

Každý predmet môže obsahovať:

```text
- úvod predmetu
- stav predmetu
- progres učenia
- vyhľadávanie v predmete
- poznámky
- teóriu
- vzorce
- príklady
- checklist
- kvíz
- materiály
- súbory
```

---

# 5. Nová štruktúra priečinkov

Od verzie 3.0 má projekt prehľadnejšiu štruktúru.

```text
study-hub/
│
├── index.html
├── subjects.html
├── flashcards.html
├── results.html
├── roadmap.html
├── support.html
├── admin.html
│
├── subjects/
│   ├── linux.html
│   ├── msd.html
│   ├── ccna.html
│   ├── fyzika.html
│   ├── mat.html
│   ├── vvs.html
│   └── java.html
│
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   ├── subjects.css
│   │   ├── quiz.css
│   │   ├── admin.css
│   │   └── responsive.css
│   │
│   ├── js/
│   │   ├── main.js
│   │   ├── progress.js
│   │   ├── subject-search.js
│   │   ├── filters.js
│   │   ├── quiz-engine.js
│   │   ├── quiz-linux.js
│   │   ├── quiz-msd.js
│   │   ├── quiz-ccna.js
│   │   ├── checklist.js
│   │   ├── flashcards.js
│   │   ├── results.js
│   │   ├── ccna-tools.js
│   │   ├── admin.js
│   │   ├── support.js
│   │   └── data-loader.js
│   │
│   └── img/
│       ├── icons/
│       └── subjects/
│
├── data/
│   ├── subjects.json
│   ├── materials.json
│   ├── quizzes.json
│   ├── flashcards.json
│   ├── roadmap.json
│   └── changelog.json
│
├── files/
│   ├── linux/
│   ├── msd/
│   ├── ccna/
│   ├── fyzika/
│   ├── mat/
│   ├── vvs/
│   └── java/
│
├── README.md
├── README-NEW-STRUCTURE.md
└── cleanup-old-root-files.ps1
```

---

# 6. Frontend súbory

## CSS súbory

CSS je presunuté do:

```text
assets/css/
```

Súbory:

```text
assets/css/style.css
assets/css/subjects.css
assets/css/quiz.css
assets/css/admin.css
assets/css/responsive.css
```

### assets/css/style.css

Hlavný súbor vzhľadu.

Obsahuje:

```text
- farby cez :root
- základný layout
- header
- footer
- hero sekcie
- karty
- tlačidlá
- veľké spoločné štýly
```

Hlavná farba stránky:

```text
#65d4f2
```

### assets/css/subjects.css

Pripravený súbor pre štýly predmetových stránok.

Môže obsahovať:

```text
- subject hero
- subject sidebar
- content block
- predmetové sekcie
- checklisty v predmetoch
```

### assets/css/quiz.css

Pripravený súbor pre kvízy.

Môže obsahovať:

```text
- quiz panel
- odpovede
- výsledkovú obrazovku
- timer
- flashcards
- results.html
```

### assets/css/admin.css

Pripravený súbor pre admin panel.

### assets/css/responsive.css

Pripravený súbor pre mobilné úpravy.

---

## JavaScript súbory

JavaScript je presunutý do:

```text
assets/js/
```

Súbory:

```text
assets/js/main.js
assets/js/progress.js
assets/js/subject-search.js
assets/js/filters.js
assets/js/quiz-engine.js
assets/js/quiz-linux.js
assets/js/quiz-msd.js
assets/js/quiz-ccna.js
assets/js/checklist.js
assets/js/flashcards.js
assets/js/results.js
assets/js/ccna-tools.js
assets/js/admin.js
assets/js/support.js
assets/js/data-loader.js
```

### assets/js/main.js

Hlavný JavaScript stránky.

Rieši:

```text
- mobilné menu
- status predmetov
- dashboard funkcie
- posledné otvorené miesto
- tagy materiálov
```

### assets/js/progress.js

Rieši progres učenia.

Ukladá sa do:

```text
localStorage
```

Funkcie:

```text
- označiť ako naučené
- označiť ako urobené
- označiť ako prejdené
- percentuálny progres predmetu
```

### assets/js/subject-search.js

Vyhľadávanie v rámci predmetovej stránky.

### assets/js/filters.js

Filtrovanie materiálov podľa typu.

Typy:

```text
PDF
kvíz
zadanie
ťahák
poznámky
```

### assets/js/quiz-engine.js

Univerzálny engine pre kvízy.

Podporuje:

```text
- cvičný režim
- skúškový režim
- režim iba nesprávnych otázok
- miešanie otázok
- miešanie odpovedí
- kontrolu odpovedí
- vysvetlenia
- timer
- výsledkovú obrazovku
- uloženie výsledkov do localStorage
```

### assets/js/quiz-linux.js

Otázky pre Linux kvíz.

### assets/js/quiz-msd.js

Otázky pre MSD kvíz.

### assets/js/quiz-ccna.js

Otázky pre CCNA kvíz.

Obsahuje:

```text
- Ethernet
- LLC
- IPv6
- trailer rámca
- optika
- RJ-45
- kapitola 9 ARP/ND
```

### assets/js/checklist.js

Checklist pred skúškou.

Ukladá zaškrtnuté body do:

```text
localStorage
```

### assets/js/flashcards.js

Kartičky na učenie.

Obsahuje kartičky pre:

```text
Linux
CCNA
Fyzika
Matematika
Java
MSD
VVS
```

### assets/js/results.js

História výsledkov kvízov.

Ukladá a zobrazuje:

```text
- predmet
- názov testu
- režim
- skóre
- percentá
- dátum
```

### assets/js/ccna-tools.js

Pomôcky pre CCNA.

Obsahuje:

```text
- jednoduchú VLSM pomôcku
- výpočet potrebného bloku
- výpočet prefixu
- počet použiteľných hostov
```

### assets/js/data-loader.js

Pomocný súbor na budúce načítavanie JSON dát.

---

# 7. JSON dáta

JSON súbory sú v priečinku:

```text
data/
```

Tieto súbory sú pripravené na budúce dynamické generovanie obsahu.

```text
data/subjects.json
data/materials.json
data/quizzes.json
data/flashcards.json
data/roadmap.json
data/changelog.json
```

## data/subjects.json

Obsahuje zoznam predmetov.

Každý predmet má:

```text
id
short
title
status
updated
url
description
icon
tags
```

Príklad:

```json
{
    "id": "linux",
    "short": "LNX",
    "title": "Linux Essentials",
    "status": "hotové",
    "updated": "06/2026",
    "url": "subjects/linux.html",
    "description": "Príkazy, shell, práva, procesy a finálny kvíz.",
    "icon": "terminal",
    "tags": ["CLI", "príkazy", "skúška"]
}
```

## data/materials.json

Obsahuje zoznam materiálov.

Použitie do budúcna:

```text
- stránka files.html
- filtrovanie materiálov
- globálne vyhľadávanie
```

## data/quizzes.json

Obsahuje zoznam kvízov.

Použitie do budúcna:

```text
- stránka quizzes.html
- prehľad všetkých testov
- časové limity testov
```

## data/flashcards.json

Obsahuje kartičky na učenie.

Momentálne sú kartičky stále aj v JavaScripte, ale JSON je pripravený na budúce načítavanie.

## data/roadmap.json

Obsahuje roadmapu.

Kategórie:

```text
hotové
pracuje sa
plánované
nápady
nahlásené chyby
```

## data/changelog.json

Obsahuje históriu zmien stránky.

---

# 8. Funkcie webu

Aktuálne Study Hub podporuje:

```text
- predmety na samostatnej stránke
- samostatné predmetové podstránky
- progres učenia
- checklisty pred skúškou
- kvízy
- režim skúšky
- timer v kvízoch
- história výsledkov
- flashcards
- Google Forms podpora
- roadmapa
- VLSM pomôcka
- filtrovanie materiálov
- vyhľadávanie v predmete
```

---

# 9. Kvízy

Kvízy fungujú cez:

```text
assets/js/quiz-engine.js
```

Kvízové dáta sú v súboroch:

```text
assets/js/quiz-linux.js
assets/js/quiz-msd.js
assets/js/quiz-ccna.js
```

Režimy:

```text
Cvičenie
Skúška
Iba nesprávne otázky
```

Možnosti miešania:

```text
miešať otázky aj odpovede
miešať iba otázky
miešať iba odpovede
nemiešať
```

Výsledok sa uloží do:

```text
localStorage
```

a zobrazí sa na stránke:

```text
results.html
```

---

# 10. Flashcards

Kartičky sú na stránke:

```text
flashcards.html
```

Používajú:

```text
assets/js/flashcards.js
```

Obsahujú témy:

```text
Linux pojmy
CCNA pojmy
Fyzika vzorce
Matematika DR a rady
Java OOP
MSD výpočty
VVS / ESP32
```

Fungovanie:

```text
- vyberie sa predmet
- zobrazí sa otázka
- kliknutím sa kartička otočí
- dá sa ísť ďalej/späť
- dá sa zamiešať poradie
```

---

# 11. Checklisty

Každý predmet má checklist pred skúškou.

Príklady:

```text
Fyzika:
- viem vektory
- viem kinematiku
- viem Newtonove zákony
- viem Steinerovu vetu
- viem kyvadlá

CCNA:
- viem subnetting
- viem VLSM
- viem VLAN
- viem trunk
- viem DHCP
- viem ARP/ND

Matematika:
- viem separovateľnú DR
- viem lineárnu DR
- viem Bernoulliho rovnicu
- viem Laplaceovu transformáciu
- viem rady
```

Checklisty sa ukladajú do:

```text
localStorage
```

---

# 12. Progres učenia

Progres učenia je lokálny.

Ukladá sa v prehliadači.

Použitie:

```text
- označiť sekciu ako naučenú
- označiť labák ako urobený
- označiť kvíz ako prejdený
```

Dôležité:

```text
Progres sa neprenáša medzi zariadeniami.
Každý prehliadač má svoj vlastný progres.
```

---

# 13. Podpora stránky

Podpora je riešená cez:

```text
support.html
Google Forms
```

Použitý formulár:

```text
https://forms.gle/XXvit7yXqpsz2YBc9
```

Používateľ môže nahlásiť:

```text
- chybu v poznámkach
- chybu v kvíze
- nefunkčný odkaz
- návrh na doplnenie
- inú pripomienku
```

Odpovede sa zobrazujú v Google Forms alebo v prepojenej Google tabuľke.

---

# 14. Admin panel

Admin panel je:

```text
admin.html
```

Aktuálne je to iba jednoduchý statický admin panel.

Dôležité:

```text
Nie je to skutočne bezpečný backend admin.
Je to iba frontend riešenie.
```

Skutočný admin bude mať zmysel až vo verzii 2.0 s Firebase.

---

# 15. Roadmapa

Roadmapa je:

```text
roadmap.html
```

Kategórie:

```text
Hotové
Pracuje sa
Plánované
Nápady
Nahlásené chyby
```

Roadmapa obsahuje napríklad:

```text
- jednoduchá hlavná stránka
- predmety na samostatnej stránke
- podpora cez Google Forms
- CCNA kvízy
- MSD poznámky
- Matematika skúškové témy
- Fyzika labáky
- VVS ESP32 poznámky
- plánované quizzes.html
- plánované files.html
- plánované search.html
- nápad Firebase admin
```

---

# 16. Ako spustiť web lokálne

Najjednoduchšie:

```text
1. Otvor priečinok projektu.
2. Dvojklik na index.html.
3. Stránka sa otvorí v prehliadači.
```

Lepšie cez VS Code:

```text
1. Otvor projekt vo VS Code.
2. Nainštaluj rozšírenie Live Server.
3. Klikni pravým na index.html.
4. Vyber Open with Live Server.
```

---

# 17. Ako nahrať zmeny na GitHub

Bežný postup:

```bash
git status
git add .
git commit -m "Update Study Hub"
git push
```

Ak Git vypíše `non-fast-forward`, použi:

```bash
git pull --rebase origin main
git push origin main
```

---

# 18. Staré súbory po presune do assets

Po presune do `assets/` sa staré CSS/JS súbory v hlavnom priečinku môžu vymazať.

Staré root súbory:

```text
style.css
script.js
progress.js
subject-search.js
filters.js
quiz-engine.js
quiz-linux.js
quiz-msd.js
quiz-ccna.js
admin.js
support.js
checklist.js
ccna-tools.js
flashcards.js
results.js
```

Nové umiestnenie:

```text
assets/css/
assets/js/
```

Na odstránenie je pripravený skript:

```text
cleanup-old-root-files.ps1
```

Spustiť až po otestovaní, že web funguje cez nové cesty.

PowerShell:

```powershell
.\cleanup-old-root-files.ps1
```

---

# 19. Čo ešte dopĺňať

Najbližšie odporúčané stránky:

```text
quizzes.html
files.html
search.html
settings.html
study-guide.html
```

## quizzes.html

Stránka so všetkými kvízmi pokope.

## files.html

Stránka so všetkými materiálmi.

## search.html

Globálne vyhľadávanie cez celý web.

## settings.html

Nastavenia používateľa:

```text
- reset progresu
- export progresu
- import progresu
- vymazať výsledky kvízov
```

## study-guide.html

Stránka s návodom, ako sa učiť cez Study Hub.

---

# 20. Plán do budúcna

## Verzia 3.x

Frontend verzia:

```text
HTML
CSS
JavaScript
JSON
localStorage
Google Forms
GitHub Pages
```

Cieľ:

```text
- upratané súbory
- lepšie dáta v JSON
- viac kvízov
- viac kartičiek
- viac materiálov
- viac obsahu v predmetoch
```

## Verzia 4.0 alebo 2.0 backend

Dynamická verzia s backendom:

```text
Firebase Auth
Firestore Database
Firebase Storage
```

V budúcnosti by admin mohol:

```text
- prihlásiť sa
- pridať predmet
- upraviť predmet
- pridať materiál
- nahrať PDF
- pridať otázku do kvízu
- upraviť roadmapu
- upraviť changelog
```

---

# 21. Dôležité upozornenie

Study Hub je neoficiálna študentská pomôcka.

```text
Materiály slúžia iba na vzdelávacie účely.
Autor nezodpovedá za prípadné chyby v poznámkach.
Oficiálne informácie si vždy overte v Moodle alebo u vyučujúceho.
```

---

# 22. Autor

```text
Study Hub
Vytvorené mnou
Neoficiálna študentská pomôcka
```
