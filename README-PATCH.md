# README PATCH – Study Hub

## Patch

Fyzika – doplnenie sekcie **Príklady na precvičenie z cvík**.

## Zdroj

Príklady boli spracované z používateľom nahraného súboru:

```text
FYZ_P.pdf
```

## Zmenené/pridané súbory

```text
subjects/fyzika.html
style/fix.css
README-PATCH.md
README-NEW-STRUCTURE.md
```

## Čo bolo pridané

Do `subjects/fyzika.html` bola pridaná nová sekcia:

```text
<section id="practice-exercises" class="content-block">
```

Sekcia je vložená za časť `Vzorové príklady` a pred `Obrázky z podkladov`.

Do bočného menu bol pridaný odkaz:

```text
Príklady z cvík
```

## Pridané príklady

```text
C1  Priemerná rýchlosť cyklistu tam a späť
C2  Auto: rozbeh, rovnomerný pohyb a brzdenie
C3  Spomalenie auta z 90 km/h na 72 km/h
C4  Rýchlosť z tachografu v(t) = -t² + 2t + 10
C5  Rozbeh so zrýchlením klesajúcim lineárne na nulu
C6  Teplovzdušný balón a vrecko s pieskom
C7  Vypustenie nákladu z lietadla
C8  Delová guľa vystrelená pod uhlom 55°
C9  Voľný pád – rozdelenie výšky na rovnaké časové úseky
C10 Koleso 600 ot/min sa zastaví po 500 otáčkach
C11 Koleso s frekvenciou 25 s⁻¹ zabrzdí za 30 s
C12 Tangenciálne, normálové a celkové zrýchlenie po 5 s
C13 Uhol medzi celkovým zrýchlením a rýchlosťou
C14 Výsledná sila a zrýchlenie vo vektoroch
C15 Práca sily a uhol medzi silou a posunutím
C16 Ťažisko troch hmotných bodov
C17 Naklonená rovina s trením a premena energie na teplo
C18 Geostacionárna družica nad rovníkom
```

## Ako sú príklady spravené

Každý príklad je samostatný otvárací blok:

```html
<details class="physics-solved-example practice-example">
```

Každý blok obsahuje:

```text
- zadanie,
- známe a hľadáme,
- riešenie,
- výsledok.
```

## CSS

Do `style/fix.css` boli pridané iba malé doplnkové štýly pre sekciu:

```text
#practice-exercises
.practice-example
.practice-exercises-list
```

Základné štýly sa používajú rovnaké ako pri existujúcich riešených príkladoch.

## Dôležité upozornenie

Ak si medzitým ručne upravoval `subjects/fyzika.html` (napríklad odvodenia alebo vzorové písomky), pred prepísaním súboru si porovnaj zmeny. Tento patch vychádza z poslednej verzie fyziky s riešenými príkladmi.

Bezpečný postup:

```text
1. Otvor svoj aktuálny subjects/fyzika.html.
2. Z tohto patchu si zober sekciu id="practice-exercises".
3. Vlož ju za sekciu id="wheel-example".
4. Do sidebaru pridaj odkaz href="#practice-exercises".
5. Do style/fix.css doplň CSS z tohto patchu.
```

## Upload postup

```bash
git add subjects/fyzika.html style/fix.css README-PATCH.md README-NEW-STRUCTURE.md
git commit -m "Add physics practice exercises from class"
git push
```

Po nahratí daj na stránke:

```text
Ctrl + F5
```
