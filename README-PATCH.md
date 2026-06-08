# README PATCH – Study Hub

## Názov patchu

Odstránenie duplicitného stavového tagu na kartách predmetov a doplnenie statického stavového tagu na každej predmetovej podstránke.

## Dôvod úpravy

Používateľ nahlásil dve veci:

```text
1. Na karte predmetu sa zobrazujú dva stavové tagy.
   Napríklad pri Úvod do štúdia sa zobrazilo:
   - veľký horný tag ROZPRACOVANÉ,
   - a ešte jeden menší spodný tag ROZPRACOVANÉ.

2. Na jednotlivých predmetových podstránkach sa stavový tag nemá spoliehať iba na JavaScript,
   ale má byť zapísaný priamo v HTML, aby sa vždy zobrazil.
```

## Súbory v tomto patchi

```text
assets/js/main.js
assets/css/style.css
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

## Čo bolo upravené

### 1. Na kartách predmetov ostáva iba jeden stavový tag

Na stránke `subjects.html` sa už nemá zobrazovať duplicitný horný stavový tag.

Upravené bolo správanie v:

```text
assets/js/main.js
```

Funkcia, ktorá pridáva stavový badge cez JavaScript, teraz preskočí kartu, ak už má:

```text
.subject-state-ribbon
.subject-card-with-static-tags
```

Tým sa zabráni tomu, aby sa na jednej karte zobrazili dva stavové tagy.

### 2. CSS poistka proti duplicitnému tagu

Do `assets/css/style.css` bola pridaná poistka:

```css
.subject-card-with-static-tags .subject-status {
    display: none !important;
}
```

Ak by sa starý horný status ešte niekde vygeneroval, nebude sa zobrazovať.

### 3. Stavový panel na každej predmetovej podstránke je statický

Do každej predmetovej stránky bol pridaný statický panel:

```text
subject-page-tags-static
```

To znamená, že stav predmetu a tagy sú priamo v HTML a nezávisia iba od JavaScriptu.

Príklady:

```text
Matematika:
Rozpracované
DR, Laplace, Fourierov rad, číselné rady, gradient, vzorce

Linux:
Hotové
CLI, shell, príkazy, chmod, procesy, skúška

CCNA:
Dopĺňa sa
Packet Tracer, ARP/ND, Ethernet, VLSM, VLAN, kvízy
```

### 4. Farebné stavy na podstránkach

Stavový tag má farbu podľa stavu:

```text
Hotové – modrá
Dopĺňa sa – žltá
Rozpracované – fialová
```

## Zmenené predmetové stránky

```text
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

Na každej z nich je pridaný statický panel s tagmi a stavom.

## Ako nahrať patch

Rozbaľ ZIP do koreňa projektu Study Hub a nahraď existujúce súbory.

Potom použi:

```bash
git add assets/js/main.js assets/css/style.css subjects/linux.html subjects/msd.html subjects/ccna.html subjects/fyzika.html subjects/mat.html subjects/vvs.html subjects/java.html subjects/3d-tlac.html subjects/algebra.html subjects/praktikum.html subjects/uvod-do-studia.html README-PATCH.md README-NEW-STRUCTURE.md
git commit -m "Fix duplicate subject status tags and add static subject page status"
git push
```

## Čo skontrolovať po nahratí

Skontroluj:

```text
1. Otvor subjects.html.
2. Na každej karte predmetu má byť iba jeden stavový tag.
3. Pri Úvod do štúdia má ostať iba kompaktný spodný tag ROZPRACOVANÉ.
4. Otvor subjects/mat.html.
5. Panel pod nadpisom má ukazovať MATEMATIKA a ROZPRACOVANÉ.
6. Otvor subjects/linux.html.
7. Panel má ukazovať Linux Essentials a HOTOVÉ.
8. Otvor subjects/ccna.html.
9. Panel má ukazovať Cisco / CCNA a DOPĹŇA SA.
10. Skontroluj, že sa tagy nezobrazujú dvakrát.
```

## Poznámka

Tento patch nemení učivo, kvízy, kartičky ani checklisty.  
Rieši iba vizuálne zobrazenie stavových tagov na kartách a predmetových podstránkach.
