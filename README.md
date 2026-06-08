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


---

## Checklisty pred skúškou

Každý predmet má vlastný checklist, ktorý pomáha skontrolovať pripravenosť pred skúškou alebo testom.

Checklist neslúži ako samostatná stránka na celú šírku, ale ako posledná obsahová sekcia v predmete.

Príklady:

```text
Fyzika:
- vektory,
- kinematika,
- Newtonove zákony,
- práca a energia,
- moment zotrvačnosti,
- Steinerova veta,
- kyvadlá,
- laboratórne merania.

CCNA:
- subnetting,
- VLSM,
- VLAN,
- trunk,
- DHCP,
- DNS,
- routing,
- SSH,
- port-security.

Matematika:
- DR 1. rádu,
- DR 2. rádu,
- sústavy DR,
- Laplaceova transformácia,
- Fourierov rad,
- číselné rady,
- mocninové rady,
- gradient.
```


---

## Odporúčané ďalšie vylepšenia

### Čo uplatniť teraz

```text
1. Stabilizovať layout po presune CSS/JS do style/ a script/.
2. Skontrolovať, že v HTML nie sú staré odkazy assets/css a assets/js.
3. Zjednotiť checklisty vo všetkých predmetoch.
4. Doplniť najdôležitejšie predmety: Matematika, Fyzika, CCNA, MSD, Linux.
5. Skontrolovať kvízové odpovede.
6. Doplniť viac kartičiek ku každému predmetu.
7. Pridať stránku quizzes.html so všetkými kvízmi pokope.
8. Pridať stránku files.html so všetkými materiálmi a PDF pokope.
9. Pridať globálne vyhľadávanie cez celý web.
10. Pridať print štýly pre poznámky.
```

### Čo nechať do budúcna

```text
1. Backend alebo databáza pre podporu a admin panel.
2. Firebase alebo Supabase na ukladanie spätnej väzby.
3. Prihlásenie používateľov.
4. Zdieľané výsledky kvízov medzi zariadeniami.
5. Analytics – sledovanie najpoužívanejších predmetov a kvízov.
6. Automatické generovanie stránok predmetov z JSON dát.
7. Lepší editor obsahu pre admina.
8. Export poznámok do PDF.
9. Print verzia každej predmetovej teórie.
10. Offline režim ako PWA aplikácia.
```


---

## Návrhy ďalších úprav – krátky plán

### Najbližšie úpravy

```text
1. Pridať stránku quizzes.html so všetkými kvízmi pokope.
2. Pridať stránku files.html so všetkými materiálmi, PDF, ťahákmi a zadaniami.
3. Pridať globálne vyhľadávanie cez celý web.
4. Doplniť viac flashcards pre každý predmet.
5. Skontrolovať správnosť kvízových odpovedí.
6. Zjednotiť vzhľad všetkých checklistov.
7. Doplniť print štýly pre poznámky.
8. Pridať tlačidlo „Pokračovať tam, kde som skončil“ na viac miest.
```

### Väčšie úpravy do budúcna

```text
1. Backend pre podporu a admin panel.
2. Databáza cez Firebase alebo Supabase.
3. Prihlasovanie používateľov.
4. Synchronizácia výsledkov medzi zariadeniami.
5. Editor obsahu pre admina.
6. Automatické generovanie predmetových stránok z JSON súborov.
7. Export poznámok do PDF.
8. Offline režim ako PWA aplikácia.
9. Analytics pre sledovanie najpoužívanejších predmetov.
10. Svetlý režim doladený pre všetky sekcie.
```

---

## Study Hub v3.3 – nové funkcie

### Changelog

Pridaná stránka:

```text
changelog.html
```

Obsahuje históriu zmien, aktuálnu verziu, poslednú aktualizáciu a plán ďalších úprav.

### Hlavná stránka

Hlavná stránka obsahuje:

```text
- tlačidlo Pokračovať tam, kde som skončil,
- posledný otvorený predmet,
- najnovšie pridané,
- malé vysvetlenie čo je Study Hub,
- rýchle odkazy,
- mini dashboard,
- verziu stránky,
- dátum poslednej aktualizácie.
```

### Flashcards v3.3

Flashcards teraz podporujú:

```text
- výber predmetu,
- výber témy,
- náhodné poradie,
- režim učenia,
- režim skúšania,
- opakovanie iba nevedených kartičiek,
- označenie Viem / Neviem,
- počítadlo kartičiek,
- históriu učenia,
- export stavu kartičiek.
```

### Roadmapa ako projektový plán

Roadmapa je rozdelená na:

```text
- Hotové,
- Pracuje sa,
- Plánované,
- Nápady,
- Nahlásené chyby,
- Odložené.
```

Každá položka má:

```text
- názov,
- popis,
- predmet,
- stav,
- prioritu,
- dátum,
- typ.
```

### Predmetové stránky

Do predmetových stránok bola pridaná sekcia:

```text
Štruktúra predmetu a plán doplnenia
```

Obsahuje plán, čo sa má v danom predmete doplniť.

### Checklisty

Checklisty sú rozdelené podľa tém a ukladajú sa do localStorage.
