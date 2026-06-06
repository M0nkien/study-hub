# Study Hub – finálna verzia

Názov webu: **Study Hub**  
Autor: **vytvorené MG**

## Čo je upravené

- web je premenovaný na Study Hub,
- všetky hlavné texty v hlavičke a pätičke sú upravené na Study Hub,
- MSD zadania Z1 až Z10 sú znovu rozšírené s detailným textom, cieľom, postupom a vzorcami,
- v MSD pribudla veľká sekcia vzorcov a typických výpočtov,
- Admin panel má heslo,
- Linux už nemá sekciu rýchly ťahák príkazov,
- CCNA/Cisco má rozsiahlu sekciu príkazov pre Packet Tracer,
- ostal progres učenia, vyhľadávanie, filtrovanie materiálov, mobilné menu a kvízy.

<<<<<<< HEAD
=======

>>>>>>> c1fcb34 (UPDATE)
Pozor: pri čisto statickom HTML/JS webe je toto iba jednoduchá ochrana proti bežnému kliknutiu.
Skutočné bezpečné prihlásenie treba riešiť cez Firebase Auth alebo server.

## Spustenie
Otvor: 
```text
index.html
```

## Dôležité súbory
- `index.html` – hlavná stránka
- `style.css` – celý dizajn
- `script.js` – mobilné menu a vyhľadávanie predmetov
- `progress.js` – progres učenia
- `subject-search.js` – vyhľadávanie v predmete
- `filters.js` – filtrovanie materiálov
- `quiz-engine.js` – kvíz engine
- `quiz-linux.js` – Linux otázky
- `quiz-msd.js` – MSD otázky
- `admin.html` + `admin.js` – admin panel


## Nové úpravy v tejto verzii

- Pridaný predmet Fyzika.
- Pridaná sekcia Podpora stránky na hlavnej stránke.
- Najnovšie pridané už nie sú karty v štýle Fricapsule, ale vlastný výpis/timeline.
- Zachovaná modrá farba #65d4f2.
- Podstránky majú lepšie rozlíšenie tlačidiel:
  - teória, poznámky, vzorce, príkazy = „Označiť ako naučené“
  - laboratóriá, zadania, Packet Tracer = „Označiť ako urobené“
  - materiály, súbory, kvízy = „Označiť ako prejdené“
- Linux nemá samostatnú sekciu rýchly ťahák príkazov.
- CCNA obsahuje rozšírený Packet Tracer blok príkazov.


## Úpravy podpory a navigácie

- Vyhľadávacie políčko predmetov na hlavnej stránke bolo odstránené.
- Najnovšie pridané je znova ako menšie stručné kartičky.
- Podpora je samostatná stránka `support.html`.
- Formulár podpory ukladá správy do localStorage.
- Admin panel zobrazuje správy podpory a umožňuje ich označiť ako vyriešené alebo vymazať.
- Z predmetových podstránok boli z horného menu odstránené odkazy Najnovšie a O stránke.


## Google Forms podpora

Stránka `support.html` používa Google Forms iframe.

Použitý verejný formulár:
https://forms.gle/XXvit7yXqpsz2YBc9

Použitý embed link:
https://docs.google.com/forms/d/e/1FAIpQLScrvDRVJINJSkI-mFzTpiIdMFDTSh80YAUfRXAlotjPTv-H5w/viewform?embedded=true

Odpovede sa zobrazujú v Google Forms / Google Sheets, nie v localStorage.


## Predmety na samostatnej podstránke

Zoznam predmetov je presunutý z hlavnej stránky do súboru:

`subjects.html`

Hlavná stránka `index.html` už neobsahuje veľký zoznam predmetov, iba krátku sekciu s tlačidlom „Otvoriť predmety“.
