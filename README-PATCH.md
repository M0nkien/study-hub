# README PATCH – Study Hub

## Názov patchu

Admin – viditeľnosť predmetov na stránke `subjects.html`.

## Čo patch pridáva

V admin paneli pribudla nová karta:

```text
Viditeľnosť predmetov na stránke Predmety
```

V nej si vieš zaškrtnúť, ktoré predmety sa majú zobrazovať na podstránke `subjects.html`.

Zaškrtnuté predmety sa zobrazia. Nezaškrtnuté predmety sa na stránke Predmety skryjú.

## Súbory v patchi

```text
admin.html
subjects.html
script/admin.js
script/subject-visibility.js
style/fix.css
README-PATCH.md
README-NEW-STRUCTURE.md
```

## Ako to funguje

Nastavenie sa ukladá do `localStorage` pod kľúčom:

```text
studyHubVisibleSubjects
```

Admin panel uloží zoznam povolených predmetov, napríklad:

```json
[
  "linux",
  "fyzika",
  "ccna"
]
```

Na stránke `subjects.html` sa potom zobrazia iba predmety, ktorých karta má rovnaké `data-subject-id`.

Príklad:

```html
<a class="subject-card" data-subject-id="fyzika">
```

Ak `fyzika` je uložená v zozname, karta sa zobrazí. Ak nie je, karta sa skryje.

## Dôležitá poznámka

Toto je statická HTML/JS stránka, preto sa nastavenie ukladá v konkrétnom prehliadači.

To znamená:

```text
- keď to nastavíš u seba, uvidíš to podľa svojho nastavenia,
- ak otvoríš stránku v inom prehliadači alebo na inom PC, bude tam predvolené nastavenie,
- predvolené nastavenie je: zobrazujú sa všetky predmety.
```

Na spoločné online admin nastavenie pre všetkých používateľov by bolo treba Firebase, Supabase alebo server.

## Čo bolo upravené

### `admin.html`

- opravený odkaz na admin CSS:

```html
<link rel="stylesheet" href="style/admin.css?v=20260612-admin-subject-visibility">
```

- opravený odkaz na admin JS:

```html
<script src="script/admin.js?v=20260612-admin-subject-visibility"></script>
```

- pridaná nová admin karta pre výber viditeľných predmetov.

### `subjects.html`

- pridané načítanie skriptu:

```html
<script src="script/subject-visibility.js?v=20260612-admin-subject-visibility"></script>
```

### `script/admin.js`

- pridaný zoznam predmetov,
- pridané checkboxy,
- pridané tlačidlá:

```text
Zobraziť všetky
Skryť všetky
Reset nastavenia
Uložiť viditeľnosť predmetov
```

### `script/subject-visibility.js`

- číta uložené nastavenie z `localStorage`,
- skryje nepovolené predmetové karty,
- spolupracuje s vyhľadávaním a filtrom predmetov,
- upraví počítadlo zobrazených predmetov.

### `style/fix.css`

- doplnený vzhľad pre admin nastavenie predmetov,
- doplnená trieda:

```css
.subject-admin-hidden
```

## Ako nahrať patch

Rozbaľ ZIP do koreňa projektu Study Hub a nahraď existujúce súbory.

Potom použi:

```bash
git add admin.html subjects.html script/admin.js script/subject-visibility.js style/fix.css README-PATCH.md README-NEW-STRUCTURE.md
git commit -m "Add admin subject visibility settings"
git push
```

## Ako to otestovať

```text
1. Otvor admin.html.
2. Prihlás sa heslom.
3. Nájdi kartu Viditeľnosť predmetov na stránke Predmety.
4. Odškrtni napríklad 3D tlač, Algebra a Praktikum.
5. Klikni Uložiť viditeľnosť predmetov.
6. Otvor subjects.html.
7. Skontroluj, že odškrtnuté predmety sa nezobrazujú.
8. Vráť sa do admina a klikni Reset nastavenia.
9. Otvor subjects.html a skontroluj, že sa znova zobrazujú všetky predmety.
10. Po nahratí na GitHub Pages daj Ctrl + F5.
```
