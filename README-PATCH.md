# README PATCH – Study Hub

## Názov patchu

Fyzika – doplnené ďalšie skúškové písomky z fotiek.

## Dôvod úpravy

Používateľ poslal ďalšie fotky skúškových písomiek z fyziky a chcel ich doplniť do jednej sekcie vo fyzike.

## Súbory v tomto patchi

```text
subjects/fyzika.html
style/fix.css
style/subject-pages.css
README-PATCH.md
README-NEW-STRUCTURE.md
```

## Čo bolo upravené

V súbore `subjects/fyzika.html` bola rozšírená sekcia `Vzorová písomka`.

Pridané boli 4 varianty skúškových písomiek:

```text
Variant 1 – gravitácia, kružnica, ťažisko, šikmý vrh, koleso
Variant 2 – gravitácia, kružnica, tlmené kmity, ťažisko, pohyb po kružnici
Variant 3 – gravitácia, kružnica, ťažisko, I. kozmická rýchlosť, koleso
Variant 4 – gravitácia, trenie a naklonená rovina, ťažisko, impulzová veta, brzdenie vozidla
```

Úlohy sú farebne rozlíšené:

```text
červená = odvodenie
žltá = výpočtový príklad
modrá = teoretická otázka
```

Doplnený bol aj prehľad najčastejšie sa opakujúcich tém:

```text
Keplerove zákony
gravitačný zákon
I. a II. kozmická rýchlosť
pohyb po kružnici
tangenciálne a normálové zrýchlenie
ťažisko
moment zotrvačnosti
šikmý vrh
tlmené kmity
trenie
naklonená rovina
impulzová veta
brzdenie
```

## CSS úpravy

Do `style/fix.css` a `style/subject-pages.css` boli doplnené štýly pre:

```text
- bloky skúškových variantov,
- nadpis variantu,
- prehľad najčastejších tém.
```

## Čo sa nemenilo

Tento patch nemení:

```text
- hlavnú stránku,
- ostatné predmety,
- kvízy,
- flashcards,
- roadmapu,
- admin panel.
```

## Ako nahrať patch

```bash
git add subjects/fyzika.html style/fix.css style/subject-pages.css README-PATCH.md README-NEW-STRUCTURE.md
git commit -m "Add more physics exam variants"
git push
```

## Čo skontrolovať

```text
1. Otvor subjects/fyzika.html.
2. Choď do sekcie Vzorová písomka.
3. Skontroluj, že sú tam Variant 1 až Variant 4.
4. Skontroluj farebnú legendu.
5. Skontroluj, že odvodenia sú červené, príklady žlté a teória modrá.
6. Po nahratí na GitHub Pages daj Ctrl + F5.
```
