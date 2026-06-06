const FLASHCARD_DATA = {
    linux: [
        ["Čo je chmod?", "Príkaz na zmenu práv súboru alebo adresára."],
        ["Čo robí grep?", "Vyhľadáva text alebo regulárny výraz v súbore alebo vstupe."],
        ["Čo znamená pipe | ?", "Presmeruje výstup jedného príkazu ako vstup do ďalšieho."],
        ["Čo je /etc/passwd?", "Súbor so základnými informáciami o používateľoch."],
        ["Čo robí tar -czf?", "Vytvorí komprimovaný tar.gz archív."]
    ],
    ccna: [
        ["Čo je default gateway?", "Adresa smerovača, cez ktorý ide komunikácia mimo lokálnej siete."],
        ["Čo je VLAN?", "Logické rozdelenie siete na samostatné broadcast domény."],
        ["Čo je trunk?", "Port, ktorý prenáša viac VLAN medzi switchmi alebo routerom a switchom."],
        ["Čo kontrolovať, keď nejde ping?", "IP, masku, gateway, VLAN, trunk, routing, DHCP a DNS."],
        ["Čo robí show ip interface brief?", "Zobrazí rozhrania, IP adresy a ich stav."]
    ],
    fyzika: [
        ["Vzorec pre kinetickú energiu", "Ek = 1/2 · m · v²"],
        ["Vzorec pre potenciálnu energiu", "Ep = m · g · h"],
        ["Steinerova veta", "I = I0 + m · d²"],
        ["Perióda matematického kyvadla", "T = 2π√(l/g)"],
        ["Čo je hmotný bod?", "Model telesa, pri ktorom zanedbáme rozmery."]
    ],
    mat: [
        ["Lineárna DR 1. rádu", "y' + p(x)y = q(x)"],
        ["Bernoulliho rovnica", "y' + p(x)y = q(x)y^n"],
        ["Separovateľná DR", "y' = f(x)g(y)"],
        ["Charakteristická rovnica", "Pre ay''+by'+cy=0 je ar²+br+c=0."],
        ["Kedy použiť Laplace?", "Pri DR so začiatočnými podmienkami y(0), y'(0)."]
    ],
    java: [
        ["Čo je trieda?", "Predpis na vytváranie objektov."],
        ["Čo je objekt?", "Konkrétna inštancia triedy."],
        ["Čo je dedičnosť?", "Mechanizmus, kde trieda preberá vlastnosti a metódy inej triedy."],
        ["Čo je polymorfizmus?", "Schopnosť pracovať s objektmi rôznych tried cez spoločné rozhranie alebo predka."],
        ["Čo je Javadoc?", "Dokumentácia generovaná z komentárov v Java kóde."]
    ],
    msd: [
        ["Čo je projekcia do bázy?", "Hľadanie najbližšej aproximácie dát v danom podpriestore."],
        ["Vzorec normálnych rovníc", "c = (XᵀX)^(-1)Xᵀy"],
        ["Chyba aproximácie", "√Σ(yᵢ - ŷᵢ)²"],
        ["Amplitúda Fourierovej zložky", "√(Re² + Im²)"],
        ["Momentová metóda", "Odhad parametrov cez teoretické a výberové momenty."]
    ],
    vvs: [
        ["Čo je PWM?", "Pulzno-šírková modulácia na riadenie výkonu, jasu LED alebo bzučiaka."],
        ["Čo je ADC?", "Analógovo-digitálny prevodník."],
        ["Čo je UART?", "Sériová komunikácia medzi zariadeniami."],
        ["Čo robí Timer?", "Spúšťa funkciu v čase alebo periodicky."],
        ["Čo je MicroPython?", "Verzia Pythonu pre mikrokontroléry."]
    ]
};

let currentSubject = "linux";
let currentCards = [];
let currentIndex = 0;
let flipped = false;

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
    flipped = false;
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
    option.textContent = key.toUpperCase();
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
