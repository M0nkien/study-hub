# README PATCH – Study Hub

## Názov patchu

Admin – zobrazenie skrytých predmetov cez admin náhľad.

## Dôvod úpravy

Používateľ chcel, aby predmety, ktoré sú skryté na stránke `subjects.html`, vedel stále vidieť cez admina.

Predtým:

```text
- admin vedel nastaviť, ktoré predmety sa zobrazia,
- skryté predmety sa na subjects.html úplne schovali,
- nebol samostatný admin náhľad, kde by bolo vidieť aj skryté predmety.
```

Teraz:

```text
- v admin paneli je tlačidlo „Admin náhľad – aj skryté“,
- otvorí subjects.html?adminView=1,
- v tomto režime sa zobrazia všetky predmety,
- predmety skryté v bežnom zobrazení majú štítok „Skryté v admine“,
- v admine je aj prehľad, ktoré predmety sú aktuálne skryté.
```

## Súbory v patchi

```text
admin.html
script/admin.js
script/subject-visibility.js
style/fix.css
README-PATCH.md
README-NEW-STRUCTURE.md
```

## Čo sa zmenilo

### `admin.html`

Do sekcie viditeľnosti predmetov bolo pridané tlačidlo:

```html
<a class="btn secondary admin-preview-link" href="subjects.html?adminView=1">Admin náhľad – aj skryté</a>
```

Pridaný bol aj blok:

```html
<div id="hiddenSubjectsPreview" class="admin-hidden-subjects-preview" aria-live="polite"></div>
```

Ten ukazuje, ktoré predmety sú aktuálne skryté.

### `script/admin.js`

Upravené bolo renderovanie checkboxov predmetov:

```text
- každý predmet má stav „viditeľný“ alebo „skrytý“,
- skryté predmety sú farebne označené,
- zoznam skrytých predmetov sa aktualizuje pri každej zmene checkboxu.
```

### `script/subject-visibility.js`

Pridaný bol admin náhľad:

```text
subjects.html?adminView=1
```

V tomto režime:

```text
- sa neskryjú žiadne predmety,
- skryté predmety sa iba označia triedou subject-admin-preview-hidden,
- do karty sa pridá štítok „Skryté v admine“,
- hore sa zobrazí upozornenie, že ide o admin náhľad.
```

V bežnom režime `subjects.html` sa správanie nemení:

```text
- skryté predmety sa nezobrazujú.
```

### `style/fix.css`

Pridané štýly pre:

```text
- stav viditeľný/skrytý v admine,
- zoznam skrytých predmetov,
- admin náhľad na stránke Predmety,
- štítok „Skryté v admine“.
```

## Ako nahrať patch

Rozbaľ ZIP do koreňa projektu Study Hub a nahraď existujúce súbory.

Potom použi:

```bash
git add admin.html script/admin.js script/subject-visibility.js style/fix.css README-PATCH.md README-NEW-STRUCTURE.md
git commit -m "Add admin preview for hidden subjects"
git push
```

## Ako používať

```text
1. Otvor admin.html.
2. Nastav, ktoré predmety sú viditeľné.
3. Klikni na „Uložiť viditeľnosť predmetov“.
4. Klikni na „Admin náhľad – aj skryté“.
5. Otvorí sa subjects.html?adminView=1.
6. Uvidíš aj skryté predmety označené štítkom „Skryté v admine“.
7. Bežná stránka subjects.html bude stále ukazovať iba povolené predmety.
```

## Dôležité upozornenie

Toto je statický web na GitHub Pages. Admin náhľad nie je reálne bezpečnostné skrytie pred návštevníkmi. Je to hlavne praktický náhľad pre teba, aby si vedel skontrolovať aj predmety, ktoré máš skryté vo vlastnom nastavení.
