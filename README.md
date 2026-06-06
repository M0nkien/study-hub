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

## Admin heslo

Predvolené heslo je:
```text
studyhub2026
```

Zmeníš ho v súbore:
```text
admin.js
```

Premenná:
```js
const ADMIN_PASSWORD = "studyhub2026";
```

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
