const FLASHCARD_DATA = {
    linux: [
        ["Čo je Linux?", "Linux je jadro operačného systému. Distribúcia je kompletný systém s jadrom, nástrojmi a balíčkami."],
        ["Čo je shell?", "Program, ktorý prijíma príkazy používateľa a spúšťa ich. Najčastejší je Bash."],
        ["Čo je chmod?", "Príkaz na zmenu práv súboru alebo adresára."],
        ["Čo znamená chmod 755?", "Vlastník rwx, skupina r-x, ostatní r-x."],
        ["Čo robí grep?", "Vyhľadáva text alebo regulárny výraz v súbore alebo vstupe."],
        ["Čo znamená pipe | ?", "Presmeruje výstup jedného príkazu ako vstup do ďalšieho."],
        ["Čo robí sort | uniq?", "Zoradí riadky a odstráni duplicitné susedné riadky."],
        ["Čo je /etc/passwd?", "Súbor so základnými informáciami o používateľoch."],
        ["Čo robí man?", "Zobrazí manuálovú stránku príkazu."],
        ["Čo je sticky bit?", "Špeciálne právo, ktoré v spoločnom adresári chráni cudzie súbory pred vymazaním."]
    ],
    ccna: [
        ["Čo je Ethernet?", "Najpoužívanejšia technológia pre lokálne siete LAN."],
        ["Čo robí LLC?", "Komunikuje s vyššou vrstvou, teda s vrstvou L3."],
        ["Čo robí MAC podvrstva?", "Rieši rámce, MAC adresy a prístup k médiu."],
        ["Čo je FCS?", "Kontrolná hodnota v traileri rámca na detekciu chýb."],
        ["Čo je ARP?", "Protokol, ktorý zisťuje MAC adresu k známej IPv4 adrese."],
        ["Čo je ND?", "Neighbor Discovery v IPv6, náhrada funkcií ARP."],
        ["Čo je ARP poisoning?", "Útok, pri ktorom útočník podvrhne ARP záznamy."],
        ["Čo je default gateway?", "Adresa smerovača, cez ktorý ide komunikácia mimo lokálnej siete."],
        ["Čo je VLAN?", "Logické rozdelenie siete na samostatné broadcast domény."],
        ["Čo je trunk?", "Port, ktorý prenáša viac VLAN medzi zariadeniami."],
        ["Čo kontrolovať, keď nejde ping?", "IP, masku, gateway, VLAN, trunk, routing, DHCP a DNS."],
        ["Príkaz show ip arp", "Na Cisco zariadení zobrazí ARP tabuľku."]
    ],
    fyzika: [
        ["Čo je hmotný bod?", "Model telesa, pri ktorom zanedbáme rozmery a sledujeme iba jeho pohyb."],
        ["Vzorec pre rýchlosť", "v = s / t"],
        ["Vzorec pre zrýchlenie", "a = Δv / Δt"],
        ["Druhý Newtonov zákon", "F = m · a"],
        ["Tiažová sila", "FG = m · g"],
        ["Kinetická energia", "Ek = 1/2 · m · v²"],
        ["Potenciálna energia", "Ep = m · g · h"],
        ["Hybnosť", "p = m · v"],
        ["Moment sily", "M = r · F · sin α"],
        ["Moment zotrvačnosti bodu", "I = m · r²"],
        ["Steinerova veta", "I = I0 + m · d²"],
        ["Perióda matematického kyvadla", "T = 2π√(l/g)"],
        ["Perióda fyzikálneho kyvadla", "T = 2π√(I/(mgl))"],
        ["Objem valca", "V = πd²h / 4"],
        ["Najčastejšia chyba vo fyzike", "Zlé jednotky: cm treba prepočítať na m, g na kg, mm na m."],
        ["Tangenciálne zrýchlenie", "at = εr, vzniká pri zmene veľkosti rýchlosti pri pohybe po kružnici."],
        ["Normálové zrýchlenie", "an = v²/r = ω²r, smeruje do stredu kružnice."],
        ["Uhlová rýchlosť", "ω = 2πf = 2π/T."],
        ["Uhlová dráha po N otáčkach", "φ = N · 2π."],
        ["Rovnica pre spomaľujúce sa koleso", "ω² = ω0² + 2εφ."],
        ["Bernoulliho rovnica", "p + 1/2ρv² + ρgh = konštanta."],
        ["Rovnica kontinuity", "S1v1 = S2v2."],
        ["Stokesov zákon", "F = 6πηrv pre odporovú silu pri malých rýchlostiach."]
    ],
    mat: [
        ["Separovateľná DR", "y' = f(x)g(y), členy s y dáš na jednu stranu a členy s x na druhú."],
        ["Lineárna DR 1. rádu", "y' + p(x)y = q(x)."],
        ["Integračný faktor", "μ(x) = e^(∫p(x)dx)."],
        ["Bernoulliho rovnica", "y' + p(x)y = q(x)yⁿ, substitúcia z = y^(1-n)."],
        ["DR 2. rádu homogénna", "ay'' + by' + cy = 0."],
        ["Charakteristická rovnica", "ar² + br + c = 0."],
        ["Sústava DR", "X' = AX, rieši sa cez vlastné čísla a vlastné vektory."],
        ["Laplace y'", "L{y'} = sY(s) - y(0)."],
        ["Laplace y''", "L{y''} = s²Y(s) - sy(0) - y'(0)."],
        ["Fourierov rad", "f(x) ~ a0/2 + Σ(an cos nx + bn sin nx)."],
        ["Podielové kritérium", "L = lim |a(n+1)/an|, ak L < 1 konverguje."],
        ["Odmocninové kritérium", "L = lim ⁿ√|an|, ak L < 1 konverguje."],
        ["Gradient", "∇f = (fx, fy)."],
        ["Smerová derivácia", "Duf = ∇f · u, kde u je jednotkový vektor."]
    ],
    java: [
        ["Čo je trieda?", "Predpis na vytváranie objektov."],
        ["Čo je objekt?", "Konkrétna inštancia triedy."],
        ["Čo je atribút?", "Premenná objektu, ktorá opisuje jeho stav."],
        ["Čo je metóda?", "Funkcia v triede, ktorá opisuje správanie objektu."],
        ["Čo je konštruktor?", "Špeciálna metóda, ktorá sa volá pri vytvorení objektu."],
        ["Čo je dedičnosť?", "Mechanizmus, kde trieda preberá vlastnosti a metódy inej triedy."],
        ["Čo je polymorfizmus?", "Schopnosť pracovať s objektmi rôznych tried cez spoločný typ."],
        ["Čo znamená override?", "Prepísanie metódy z rodičovskej triedy."],
        ["Čo je výnimka?", "Chybový alebo výnimočný stav počas behu programu."],
        ["Čo je UML?", "Diagramový zápis tried, atribútov, metód a vzťahov."]
    ],
    msd: [
        ["Čo je časový rad?", "Postupnosť hodnôt zoradených podľa času."],
        ["Čo je aproximácia?", "Nahradenie dát jednoduchším modelom."],
        ["Lineárny model", "ŷ(t) = c0 + c1t."],
        ["Kvadratický model", "ŷ(t) = c0 + c1t + c2t²."],
        ["Normálne rovnice", "c = (XᵀX)^(-1)Xᵀy."],
        ["Chyba aproximácie", "||e|| = √Σ(yᵢ - ŷᵢ)²."],
        ["Fourierova transformácia", "Rozklad signálu na frekvenčné zložky."],
        ["Amplitúda Fourierovej zložky", "A = √(Re² + Im²)."],
        ["Diskrétna náhodná premenná", "Nadobúda konečný alebo spočítateľný počet hodnôt."],
        ["Stredná hodnota", "E(X) = Σxᵢpᵢ."],
        ["Rozptyl", "D(X) = Σ(xᵢ - E(X))²pᵢ."],
        ["Poisson λ", "λ = priemer dát."],
        ["Exponenciálne λ", "λ = 1 / priemer dát."],
        ["Normálne rozdelenie", "μ = priemer, σ² = rozptyl."]
    ],
    vvs: [
        ["Čo je ESP32?", "Mikrokontrolér s GPIO, PWM, ADC, UART, Wi-Fi/Bluetooth a možnosťou web servera."],
        ["Čo je GPIO?", "Digitálny vstup alebo výstup na mikrokontroléri."],
        ["MicroPython Pin OUT", "led = Pin(21, Pin.OUT), led.value(1)."],
        ["Čo je PWM?", "Pulzno-šírková modulácia na riadenie jasu LED, bzučiaka alebo motorov."],
        ["Čo je ADC?", "Analógovo-digitálny prevodník na čítanie analógovej hodnoty."],
        ["Čo je UART?", "Sériová komunikácia medzi zariadeniami."],
        ["Čo je Timer?", "Časovač, ktorý spúšťa funkciu jednorazovo alebo periodicky."],
        ["Čo je debounce?", "Odstránenie zákmitov tlačidla."],
        ["Čo vysvetliť na obhajobe?", "Cieľ, zapojenie, použité súbory, fungovanie kódu, ovládanie a možné vylepšenia."],
        ["Čo je web server na ESP32?", "ESP32 poskytuje HTML stránku a reaguje na príkazy z prehliadača."]
    ],
    tlac3d: [
        ["Čo je aditívna výroba?", "Výrobný proces, pri ktorom sa materiál pridáva po vrstvách."],
        ["Čo je FDM/FFF?", "Technológia 3D tlače, kde sa taví filament a ukladá po vrstvách."],
        ["Čo je SLA?", "3D tlač zo živice, ktorá sa vytvrdzuje svetlom."],
        ["Čo je SLS?", "Spekanie práškového materiálu laserom."],
        ["Čo robí slicer?", "Premení 3D model na G-code pre tlačiareň."],
        ["Čo je layer height?", "Výška jednej tlačenej vrstvy."],
        ["Čo je infill?", "Vnútorná výplň modelu."],
        ["Čo sú supports?", "Podpery pre previsy pri tlači."]
    ],
    algebra: [
        ["Čo je matica?", "Obdĺžniková tabuľka čísel používaná napríklad pri sústavách rovníc."],
        ["Determinant 2×2", "Pre maticu [[a,b],[c,d]] je determinant ad - bc."],
        ["Kedy existuje inverzná matica?", "Keď je matica štvorcová a det(A) ≠ 0."],
        ["Čo je Gaussova eliminácia?", "Postup riešenia sústavy cez riadkové úpravy matice."],
        ["Vlastné číslo", "Číslo λ, pre ktoré platí Av = λv."],
        ["Vlastný vektor", "Nenulový vektor v, ktorý po násobení maticou nemení smer."]
    ],
    praktikum: [
        ["Čo je trieda v Jave?", "Predpis na vytváranie objektov."],
        ["Čo je objekt?", "Konkrétna inštancia triedy."],
        ["Čo je konštruktor?", "Špeciálna metóda, ktorá nastaví objekt pri vytvorení."],
        ["Čo je ArrayList?", "Dynamický zoznam objektov."],
        ["Ako pridám objekt do ArrayListu?", "zoznam.add(objekt);"],
        ["Čo je for-each cyklus?", "Cyklus na prechádzanie prvkov zoznamu alebo poľa."]
    ],
    uvod: [
        ["Čo je cieľ semestrálnej práce?", "Jasne popísať problém, riešenie, návrh tried, plán a výsledok."],
        ["Čo je Mazy Mouse?", "Projekt, kde myš hľadá syr v prostredí a správanie sa dá hodnotiť stratégiou."],
        ["Čo má obsahovať UML?", "Triedy, atribúty, metódy a vzťahy medzi triedami."],
        ["Čo je časový plán?", "Rozdelenie práce na etapy a termíny."],
        ["Čo povedať na obhajobe?", "Cieľ, riešenie, triedy, výsledok, vlastný prínos a možné vylepšenia."],
        ["Čo sú možné rozšírenia?", "Nápady, ktoré by projekt mohli v budúcnosti vylepšiť."]
    ]
};

const STUDY_HUB_EXTRA_FLASHCARDS = {
    "linux": [
        [
            "Čo je terminál?",
            "Program, cez ktorý zadávaš príkazy do shellu."
        ],
        [
            "Čo je príkaz pwd?",
            "Zobrazí aktuálny pracovný adresár."
        ],
        [
            "Čo robí ls?",
            "Vypíše obsah aktuálneho adresára."
        ],
        [
            "Čo robí cd?",
            "Zmení aktuálny adresár."
        ],
        [
            "Čo znamená cd ..?",
            "Presunie ťa o jeden adresár vyššie."
        ],
        [
            "Čo robí mkdir?",
            "Vytvorí nový adresár."
        ],
        [
            "Čo robí touch?",
            "Vytvorí prázdny súbor alebo aktualizuje čas zmeny."
        ],
        [
            "Čo robí rm?",
            "Vymaže súbor alebo adresár podľa použitých prepínačov."
        ],
        [
            "Čo znamená > ?",
            "Presmeruje výstup do súboru a prepíše jeho obsah."
        ],
        [
            "Čo znamená >> ?",
            "Pridá výstup na koniec súboru."
        ]
    ],
    "ccna": [
        [
            "Čo je IP adresa?",
            "Logická adresa zariadenia v sieti."
        ],
        [
            "Čo je MAC adresa?",
            "Fyzická adresa sieťovej karty na 2. vrstve OSI."
        ],
        [
            "Čo je switch?",
            "Zariadenie, ktoré prepája zariadenia v LAN podľa MAC adries."
        ],
        [
            "Čo je router?",
            "Zariadenie, ktoré prepája rôzne siete a smeruje pakety."
        ],
        [
            "Čo je subnet mask?",
            "Určuje, ktorá časť IP adresy je sieť a ktorá host."
        ],
        [
            "Čo je default gateway?",
            "Router, cez ktorý zariadenie komunikuje mimo svojej siete."
        ],
        [
            "Čo je ping?",
            "Príkaz na overenie dostupnosti zariadenia v sieti."
        ],
        [
            "Čo je DNS?",
            "Služba, ktorá prekladá názvy domén na IP adresy."
        ],
        [
            "Čo je DHCP?",
            "Služba, ktorá automaticky prideľuje IP adresy."
        ],
        [
            "Čo je broadcast?",
            "Správa poslaná všetkým zariadeniam v lokálnej sieti."
        ]
    ],
    "fyzika": [
        [
            "Čo je fyzikálna veličina?",
            "Merateľná vlastnosť telesa alebo deja, napríklad dráha, čas, sila."
        ],
        [
            "Čo je jednotka?",
            "Dohodnutá miera fyzikálnej veličiny, napríklad meter, sekunda, newton."
        ],
        [
            "Čo je skalár?",
            "Veličina, ktorá má iba veľkosť, napríklad čas alebo teplota."
        ],
        [
            "Čo je vektor?",
            "Veličina, ktorá má veľkosť aj smer, napríklad sila alebo rýchlosť."
        ],
        [
            "Čo je dráha?",
            "Dĺžka trajektórie, ktorú teleso prejde."
        ],
        [
            "Čo je rýchlosť?",
            "Zmena polohy alebo dráhy za čas."
        ],
        [
            "Čo je zrýchlenie?",
            "Zmena rýchlosti za čas."
        ],
        [
            "Čo je sila?",
            "Veličina, ktorá spôsobuje zmenu pohybu alebo deformáciu telesa."
        ],
        [
            "Čo je práca?",
            "Práca vzniká, keď sila pôsobí po dráhe."
        ],
        [
            "Čo je energia?",
            "Schopnosť telesa konať prácu."
        ]
    ],
    "mat": [
        [
            "Čo je diferenciálna rovnica?",
            "Rovnica, v ktorej vystupuje neznáma funkcia a jej derivácie."
        ],
        [
            "Čo je všeobecné riešenie DR?",
            "Riešenie s konštantami C1, C2 a podobne."
        ],
        [
            "Čo je partikulárne riešenie?",
            "Konkrétne riešenie po dosadení podmienok."
        ],
        [
            "Čo znamená y'?",
            "Prvá derivácia funkcie y podľa premennej x."
        ],
        [
            "Čo znamená y''?",
            "Druhá derivácia funkcie y podľa x."
        ],
        [
            "Čo je homogénna DR?",
            "Rovnica, kde je pravá strana nulová."
        ],
        [
            "Čo je nehomogénna DR?",
            "Rovnica, kde pravá strana nie je nulová."
        ],
        [
            "Čo je rad?",
            "Súčet nekonečne veľa členov postupnosti."
        ],
        [
            "Čo je konvergencia radu?",
            "Rad má konečný súčet."
        ],
        [
            "Čo je divergencia radu?",
            "Rad nemá konečný súčet."
        ]
    ],
    "msd": [
        [
            "Čo znamená MSD?",
            "Metódy spracovania dát."
        ],
        [
            "Čo je dátová vzorka?",
            "Súbor hodnôt, ktoré analyzujeme."
        ],
        [
            "Čo je priemer?",
            "Súčet hodnôt delený ich počtom."
        ],
        [
            "Čo je medián?",
            "Stredná hodnota zoradených dát."
        ],
        [
            "Čo je modus?",
            "Najčastejšie sa vyskytujúca hodnota."
        ],
        [
            "Čo je rozptyl?",
            "Miera rozptýlenia hodnôt okolo priemeru."
        ],
        [
            "Čo je smerodajná odchýlka?",
            "Odmocnina z rozptylu."
        ],
        [
            "Čo je histogram?",
            "Grafické zobrazenie rozdelenia početností."
        ],
        [
            "Čo je regresia?",
            "Hľadanie modelu, ktorý opisuje závislosť dát."
        ],
        [
            "Čo je chyba odhadu?",
            "Rozdiel medzi skutočnou a modelovou hodnotou."
        ]
    ],
    "vvs": [
        [
            "Čo je mikrokontrolér?",
            "Malý počítač na jednom čipe určený na riadenie zariadení."
        ],
        [
            "Čo je pin?",
            "Vývod mikrokontroléra, ktorý môže slúžiť ako vstup alebo výstup."
        ],
        [
            "Čo je digitálny výstup?",
            "Výstup s hodnotou 0 alebo 1."
        ],
        [
            "Čo je digitálny vstup?",
            "Vstup, ktorý číta stav 0 alebo 1."
        ],
        [
            "Čo je pull-up?",
            "Odporové pripojenie vstupu na logickú 1."
        ],
        [
            "Čo je LED?",
            "Dióda, ktorá svieti pri prechode prúdu."
        ],
        [
            "Čo je buzzer?",
            "Súčiastka, ktorá vydáva zvuk."
        ],
        [
            "Čo je senzor?",
            "Súčiastka, ktorá meria fyzikálnu veličinu."
        ],
        [
            "Čo je web server na ESP32?",
            "Program, ktorý poskytuje web stránku na ovládanie zariadenia."
        ],
        [
            "Čo je obhajoba projektu?",
            "Vysvetlenie cieľa, zapojenia, kódu a výsledku projektu."
        ]
    ],
    "java": [
        [
            "Čo je Java?",
            "Objektovo orientovaný programovací jazyk."
        ],
        [
            "Čo je premenná?",
            "Miesto v pamäti, kde je uložená hodnota."
        ],
        [
            "Čo je dátový typ?",
            "Určuje, aký druh hodnoty premenná obsahuje."
        ],
        [
            "Čo je int?",
            "Dátový typ pre celé čísla."
        ],
        [
            "Čo je String?",
            "Dátový typ pre text."
        ],
        [
            "Čo je boolean?",
            "Dátový typ s hodnotou true alebo false."
        ],
        [
            "Čo je if?",
            "Podmienka, ktorá rozhoduje, čo sa vykoná."
        ],
        [
            "Čo je for cyklus?",
            "Cyklus, ktorý sa opakuje podľa podmienky alebo počítadla."
        ],
        [
            "Čo je metóda?",
            "Blok kódu, ktorý vykonáva určitú úlohu."
        ],
        [
            "Čo je private?",
            "Prístupový modifikátor, ktorý skryje člen triedy pred okolím."
        ]
    ],
    "tlac3d": [
        [
            "Čo je 3D model?",
            "Digitálny objekt pripravený v modelovacom programe."
        ],
        [
            "Čo je STL?",
            "Bežný formát súboru pre 3D tlač."
        ],
        [
            "Čo je G-code?",
            "Súbor príkazov pre 3D tlačiareň."
        ],
        [
            "Čo je filament?",
            "Materiál vo forme struny používaný pri FDM tlači."
        ],
        [
            "Čo je tryska?",
            "Časť tlačiarne, cez ktorú vychádza roztavený materiál."
        ],
        [
            "Čo je podložka tlačiarne?",
            "Plocha, na ktorú sa tlačí model."
        ],
        [
            "Čo je výplň modelu?",
            "Vnútorná štruktúra modelu."
        ],
        [
            "Čo je orientácia modelu?",
            "Nastavenie polohy modelu na podložke."
        ],
        [
            "Čo je podpora?",
            "Dočasný materiál pod prevismi."
        ],
        [
            "Čo je prototyp?",
            "Skúšobný model výrobku."
        ]
    ],
    "algebra": [
        [
            "Čo je algebra?",
            "Časť matematiky pracujúca so symbolmi, rovnicami, maticami a štruktúrami."
        ],
        [
            "Čo je rovnica?",
            "Zápis rovnosti s neznámou."
        ],
        [
            "Čo je neznáma?",
            "Hodnota, ktorú treba vypočítať."
        ],
        [
            "Čo je sústava rovníc?",
            "Viac rovníc riešených naraz."
        ],
        [
            "Čo je riadok matice?",
            "Vodorovná časť matice."
        ],
        [
            "Čo je stĺpec matice?",
            "Zvislá časť matice."
        ],
        [
            "Čo je nulová matica?",
            "Matica, ktorej všetky prvky sú nuly."
        ],
        [
            "Čo je jednotková matica?",
            "Matica s jednotkami na hlavnej diagonále."
        ],
        [
            "Čo je hodnosť matice?",
            "Počet lineárne nezávislých riadkov alebo stĺpcov."
        ],
        [
            "Čo je báza?",
            "Množina lineárne nezávislých vektorov, ktorá generuje priestor."
        ]
    ],
    "praktikum": [
        [
            "Čo je algoritmus?",
            "Presný postup riešenia problému."
        ],
        [
            "Čo je syntax?",
            "Pravidlá zápisu programu."
        ],
        [
            "Čo je chyba kompilácie?",
            "Chyba, kvôli ktorej sa program nepreloží."
        ],
        [
            "Čo je logická chyba?",
            "Program beží, ale dáva zlý výsledok."
        ],
        [
            "Čo je Main?",
            "Trieda alebo metóda, odkiaľ sa program spúšťa."
        ],
        [
            "Čo je parameter metódy?",
            "Hodnota odovzdaná metóde pri volaní."
        ],
        [
            "Čo je návratová hodnota?",
            "Hodnota, ktorú metóda vráti."
        ],
        [
            "Čo je void?",
            "Metóda nič nevracia."
        ],
        [
            "Čo je getter?",
            "Metóda, ktorá vráti hodnotu atribútu."
        ],
        [
            "Čo je setter?",
            "Metóda, ktorá nastaví hodnotu atribútu."
        ]
    ],
    "uvod": [
        [
            "Čo je štúdium na VŠ?",
            "Samostatnejšie učenie, práca s materiálmi a plnenie zadaní."
        ],
        [
            "Čo je Moodle?",
            "Školský systém na materiály, zadania a testy."
        ],
        [
            "Čo je AIS/e-vzdelávanie?",
            "Systém na predmety, hodnotenia a administratívu štúdia."
        ],
        [
            "Čo je semestrálna práca?",
            "Väčšia práca alebo projekt odovzdávaný počas semestra."
        ],
        [
            "Čo je zadanie projektu?",
            "Popis toho, čo treba vytvoriť alebo spracovať."
        ],
        [
            "Čo je dokumentácia?",
            "Textový popis riešenia, návrhu a postupu."
        ],
        [
            "Čo je prezentácia?",
            "Stručné predstavenie práce pred vyučujúcim alebo skupinou."
        ],
        [
            "Čo je obhajoba?",
            "Vysvetlenie a obhájenie vlastnej práce."
        ],
        [
            "Čo je časový plán?",
            "Rozpis práce podľa termínov."
        ],
        [
            "Čo je spätná väzba?",
            "Komentár alebo odporúčanie na zlepšenie práce."
        ]
    ]
};

Object.keys(STUDY_HUB_EXTRA_FLASHCARDS).forEach(subject => {
    if (!FLASHCARD_DATA[subject]) {
        FLASHCARD_DATA[subject] = [];
    }

    STUDY_HUB_EXTRA_FLASHCARDS[subject].forEach(card => {
        const exists = FLASHCARD_DATA[subject].some(existing => existing[0] === card[0]);
        if (!exists) {
            FLASHCARD_DATA[subject].push(card);
        }
    });
});



const FLASHCARD_SUBJECT_COLORS = {
    linux: "#65d4f2",
    msd: "#22d3ee",
    ccna: "#3b82f6",
    fyzika: "#f59e0b",
    mat: "#a78bfa",
    vvs: "#34d399",
    java: "#fb923c",
    tlac3d: "#fb7185",
    algebra: "#c084fc",
    praktikum: "#facc15",
    uvod: "#2dd4bf"
};

function applyFlashcardSubjectTheme(subject) {
    const color = FLASHCARD_SUBJECT_COLORS[subject] || "#65d4f2";
    document.documentElement.style.setProperty("--flashcard-accent", color);
    document.body.setAttribute("data-flashcard-subject", subject);
}

let currentSubject = "linux";
let currentCards = [];
let currentIndex = 0;

const subjectSelect = document.getElementById("flashcardSubject");
const card = document.getElementById("flashcard");
const questionEl = document.getElementById("flashcardQuestion");
const answerEl = document.getElementById("flashcardAnswer");
const metaEl = document.getElementById("flashcardMeta");
const counterEl = document.getElementById("flashcardCounter");

function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function renderFlashcard() {
    const item = currentCards[currentIndex];
    card.classList.remove("flipped");
    questionEl.textContent = item[0];
    answerEl.textContent = item[1];
    metaEl.textContent = currentSubject.toUpperCase();
    counterEl.textContent = `${currentIndex + 1} / ${currentCards.length}`;
}

function loadSubject(subject) {
    currentSubject = subject;
    applyFlashcardSubjectTheme(subject);
    currentCards = [...FLASHCARD_DATA[subject]];
    currentIndex = 0;
    renderFlashcard();
}

Object.keys(FLASHCARD_DATA).forEach(key => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = key.toUpperCase() + " (" + FLASHCARD_DATA[key].length + ")";
    subjectSelect.appendChild(option);
});

subjectSelect.addEventListener("change", () => loadSubject(subjectSelect.value));
card.addEventListener("click", () => card.classList.toggle("flipped"));

document.getElementById("nextFlashcard").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % currentCards.length;
    renderFlashcard();
});

document.getElementById("prevFlashcard").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + currentCards.length) % currentCards.length;
    renderFlashcard();
});

document.getElementById("shuffleFlashcards").addEventListener("click", () => {
    currentCards = shuffleArray(currentCards);
    currentIndex = 0;
    renderFlashcard();
});

document.getElementById("resetFlashcards").addEventListener("click", () => loadSubject(currentSubject));

loadSubject("linux");
