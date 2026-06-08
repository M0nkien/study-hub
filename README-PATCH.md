# README PATCH – Study Hub

## Názov patchu

Zarovnanie horného panelu predmetu s progress panelom a ostatnými obsahovými sekciami.

## Dôvod úpravy

Používateľ nahlásil, že horný panel predmetu s tagmi a stavom nie je zarovnaný s ostatnými časťami predmetovej stránky.

Na screenshote bolo vidno, že panel:

```text
MSD
DOPĹŇA SA
EXCEL
ČASOVÉ RADY
FOURIER
PRAVDEPODOBNOSŤ
ZADANIA
GRAFY
```

začínal viac vľavo ako karta:

```text
Progres učenia predmetu
```

## Príčina

Predmetová stránka má hlavný obsah v pravom stĺpci vedľa bočného menu:

```text
[ bočné menu ] [ hlavný obsah predmetu ]
```

Progress panel a ostatné sekcie sú v hlavnom obsahovom stĺpci.

Horný panel s tagmi bol však centrovaný podľa celej šírky kontajnera, nie podľa hlavného obsahového stĺpca. Preto nebol zarovnaný.

## Súbory v tomto patchi

```text
style/fix.css
style/subject-pages.css
style/subject-alignment.css
style/main.css
README-PATCH.md
README-NEW-STRUCTURE.md
```

Poznámka: `style/main.css` je v patchi iba vtedy, ak bol dostupný v aktuálnej štruktúre projektu.

## Čo bolo upravené

### 1. Zjednotený layout predmetovej stránky

Do CSS boli pridané premenné:

```css
--subject-sidebar-width: 260px;
--subject-layout-gap: 28px;
```

Tie určujú šírku bočného menu a medzeru medzi bočným menu a hlavným obsahom.

### 2. Horný panel tagov je zarovnaný s hlavným obsahom

Na desktopovej šírke sa horný panel v hero časti posunie do rovnakej osi ako progress panel a ostatné sekcie.

Použité pravidlo:

```css
.page-subject-detail .subject-hero-content .subject-page-tags {
    width: calc(100% - var(--subject-sidebar-width) - var(--subject-layout-gap));
    margin-left: calc(var(--subject-sidebar-width) + var(--subject-layout-gap));
}
```

### 3. Mobilné zobrazenie ostáva jednoduché

Na menších obrazovkách sa layout vráti na jeden stĺpec:

```css
@media (max-width: 980px) {
    .page-subject-detail .subject-layout {
        grid-template-columns: 1fr;
    }
}
```

### 4. Pridaný samostatný CSS modul

Pridaný bol nový súbor:

```text
style/subject-alignment.css
```

Tento súbor slúži iba na zarovnanie panelov na predmetových stránkach.

## Čo sa nemenilo

Tento patch nemení:

```text
- HTML predmetov,
- obsah predmetov,
- kvízy,
- checklisty,
- flashcards,
- roadmapu,
- hlavnú stránku.
```

Mení sa iba CSS zarovnanie panelov na predmetových stránkach.

## Ako nahrať patch

Rozbaľ ZIP do koreňa projektu Study Hub a nahraď existujúce súbory.

Potom použi:

```bash
git add style/fix.css style/subject-pages.css style/subject-alignment.css style/main.css README-PATCH.md README-NEW-STRUCTURE.md
git commit -m "Align subject header panel with content column"
git push
```

Ak Git vypíše, že `style/main.css` neexistuje, použi príkaz bez neho:

```bash
git add style/fix.css style/subject-pages.css style/subject-alignment.css README-PATCH.md README-NEW-STRUCTURE.md
git commit -m "Align subject header panel with content column"
git push
```

## Čo skontrolovať po nahratí

```text
1. Otvor subjects/msd.html.
2. Skontroluj horný panel s tagmi MSD.
3. Skontroluj progress panel pod ním.
4. Ľavá hrana horného panelu má byť zarovno s progress panelom.
5. Otvor subjects/vvs.html.
6. Skontroluj rovnaké zarovnanie.
7. Otvor subjects/mat.html.
8. Skontroluj rovnaké zarovnanie.
9. Skontroluj mobilné zobrazenie.
10. Na GitHub Pages použi Ctrl + F5.
```
