# StudyHub v2.1.1 – patch 29. 9. 2026

Tento patch nadväzuje na **StudyHub v2 Dark Dashboard + Simple Sidebar**.
Obsahuje iba súbory, ktoré treba nahrať/aktualizovať pre verziu **v2.1.1**.

## Čo je nové

### 1. Study streak
- StudyHub si automaticky zapamätá deň, keď web používaš.
- Počíta aktuálnu sériu po sebe idúcich dní.
- Počíta aj najlepší dosiahnutý streak.
- Na domovskom dashboarde je 28-dňový prehľad aktivity.
- Zachovaná je kompatibilita so starým kľúčom `studyHubStreak` v localStorage.

### 2. Opravené statusy predmetov a filter
Na `subjects.html` sú teraz tri jasné stavy:
- **Hotové**
- **Rozpracované**
- **Pripravované**

Filter už používa priamo `data-status` na kartách a funguje spolu s textovým vyhľadávaním aj s viditeľnosťou predmetov z admin panelu.

Aktuálne rozdelenie:
- Hotové: Linux, Fyzika
- Rozpracované: VVS, MSD, Matematika, CCNA, Java
- Pripravované: 3D tlač, Algebra, Praktikum z programovania, Úvod do štúdia

### 3. Globálne vyhľadávanie
Vyhľadávanie v hornom paneli teraz zobrazuje výsledky okamžite počas písania.

Index obsahuje:
- predmety,
- témy,
- poznámky,
- zadania,
- kvízy,
- PDF odkazy,
- flashcards.

Výsledky sú rozdelené podľa typu a zobrazujú sa v rozbaľovacom paneli pod search barom. Search index je generovaný do `script/search-index.js` a momentálne obsahuje stovky položiek z predmetových stránok.

Lokálne materiály a otázky pridané cez Admin editor sa do vyhľadávania pridávajú dynamicky z localStorage.

### 4. Roadmapa – Kanban
Roadmapa je zjednodušená na štyri hlavné stĺpce:
1. Nápady
2. Plánované
3. Pracuje sa
4. Hotové

Každá karta obsahuje:
- predmet/oblasť,
- prioritu,
- dátum/verziu,
- typ úpravy.

Na mobile sa Kanban zobrazí v jednom stĺpci.

### 5. Changelog – timeline
Changelog bol prerobený na modernú vertikálnu timeline.

Verzia `v2.1.1` má samostatné sekcie:
- Nové
- Upravené
- Opravené

### 6. Mobilná verzia
Na mobile zostáva hamburger pre celý sidebar a pribudla spodná navigácia:
- Domov
- Predmety
- Flashcards
- Výsledky

Roadmapa, Podpora a ostatné položky zostávajú dostupné cez hamburger sidebar.

### 7. Status stránky v sidebare
Sidebar zobrazuje:
- **Verzia stránky: v2.1.1**
- **Posledná aktualizácia: 29. 9. 2026**
- zelený stav **Všetko funguje správne**

### 8. Opravený Admin editor
`script/admin.js` je v patchi nanovo vytvorený.

Funguje:
- prihlásenie,
- pridanie materiálu,
- pridanie kvízovej otázky,
- kontrola správnej odpovede cez `*`,
- úprava uloženého materiálu,
- úprava otázky,
- vymazanie položky,
- zoznam uloženého obsahu,
- export JSON,
- vymazanie lokálnych admin dát,
- nastavenie viditeľnosti predmetov,
- Admin náhľad aj skrytých predmetov.

**Predvolené heslo:** `studyhub`

Heslo je iba lokálna ochrana statického webu. Nie je to serverové prihlasovanie. Predvolené heslo môžeš zmeniť v `script/admin.js` alebo cez localStorage kľúč `studyHubAdminPassword`.

Materiály a otázky pridané cez editor sa ukladajú do localStorage a na príslušnej predmetovej stránke sa zobrazia v sekcii **Pridané cez Admin editor**.

## Nové súbory
- `script/v21.js`
- `script/search-index.js`
- `script/admin.js`
- `script/subject-visibility.js`
- `README-V2.1.0.md`

## Upravené hlavné súbory
- `index.html`
- `subjects.html`
- `roadmap.html`
- `changelog.html`
- `admin.html`
- `flashcards.html`
- `results.html`
- `support.html`
- všetky HTML súbory v `subjects/`
- `style/v2.css`
- `script/v2.js`

Predmetové HTML súbory boli aktualizované najmä kvôli načítaniu nového globálneho search indexu a `v21.js`.

## Postup nahratia
1. Rozbaľ ZIP.
2. Otvor priečinok `studyhub/`.
3. Skopíruj jeho obsah do koreňového priečinka svojho StudyHub projektu.
4. Pri otázke na prepísanie súborov potvrď **Replace / Prepísať**.
5. Nahraj zmenené súbory na GitHub.
6. Po otvorení GitHub Pages sprav tvrdý refresh: `Ctrl + F5`.

## Ukladanie dát
Nasledujúce funkcie používajú localStorage prehliadača:
- study streak,
- admin materiály,
- admin otázky,
- viditeľnosť predmetov,
- existujúci progres a výsledky.

To znamená, že údaje sú zatiaľ viazané na konkrétny prehliadač/zariadenie.

## Technická kontrola patchu
Pred zabalením patchu bolo skontrolované:
- syntax `v2.js`,
- syntax `v21.js`,
- syntax `admin.js`,
- syntax `subject-visibility.js`,
- syntax `search-index.js`,
- parsovanie `v2.css`,
- načítanie nových enhancement scriptov vo všetkých 19 HTML stránkach,
- existencia všetkých 3 status filtrov,
- 4 Kanban stĺpce roadmapy.
