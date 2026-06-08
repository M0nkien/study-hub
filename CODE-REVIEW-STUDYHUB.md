# CODE REVIEW – Study Hub v3.3

Tento dokument je výsledok kontroly aktuálneho ZIP projektu Study Hub.

## Rýchle zhrnutie

Projekt je použiteľný ako statická študentská stránka pre GitHub Pages. Má dobrý základ: oddelené predmety, CSS v priečinku `style/`, JavaScript v `script/`, dáta v `data/`, samostatné predmetové stránky, flashcards, kvízy, roadmapu a changelog.

Najväčšie plusy:

```text
- prehľadná myšlienka stránky,
- samostatné predmetové podstránky,
- vlastné farby predmetov,
- flashcards,
- kvízy,
- checklisty,
- roadmapa,
- changelog,
- pripravené JSON dáta,
- použiteľné na GitHub Pages.
```

Najväčšie veci na opravu:

```text
- doplniť chýbajúce PDF/súbory v priečinku files/,
- odstrániť duplicitné navigačné odkazy Zmeny na predmetových stránkach,
- zjednotiť cache verzie CSS/JS odkazov,
- upratať staré testovacie súbory v koreňovom priečinku,
- postupne presunúť viac obsahu z HTML do JSON,
- neriešiť skutočnú bezpečnosť admina iba frontendom,
- nepridávať .git priečinok do ZIP balíkov pre zdieľanie.
```

---

## Výsledok automatickej kontroly

### JavaScript

```text
Skontrolované cez node --check.
Výsledok: bez syntaktických chýb.
```

### JSON

```text
Skontrolované JSON súbory v data/.
Výsledok: JSON súbory sú syntakticky platné.
```

### CSS importy

```text
Skontrolované @import cesty v CSS.
Výsledok: importy existujú.
```

### HTML odkazy

Nájdené chýbajúce odkazy hlavne na súbory v priečinku `files/`:

```text
files/ccna/poznamky.pdf
files/ccna/tahak.pdf
files/fyzika/fyzika-poznamky.pdf
files/fyzika/fyzika-vzorce.pdf
files/java/poznamky.pdf
files/java/tahak.pdf
files/linux/linux-poznamky.pdf
files/mat/poznamky.pdf
files/mat/tahak.pdf
files/msd/projekcie.pdf
files/msd/fourier.pdf
files/msd/tahak.pdf
files/msd/priklady.xlsx
files/vvs/poznamky.pdf
files/vvs/tahak.pdf
```

Tieto odkazy sú dobré ako plán, ale súbory treba reálne nahrať, inak budú na GitHub Pages nefunkčné.

---

## Hodnotenie štruktúry

### Dobré

```text
style/   CSS súbory sú oddelené od HTML
script/  JavaScript je v samostatnom priečinku
data/    existujú JSON dáta pre predmety, materiály, kvízy, roadmapu
subjects/ predmetové podstránky sú oddelené
```

### Na zlepšenie

```text
- veľa obsahu je stále pevne vloženého v HTML,
- JSON dáta sa ešte nepoužívajú ako hlavný zdroj obsahu,
- v koreňovom priečinku sú staršie pomocné súbory,
- style/fix.css už obsahuje veľa opravných pravidiel a časom ho treba rozdeliť,
- script/main.js obsahuje viac rôznych funkcií a časom ho treba rozbiť na moduly.
```

---

## Nájdené konkrétne problémy

### 1. Duplicitný odkaz Zmeny

Na predmetových stránkach bol dvakrát odkaz:

```text
Zmeny
```

V tomto patchi je to opravené.

### 2. Staré cesty v data/quizzes.json

Pôvodne:

```text
assets/js/quiz-linux.js
assets/js/quiz-msd.js
assets/js/quiz-ccna.js
```

Opravené na:

```text
script/quiz-linux.js
script/quiz-msd.js
script/quiz-ccna.js
```

### 3. Chýbajúce PDF a XLSX súbory

HTML už odkazuje na materiály, ale priečinok `files/` neobsahuje všetky súbory.

Odporúčanie:

```text
- buď nahrať chýbajúce PDF/XLSX,
- alebo dočasne odstrániť odkazy,
- alebo pridať viditeľný stav „súbor sa pripravuje“.
```

### 4. V ZIPe bol aj .git priečinok

Pri zdieľaní projektu ako ZIP nie je vhodné baliť `.git/`.

Odporúčanie:

```text
- .git nech ostane iba lokálne,
- do patch ZIPov ho nedávať,
- na GitHub ho samozrejme netreba kopírovať ručne.
```

### 5. Staršie pomocné súbory v koreňovom priečinku

Na kontrolu:

```text
footer-snippet.html
improvements.css
linux-quiz-addons.css
linux-quiz-section-example.html
linux-quiz-upgrade-readme.md
```

Odporúčanie:

```text
- presunúť do archive/ alebo docs/,
- alebo vymazať, ak sa už nepoužívajú.
```

### 6. Admin nie je reálne bezpečný

Ak je heslo v JavaScripte alebo v HTML, používateľ si ho vie nájsť cez DevTools.

Odporúčanie:

```text
- teraz stačí ako školský/projektový frontend,
- do budúcna Firebase/Supabase Auth alebo vlastný backend.
```

---

## Návrhy ďalších vylepšení

### Najbližšie úpravy

```text
1. Nahrať chýbajúce PDF a XLSX súbory.
2. Pridať files.html – prehľad všetkých materiálov.
3. Pridať quizzes.html – všetky kvízy na jednom mieste.
4. Pridať search.html – globálne vyhľadávanie.
5. Zjednotiť verzie CSS/JS query parametrov na ?v=3.3.
6. Presunúť staré pomocné súbory do archive/.
7. Skontrolovať mobilné zobrazenie všetkých predmetov.
8. Doplniť viac flashcards ku každému predmetu.
9. Skontrolovať správnosť kvízových odpovedí.
10. Pridať print.css pre tlač poznámok.
```

### Obsahové vylepšenia predmetov

#### Matematika

```text
- DR 1. rádu,
- DR 2. rádu,
- sústavy DR,
- Laplaceova transformácia,
- Fourierov rad,
- číselné rady,
- mocninové rady,
- funkcie dvoch premenných,
- gradient,
- smerový derivát,
- rozpoznávač typu príkladu.
```

#### Fyzika

```text
- vektory,
- kinematika,
- dynamika,
- Newtonove zákony,
- práca a energia,
- moment zotrvačnosti,
- Steinerova veta,
- matematické kyvadlo,
- fyzikálne kyvadlo,
- mechanické kmity,
- laboratórne merania,
- jednotky,
- odvodenia,
- vzorové písomky.
```

#### CCNA

```text
- subnetting,
- VLSM,
- VLAN,
- trunk,
- DHCP,
- DNS,
- ARP,
- ND,
- IPv4,
- IPv6,
- Ethernet,
- routing,
- SSH,
- port-security,
- Packet Tracer checklist,
- Keď nefunguje ping.
```

#### Linux

```text
- príkazy podľa kategórií,
- chmod a práva,
- používatelia,
- procesy,
- pipe a redirect,
- grep, sort, uniq,
- tar, gzip,
- ssh,
- man stránky,
- open-source licencie.
```

#### MSD

```text
- Excel vzorce,
- typické tabuľky,
- časové rady,
- aproximácie,
- Fourierova transformácia,
- pravdepodobnosť,
- rozdelenia,
- momentová metóda,
- maximálna vierohodnosť,
- histogramy,
- najčastejšie chyby.
```

#### VVS / ESP32

```text
- ESP32 piny,
- MicroPython základy,
- GPIO,
- PWM,
- ADC,
- UART,
- timery,
- OLED,
- buzzer,
- RGB LED,
- robot,
- web server,
- obhajoba projektu.
```

#### Java

```text
- OOP,
- triedy,
- objekty,
- atribúty,
- metódy,
- konštruktory,
- dedičnosť,
- polymorfizmus,
- výnimky,
- generiká,
- ArrayList,
- UML,
- Javadoc,
- Checkstyle,
- semestrálna práca,
- obhajoba.
```

---

## Dizajnové vylepšenia

```text
1. Vlastné ikonky predmetov.
2. Lepšie hover animácie.
3. Jednotné karty sekcií.
4. Vlastné farebné témy predmetov.
5. Lepší svetlý režim.
6. Kompaktný režim.
7. Lepšie mobilné menu.
8. Jasnejšie rozlíšenie medzi teóriou, príkladmi a kvízmi.
9. Stav „súbor sa pripravuje“ pri chýbajúcich materiáloch.
10. Print režim pre poznámky.
```

---

## Technické vylepšenia

```text
1. Zjednotiť localStorage kľúče.
2. Rozdeliť script/main.js na menšie súbory.
3. Rozdeliť style/fix.css na menšie moduly.
4. Použiť JSON ako hlavný zdroj dát.
5. Automaticky generovať subject cards z data/subjects.json.
6. Automaticky generovať roadmapu z data/roadmap.json.
7. Automaticky generovať changelog z data/changelog.json.
8. Pridať kontrolný skript na broken links.
9. Pridať manifest.json a service-worker.js.
10. Pridať GitHub Actions kontrolu HTML/JS/JSON.
```

---

## Odporúčané fázy

```text
Fáza 1 – stabilizácia a opravy odkazov
Fáza 2 – doplnenie obsahu hlavných predmetov
Fáza 3 – kvízy, flashcards a výsledky
Fáza 4 – globálne vyhľadávanie a stránka súborov
Fáza 5 – admin a backend
Fáza 6 – PWA, print a performance
```
