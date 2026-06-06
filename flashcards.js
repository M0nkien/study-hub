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
        ["Najčastejšia chyba vo fyzike", "Zlé jednotky: cm treba prepočítať na m, g na kg, mm na m."]
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
    ]
};

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
