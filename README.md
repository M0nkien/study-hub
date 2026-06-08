# Study Hub

**Study Hub** je neoficiálna študentská webová stránka vytvorená ako digitálna študovňa pre študentov.

Autor projektu: **MG**

Stránka slúži na ukladanie a prehľadné zobrazovanie poznámok, príkladov, kvízov, kartičiek, vzorcov, školských postupov a materiálov z predmetov.

---

## Čo stránka obsahuje

Study Hub obsahuje:

```text
- hlavnú stránku,
- samostatnú stránku so všetkými predmetmi,
- predmetové podstránky,
- kvízy,
- flashcards kartičky,
- výsledky kvízov,
- roadmapu,
- podporu cez formulár,
- admin sekciu,
- progres učenia,
- checklisty pred skúškou,
- materiály a súbory k predmetom.
```

---

## Predmety

Na stránke sú pripravené alebo rozpracované tieto predmety:

```text
Linux Essentials
MSD – Metódy spracovania dát
Cisco / CCNA
Fyzika
Matematika
VVS – Vývoj vstavaných systémov
Java / Informatika
3D tlač
Algebra
Praktikum z programovania
Úvod do štúdia
```

Každý predmet má vlastnú podstránku.

---

## Čo obsahuje predmetová stránka

Predmetová stránka môže obsahovať:

```text
- poznámky,
- kompletnú teóriu,
- štúdium,
- checklist,
- materiály,
- súbory,
- kvíz,
- vzorce,
- príklady,
- zadania,
- postupy,
- príkazy,
- labáky,
- otázky na skúšku.
```

Každá predmetová stránka má:

```text
- vlastnú farbu,
- stav predmetu,
- tagy predmetu,
- bočný panel s obsahom,
- progres učenia,
- tlačidlá na označenie častí ako naučené alebo urobené.
```

---

## Stavy predmetov

Predmety môžu mať stav:

```text
Hotové
Dopĺňa sa
Rozpracované
```

Stavy sú farebne odlíšené.

---

## Kvízy

Kvízy slúžia na opakovanie pred skúškou alebo testom.

Funkcie kvízov:

```text
- výber testu,
- kontrola odpovede,
- výsledok,
- skóre,
- uloženie výsledkov,
- režim opakovania,
- otázky podľa predmetu.
```

---

## Flashcards

Flashcards sú kartičky na učenie pojmov.

Použitie:

```text
1. Vyber predmet.
2. Zobrazí sa otázka.
3. Klikni na kartičku.
4. Zobrazí sa odpoveď.
5. Pokračuj ďalšou kartičkou.
```

Kartičky používajú farbu podľa predmetu.

Príklady:

```text
Linux – modrá
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

---

## Roadmapa

Roadmapa ukazuje plán vývoja stránky.

Je rozdelená na:

```text
Hotové
Pracuje sa
Plánované
Nápady
Kontrola / nahlásené chyby
```

Roadmapa pomáha sledovať, čo je už spravené a čo sa bude ešte dopĺňať.

---

## Podpora

Stránka má samostatnú podstránku podpory.

Používa sa na:

```text
- nahlásenie chyby,
- návrh vylepšenia,
- nahlásenie nefunkčného odkazu,
- spätnú väzbu.
```

---

## Admin

Admin časť slúži na správu alebo kontrolu nahlásených vecí.

Admin má byť chránený heslom, aby sa zabránilo zneužitiu.

---

## Štruktúra súborov

Aktuálna štruktúra je rozdelená prehľadnejšie:

```text
style/
script/
subjects/
data/
files/
```

### style/

Obsahuje všetky CSS súbory.

Hlavný CSS súbor:

```text
style/main.css
```

Ďalšie CSS súbory:

```text
style/base.css
style/layout.css
style/header.css
style/home.css
style/subjects.css
style/subject-detail.css
style/flashcards.css
style/roadmap.css
style/footer.css
style/fix.css
```

### script/

Obsahuje JavaScript súbory.

Príklady:

```text
script/main.js
script/flashcards.js
script/fix.js
script/progress.js
script/checklist.js
script/quiz-engine.js
script/quiz-linux.js
script/quiz-ccna.js
script/quiz-msd.js
```

### subjects/

Obsahuje predmetové podstránky:

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

### data/

Obsahuje dátové súbory:

```text
data/subjects.json
data/materials.json
data/flashcards.json
data/roadmap.json
```

### files/

Obsahuje prípadné obrázky, PDF alebo súbory ku predmetom.

---

## Lokálne spustenie

Najjednoduchšie spustenie vo VS Code:

```text
1. Otvor projekt vo VS Code.
2. Použi Live Server.
3. Otvor index.html.
```

Alebo cez Python server:

```bash
python -m http.server 5500
```

Potom otvor:

```text
http://localhost:5500
```

---

## GitHub Pages

Stránka je vhodná na GitHub Pages.

Odporúčaný postup:

```bash
git add .
git commit -m "Update Study Hub"
git push
```

Na GitHub Pages skontroluj:

```text
Settings
Pages
Branch: main
Folder: /root
```

---

## Dôležité upozornenie

Táto stránka je neoficiálna študentská pomôcka.

Materiály slúžia iba na vzdelávacie účely.

Autor nezodpovedá za prípadné chyby v poznámkach.

Oficiálne informácie si vždy overte v Moodle alebo u vyučujúceho.

---

## Stav projektu

Projekt sa priebežne dopĺňa.

Aktuálna verzia:

```text
Study Hub v3.2
```

Posledné väčšie úpravy:

```text
- presun CSS do style/
- presun JavaScriptu do script/
- oprava predmetových pozadí,
- farebné stavy predmetov,
- prepracovaná roadmapa,
- flashcards farbené podľa predmetu,
- doplnený README.
```
