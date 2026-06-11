# README PATCH – Study Hub

## Názov patchu

Admin – presmerovanie priamo na podstránku predmetu.

## Dôvod úpravy

Používateľ chcel, aby sa z admin panelu vedel dostať priamo na konkrétny predmet a skontrolovať, ako sa predmet upravuje alebo zobrazuje.

## Súbory v tomto patchi

```text
admin.html
script/admin.js
style/fix.css
README-PATCH.md
README-NEW-STRUCTURE.md
```

## Čo bolo pridané

V sekcii Admin → Viditeľnosť predmetov pribudli pri každom predmete dve akcie:

```text
Otvoriť predmet
Náhľad v zozname
```

### Otvoriť predmet

Presmeruje priamo na podstránku daného predmetu, napríklad:

```text
subjects/fyzika.html
subjects/linux.html
subjects/ccna.html
```

### Náhľad v zozname

Otvorí stránku predmetov v admin náhľade:

```text
subjects.html?adminView=1
```

V tomto režime sú viditeľné aj predmety, ktoré sú v bežnom zobrazení skryté.

## Zmeny v `script/admin.js`

Do zoznamu predmetov bola doplnená cesta `path`, napríklad:

```js
{ id: "fyzika", title: "Fyzika", path: "subjects/fyzika.html" }
```

Admin renderovanie predmetov bolo upravené tak, aby pri každom predmete zobrazilo aj odkazy na otvorenie predmetu.

## Zmeny v `style/fix.css`

Pridané boli štýly pre:

```text
.admin-subject-toggle-main
.admin-subject-row-actions
.admin-subject-open-link
.admin-hidden-subjects-preview a
```

## Zmeny v `admin.html`

Boli upravené cache verzie CSS/JS, aby sa nové štýly a nové admin funkcie po nahratí lepšie načítali:

```text
style/fix.css?v=20260612-admin-subject-open-links
script/admin.js?v=20260612-admin-subject-open-links
```

## Ako nahrať patch

Rozbaľ ZIP do koreňa projektu Study Hub a nahraď existujúce súbory.

Potom použi:

```bash
git add admin.html script/admin.js style/fix.css README-PATCH.md README-NEW-STRUCTURE.md
git commit -m "Add admin links to open subject pages"
git push
```

Po nahratí daj v prehliadači:

```text
Ctrl + F5
```

## Čo skontrolovať

```text
1. Otvor admin.html.
2. Prihlás sa do admin panelu.
3. Prejdi do sekcie Viditeľnosť predmetov.
4. Pri každom predmete skontroluj tlačidlo Otvoriť predmet.
5. Klikni napríklad na Fyzika.
6. Musí sa otvoriť subjects/fyzika.html.
7. Klikni na Náhľad v zozname.
8. Musí sa otvoriť subjects.html?adminView=1.
```
