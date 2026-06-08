# README PATCH – Study Hub

## Názov patchu

Oprava rozbitého vzhľadu po nahratí na GitHub Pages.

## Dôvod úpravy

Po nahratí na GitHub sa stránka zobrazila rozbitá:

```text
- vyhľadávač predmetov bol v základnom HTML štýle,
- tlačidlá vyzerali ako obyčajné systémové buttony,
- pätička sa nerozložila do pekného gridu,
- texty boli príliš malé a natlačené,
- počítadlo predmetov ukazovalo 0,
- niektoré novšie štýly sa pravdepodobne nenačítali alebo boli prebité staršou verziou CSS.
```

Tento patch pridáva samostatný opravný CSS a JS súbor, ktorý sa načíta až úplne na konci stránky.

## Súbory v tomto patchi

```text
assets/css/studyhub-fix.css
assets/js/studyhub-fix.js
assets/js/main.js
index.html
subjects.html
flashcards.html
results.html
roadmap.html
support.html
admin.html
subjects/linux.html
subjects/msd.html
subjects/ccna.html
subjects/fyzika.html
subjects/mat.html
subjects/vvs.html
subjects/java.html
subjects/3d-tlac.html
subjects/algebra.html
subjects/praktikum.html
subjects/uvod-do-studia.html
README-PATCH.md
README-NEW-STRUCTURE.md
```

## Čo bolo pridané

### 1. Nový opravný CSS súbor

Pridaný súbor:

```text
assets/css/studyhub-fix.css
```

Tento súbor sa načítava ako posledný a opravuje rozbité časti stránky.

Opravuje:

```text
- header,
- container,
- tlačidlá,
- hlavnú stránku,
- predmetové karty,
- vyhľadávač predmetov,
- legendu stavov,
- pätičku,
- responzívne zobrazenie.
```

### 2. Nový opravný JS súbor

Pridaný súbor:

```text
assets/js/studyhub-fix.js
```

Tento súbor opravuje funkčnosť vyhľadávača predmetov aj vtedy, ak by starý `main.js` zlyhal.

Opravuje:

```text
- filtrovanie predmetov podľa textu,
- filtrovanie predmetov podľa stavu,
- reset vyhľadávania,
- počítadlo zobrazených predmetov,
- odstránenie duplicitných stavových tagov na kartách.
```

### 3. Cache-busting

Do HTML súborov sa pridali odkazy:

```html
<link rel="stylesheet" href="assets/css/studyhub-fix.css?v=20260608">
<script src="assets/js/studyhub-fix.js?v=20260608"></script>
```

Na predmetových stránkach sú cesty relatívne:

```html
<link rel="stylesheet" href="../assets/css/studyhub-fix.css?v=20260608">
<script src="../assets/js/studyhub-fix.js?v=20260608"></script>
```

Parameter `?v=20260608` pomáha obísť cache prehliadača a GitHub Pages.

## Čo bolo upravené

### 1. HTML súbory

Do všetkých hlavných stránok a predmetových stránok boli pridané nové CSS/JS odkazy.

Upravené boli:

```text
index.html
subjects.html
flashcards.html
results.html
roadmap.html
support.html
admin.html
subjects/linux.html
subjects/msd.html
subjects/ccna.html
subjects/fyzika.html
subjects/mat.html
subjects/vvs.html
subjects/java.html
subjects/3d-tlac.html
subjects/algebra.html
subjects/praktikum.html
subjects/uvod-do-studia.html
```

### 2. main.js

V súbore:

```text
assets/js/main.js
```

bola opätovne opravená možná chýbajúca čiarka v objekte stavov predmetov.

## Ako nahrať patch

Rozbaľ ZIP do koreňa projektu Study Hub a nahraď existujúce súbory.

Potom použi:

```bash
git add assets/css/studyhub-fix.css assets/js/studyhub-fix.js assets/js/main.js index.html subjects.html flashcards.html results.html roadmap.html support.html admin.html subjects/linux.html subjects/msd.html subjects/ccna.html subjects/fyzika.html subjects/mat.html subjects/vvs.html subjects/java.html subjects/3d-tlac.html subjects/algebra.html subjects/praktikum.html subjects/uvod-do-studia.html README-PATCH.md README-NEW-STRUCTURE.md
git commit -m "Repair GitHub Pages layout and subject search"
git push
```

## Čo skontrolovať po nahratí

Po nahratí na GitHub Pages skontroluj:

```text
1. Otvor hlavnú stránku.
2. Header má byť pekne zarovnaný.
3. Hlavný nadpis má byť veľký a centrovaný.
4. Pätička má byť v peknom grid rozložení.
5. Otvor subjects.html.
6. Vyhľadávač predmetov má mať vlastný dizajn, nie obyčajné HTML štýly.
7. Počet zobrazených predmetov nemá byť stále 0.
8. Skús vyhľadať: matematika, fyzika, java, arp, excel.
9. Karty sa majú filtrovať.
10. Predmetové karty majú mať normálnu veľkosť a tagy.
11. Skontroluj aj mobilné zobrazenie.
```

## Dôležitá poznámka

Po nahratí na GitHub Pages môže prehliadač držať staré CSS v cache.

Ak sa vzhľad neobnoví hneď, urob:

```text
Ctrl + F5
```

alebo otvor stránku v anonymnom okne.

Tento patch používa nové súbory s `?v=20260608`, takže by sa mal načítať čerstvý CSS/JS.
