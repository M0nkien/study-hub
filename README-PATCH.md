# README PATCH – Study Hub

## Názov patchu

Pridanie tlačidla „Posledné miesto“ na hlavnú stránku.

## Dôvod úpravy

Používateľ chcel pridať na hlavnú stránku tlačidlo posledného miesta, kde bol, vedľa existujúcich dvoch tlačidiel.

Hlavná stránka sa inak nemala upravovať.

## Súbory v tomto patchi

```text
index.html
script/main.js
README-PATCH.md
README-NEW-STRUCTURE.md
```

## Čo bolo upravené

### 1. index.html

Do hero sekcie hlavnej stránky bolo pridané tlačidlo:

```html
<a href="subjects.html" id="continueLearningBtn" class="btn secondary home-secondary-btn">Posledné miesto</a>
```

Tlačidlá na hlavnej stránke sú teraz:

```text
Začať študovať
Posledné miesto
Nahlásiť chybu
```

### 2. script/main.js

Bola doplnená poistka, aby tlačidlo fungovalo aj vtedy, keď neexistuje textový popis posledného miesta.

Logika:

```text
- ak je v localStorage uložené studyHubLastLocation, tlačidlo otvorí posledný predmet/miesto,
- ak uložené miesto ešte neexistuje, tlačidlo otvorí subjects.html.
```

### 3. Oprava navigácie

Ak sa v hlavnej navigácii nachádzal duplicitný odkaz:

```text
Zmeny
```

ponechal sa iba jeden.

## Čo sa nemenilo

Tento patch nemení rozloženie hlavnej stránky.

Nemení:

```text
- hero sekciu,
- texty,
- sekciu Prečo vznikol tento web?,
- footer,
- roadmapu,
- flashcards,
- predmetové stránky,
- kvízy.
```

Pridané bolo iba jedno tlačidlo a malá JS poistka.

## Ako nahrať patch

Rozbaľ ZIP do koreňa projektu Study Hub a nahraď existujúce súbory.

Potom použi:

```bash
git add index.html script/main.js README-PATCH.md README-NEW-STRUCTURE.md
git commit -m "Add last location button to homepage"
git push
```

## Čo skontrolovať po nahratí

```text
1. Otvor index.html.
2. V hero sekcii majú byť tri tlačidlá:
   - Začať študovať
   - Posledné miesto
   - Nahlásiť chybu
3. Klikni na niektorý predmet.
4. Vráť sa na hlavnú stránku.
5. Klikni na Posledné miesto.
6. Malo by ťa presmerovať na posledný uložený predmet.
7. Ak ešte nie je nič uložené, tlačidlo otvorí subjects.html.
8. Po nahratí na GitHub Pages stlač Ctrl + F5.
```
