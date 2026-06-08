# Study Hub v3.3

**Study Hub** je neoficiálna študentská digitálna študovňa vytvorená pre rýchle učenie, opakovanie a zdieľanie školských materiálov.

Autor projektu: **MG**

Stránka je postavená ako statický frontend projekt pre **GitHub Pages**. Obsahuje predmety, poznámky, kvízy, flashcards, checklisty, výsledky, roadmapu, changelog, podporu a jednoduchý admin panel.

---

## Stav projektu

```text
Verzia: Study Hub v3.3
Posledná aktualizácia: 06/2026
Typ projektu: statický web
Hosting: GitHub Pages
Frontend: HTML, CSS, JavaScript
Ukladanie dát používateľa: localStorage
Dátové súbory: JSON
Backend: zatiaľ nie je použitý
```

---

## Čo stránka obsahuje

```text
- hlavnú stránku,
- stránku všetkých predmetov,
- samostatné predmetové podstránky,
- flashcards kartičky,
- kvízy,
- výsledky kvízov,
- roadmapu,
- changelog,
- podporu cez formulár,
- admin sekciu,
- checklisty pred skúškou,
- progres učenia,
- súbory a materiály,
- JSON dátové súbory.
```

---

## Hlavné stránky

```text
index.html          hlavná stránka
subjects.html       zoznam všetkých predmetov
flashcards.html     kartičky na učenie
results.html        výsledky kvízov
roadmap.html        plán vývoja projektu
changelog.html      história zmien
support.html        podpora a formulár
admin.html          admin panel
```

---

## Predmety

Stránka aktuálne obsahuje tieto predmety:

```text
Linux Essentials
MSD – Metódy spracovania dát
Cisco / CCNA
Fyzika
Matematika
VVS / ESP32
Java / Informatika
3D tlač
Algebra
Praktikum z programovania
Úvod do štúdia
```

Každý predmet má vlastnú podstránku v priečinku:

```text
subjects/
```

Príklady:

```text
subjects/linux.html
subjects/msd.html
subjects/ccna.html
subjects/fyzika.html
subjects/mat.html
subjects/vvs.html
subjects/java.html
```

---

## Čo obsahuje predmetová stránka

Predmetová stránka je navrhnutá ako študijný modul. Môže obsahovať:

```text
- úvodný nadpis,
- stav predmetu,
- tagy predmetu,
- progres učenia,
- bočný obsah predmetu,
- poznámky,
- kompletnú teóriu,
- sekciu štúdium,
- štruktúru predmetu,
- plán doplnenia obsahu,
- materiály,
- kvíz,
- súbory,
- checklist pred skúškou.
```

---

## Stavy predmetov

Predmety používajú stav:

```text
Hotové
Dopĺňa sa
Rozpracované
```

Stavy sú farebne odlíšené a zobrazujú sa pri predmetoch aj na predmetových stránkach.

---

## Flashcards

Flashcards slúžia na rýchle opakovanie pojmov, príkazov, vzorcov a definícií.

Aktuálne funkcie:

```text
- výber predmetu,
- výber témy,
- režim učenia,
- režim skúšania,
- režim iba nevedené,
- náhodné poradie,
- označenie Viem / Neviem,
- história učenia,
- export stavu kartičiek,
- farba kartičky podľa predmetu.
```

Témy flashcards:

```text
Linux – príkazy, práva, procesy
CCNA – subnetting, ARP, VLAN, DHCP
Fyzika – vzorce, jednotky, odvodenia
Matematika – DR, Laplace, rady
Java – OOP, dedičnosť, výnimky
MSD – Excel, Fourier, pravdepodobnosť
VVS – ESP32, MicroPython, GPIO
```

---

## Kvízy

Kvízy slúžia na skúšanie pred testom alebo skúškou.

Aktuálne sú pripravené hlavne pre:

```text
Linux
MSD
Cisco / CCNA
```

Odporúčané budúce režimy kvízu:

```text
Cvičný režim
Skúškový režim
Režim z nesprávnych otázok
Rýchly test
Test podľa témy
Test podľa predmetu
Test s časovačom
Test bez okamžitej spätnej väzby
```

---

## Checklisty

Každý predmet môže mať vlastný checklist pred skúškou.

Checklisty:

```text
- sú rozdelené podľa tém,
- ukladajú sa do localStorage,
- zobrazujú progres,
- podporujú tlačidlo Označiť všetko,
- podporujú reset.
```

Príklad pre CCNA:

```text
- subnetting,
- VLSM,
- VLAN,
- trunk,
- DHCP,
- DNS,
- routing,
- SSH,
- port-security,
- postup keď nefunguje ping.
```

---

## Roadmapa

Roadmapa je spravená ako projektový plán.

Sekcie:

```text
Hotové
Pracuje sa
Plánované
Nápady
Nahlásené chyby
Odložené
```

Každá položka roadmapy má:

```text
Názov
Popis
Predmet
Stav
Priorita
Dátum
Typ
```

Typy položiek:

```text
obsah
dizajn
funkcia
oprava
admin
backend
```

---

## Changelog

Stránka `changelog.html` slúži na prehľad histórie zmien.

Obsahuje:

```text
- aktuálnu verziu,
- dátum aktualizácie,
- časovú os zmien,
- čo bolo pridané,
- čo bolo opravené,
- čo sa plánuje.
```

---

## Podpora

Stránka `support.html` je určená na spätnú väzbu.

Používateľ môže nahlásiť:

```text
- chybu v poznámkach,
- nefunkčný odkaz,
- zlú odpoveď v kvíze,
- návrh na nový predmet,
- návrh na vylepšenie.
```

---

## Admin

Admin panel je zatiaľ jednoduchý frontend admin.

Dôležité upozornenie:

```text
Ak je admin heslo iba vo frontende, nie je to skutočne bezpečné riešenie.
Na reálne zabezpečenie bude neskôr potrebný backend alebo služba ako Firebase/Supabase.
```

---

## Štruktúra projektu

```text
Study Hub/
├── index.html
├── subjects.html
├── flashcards.html
├── results.html
├── roadmap.html
├── changelog.html
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
│   ├── java.html
│   ├── 3d-tlac.html
│   ├── algebra.html
│   ├── praktikum.html
│   └── uvod-do-studia.html
│
├── style/
│   ├── main.css
│   ├── base.css
│   ├── variables.css
│   ├── layout.css
│   ├── header.css
│   ├── home.css
│   ├── subjects.css
│   ├── subject-detail.css
│   ├── subject-pages.css
│   ├── flashcards.css
│   ├── checklist.css
│   ├── quiz.css
│   ├── roadmap.css
│   ├── footer.css
│   ├── responsive.css
│   └── fix.css
│
├── script/
│   ├── main.js
│   ├── flashcards.js
│   ├── checklist.js
│   ├── progress.js
│   ├── subject-search.js
│   ├── filters.js
│   ├── quiz-engine.js
│   ├── quiz-linux.js
│   ├── quiz-msd.js
│   ├── quiz-ccna.js
│   ├── results.js
│   ├── admin.js
│   └── ccna-tools.js
│
├── data/
│   ├── subjects.json
│   ├── materials.json
│   ├── quizzes.json
│   ├── flashcards.json
│   ├── roadmap.json
│   └── changelog.json
│
└── README.md
```

---

## Lokálne spustenie

Najjednoduchšie cez VS Code:

```text
1. Otvor projekt vo VS Code.
2. Spusti Live Server.
3. Otvor index.html.
```

Alternatíva cez Python:

```bash
python -m http.server 5500
```

Potom otvor:

```text
http://localhost:5500
```

---

## GitHub Pages

Odporúčané nastavenie:

```text
Settings
Pages
Branch: main
Folder: /root
```

Bežný upload:

```bash
git add .
git commit -m "Update Study Hub"
git push
```

Po nahratí odporúčam v prehliadači stlačiť:

```text
Ctrl + F5
```

---

## Kontrola po nahratí

Skontrolovať:

```text
1. index.html
2. subjects.html
3. flashcards.html
4. roadmap.html
5. changelog.html
6. support.html
7. admin.html
8. predmetové stránky
9. kvízy
10. checklisty
11. mobilné zobrazenie
12. odkazy na PDF a súbory
```

---

## Fázy ďalšieho vývoja

### Fáza 1 – Stabilizácia

```text
- opraviť nefunkčné odkazy,
- doplniť chýbajúce PDF a súbory,
- odstrániť staré testovacie súbory,
- zjednotiť CSS a JS verzie,
- skontrolovať mobilné zobrazenie,
- vyčistiť duplicitné navigačné odkazy.
```

### Fáza 2 – Obsah predmetov

```text
- doplniť Matematiku,
- doplniť Fyziku,
- doplniť CCNA,
- doplniť MSD,
- doplniť Linux,
- doplniť VVS a Java projekty.
```

### Fáza 3 – Učenie a testovanie

```text
- vylepšiť kvízové režimy,
- pridať skúškový režim s časovačom,
- pridať test z nesprávnych otázok,
- rozšíriť flashcards,
- pridať históriu učenia,
- pridať výsledkové grafy.
```

### Fáza 4 – Prehľad materiálov

```text
- pridať files.html,
- pridať quizzes.html,
- pridať search.html,
- pridať globálne vyhľadávanie,
- pridať filtrovanie materiálov podľa typu.
```

### Fáza 5 – Admin a backend

```text
- admin editor obsahu,
- Firebase alebo Supabase,
- databáza podpory,
- prihlasovanie,
- synchronizácia progresu medzi zariadeniami.
```

### Fáza 6 – Finálne vylepšenia

```text
- PWA offline režim,
- print verzia poznámok,
- SEO meta tagy,
- lepšie ikonky predmetov,
- analytics,
- optimalizácia výkonu.
```

---

## Známe veci na kontrolu

```text
- niektoré PDF odkazy smerujú na files/, ale súbory ešte nemusia byť nahraté,
- admin panel je iba frontendovo chránený,
- časť obsahu je stále rozpracovaná,
- niektoré staršie pomocné súbory by sa mali presunúť do archive/ alebo odstrániť,
- JSON dáta a HTML obsah ešte nie sú úplne prepojené do jedného dátového systému.
```

---

## Upozornenie

Táto stránka je neoficiálna študentská pomôcka.

Materiály slúžia iba na vzdelávacie účely.

Autor nezodpovedá za prípadné chyby v poznámkach.

Oficiálne informácie si vždy overte v Moodle alebo u vyučujúceho.
