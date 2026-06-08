# README PATCH – Study Hub

## Názov patchu

Oprava farebnosti stavov na predmetových stránkach, návrat pozadí predmetov, prepracovaná roadmapa, farebné flashcards podľa predmetu a nový GitHub README.

## Dôvod úpravy

Používateľ nahlásil:

```text
- v predmetoch nevidno poriadne stav rozpracované / dopĺňa sa / hotové,
- chýba farebnosť stavov,
- roadmapa má byť inak rozdelená a lepšie rozložená,
- flashcards majú mať farbu podľa aktuálne zvoleného predmetu,
- má byť pridaný README súbor na GitHub s podrobným popisom stránky,
- pozadia jednotlivých predmetových podstránok sa majú vrátiť naspäť ako predtým.
```

## Súbory v tomto patchi

```text
README.md
README-PATCH.md
README-NEW-STRUCTURE.md
roadmap.html
style/fix.css
style/subject-pages.css
script/flashcards.js
```

## Čo bolo pridané

### 1. GitHub README

Pridaný nový súbor:

```text
README.md
```

Obsahuje podrobný popis:

```text
- čo je Study Hub,
- čo stránka obsahuje,
- zoznam predmetov,
- čo obsahuje predmetová stránka,
- kvízy,
- flashcards,
- roadmapu,
- podporu,
- admin časť,
- štruktúru súborov,
- ako stránku spustiť lokálne,
- ako ju používať cez GitHub Pages,
- upozornenie, že stránka je neoficiálna študentská pomôcka.
```

### 2. `style/fix.css`

Pridaný alebo doplnený opravný CSS súbor:

```text
style/fix.css
```

Tento súbor sa načítava ako posledný a opravuje:

```text
- pozadia predmetových stránok,
- farebnosť stavov,
- viditeľnosť tagov,
- farebnosť flashcards,
- nový layout roadmapy.
```

### 3. `style/subject-pages.css`

Pridaný súbor:

```text
style/subject-pages.css
```

Dôvod:

```text
HTML stránky už na tento súbor odkazovali, ale súbor chýbal.
```

Tento súbor teraz existuje a obsahuje doplnkové štýly pre predmetové podstránky.

## Čo bolo upravené

### 1. Predmetové podstránky

Pozadia predmetových stránok boli vrátené späť do výraznejšieho štýlu.

Hero sekcia predmetu má znova:

```text
- farebný gradient podľa predmetu,
- jemné tvary v pozadí,
- farebný panel tagov,
- stav predmetu vo farbe podľa stavu.
```

### 2. Stavy predmetov

Stavy sú teraz lepšie viditeľné:

```text
Hotové – modrá
Dopĺňa sa – žltá
Rozpracované – fialová
```

Týka sa hlavne panelu na predmetovej stránke, kde je napríklad:

```text
MATEMATIKA
ROZPRACOVANÉ
```

### 3. Flashcards

Súbor:

```text
script/flashcards.js
```

bol upravený tak, aby pri výbere predmetu nastavil CSS premennú:

```text
--flashcard-accent
```

Každý predmet má inú farbu kartičiek:

```text
Linux – svetlomodrá
MSD – tyrkysová
CCNA – modrá
Fyzika – oranžová
Matematika – fialová
VVS – zelená
Java – oranžová
3D tlač – ružová
Algebra – fialová
Praktikum – žltá
Úvod do štúdia – tyrkysová
```

### 4. Roadmapa

Súbor:

```text
roadmap.html
```

bol prepracovaný.

Roadmapa je teraz rozdelená do prehľadných častí:

```text
Hotové
Pracuje sa
Plánované
Nápady
Kontrola
```

Pridaný bol aj horný prehľad so štatistikami.

## Ako nahrať patch

Rozbaľ ZIP do koreňa projektu Study Hub a nahraď existujúce súbory.

Potom použi:

```bash
git add README.md README-PATCH.md README-NEW-STRUCTURE.md roadmap.html style/fix.css style/subject-pages.css script/flashcards.js
git commit -m "Improve subject visuals roadmap flashcards and add README"
git push
```

## Čo skontrolovať po nahratí

Skontroluj:

```text
1. Otvor subjects/mat.html.
2. Panel musí ukazovať MATEMATIKA a ROZPRACOVANÉ farebne.
3. Pozadie predmetovej stránky má mať znova farebný gradient a jemné tvary.
4. Otvor subjects/linux.html.
5. Stav HOTOVÉ má byť viditeľný.
6. Otvor subjects/msd.html alebo subjects/ccna.html.
7. Stav DOPĹŇA SA má byť žltý.
8. Otvor flashcards.html.
9. Prepni predmet na Matematiku, Fyziku, Java, CCNA.
10. Kartička má zmeniť farbu podľa predmetu.
11. Otvor roadmap.html.
12. Roadmapa má byť rozdelená na Hotové / Pracuje sa / Plánované / Nápady / Kontrola.
13. Na GitHube má byť viditeľný README.md.
```

## Poznámka

Tento patch nemení obsah učiva ani otázky kvízov.  
Mení hlavne vzhľad predmetových stránok, roadmapy, flashcards a dokumentáciu projektu.
