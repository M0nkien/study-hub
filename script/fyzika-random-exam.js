(function () {
    const TEST_SIZE = 5;
    const TEST_DURATION_SECONDS = 60 * 60;

    const questions = [
        {
            type: "Teória",
            cssClass: "theory-question",
            text: "Napíšte Keplerove zákony, Newtonov gravitačný zákon, intenzitu gravitačného poľa, prácu v gravitačnom poli a potenciál gravitačného poľa. Čo vyjadruje I. a II. kozmická rýchlosť?"
        },
        {
            type: "Teória",
            cssClass: "theory-question",
            text: "Napíšte vzťahy pre tangenciálne, normálové a celkové zrýchlenie a načrtnite ich na kružnici. Definujte uhlovú rýchlosť, uhlové zrýchlenie, periódu a frekvenciu."
        },
        {
            type: "Teória",
            cssClass: "theory-question",
            text: "Načrtnite polohový vektor ťažiska dvoch hmotných bodov. Napíšte vzťahy pre polohový vektor, rýchlosť a zrýchlenie ťažiska."
        },
        {
            type: "Odvodenie",
            cssClass: "derivation",
            text: "Odvoďte rovnice dráhy pohybu šikmého vrhu, maximálnu výšku a dolet."
        },
        {
            type: "Príklad",
            cssClass: "calculation-example",
            text: "Koleso otáčajúce sa rýchlosťou 500 ot/min sa vplyvom trenia zastaví, pričom vykoná ešte 500 otáčok. Za aký čas sa zastaví a aké bude jeho uhlové zrýchlenie?"
        },
        {
            type: "Teória",
            cssClass: "theory-question",
            text: "Napíšte Keplerove zákony a Newtonov gravitačný zákon. Vzťahom vyjadrite intenzitu gravitačného poľa, prácu v gravitačnom poli a potenciál gravitačného poľa."
        },
        {
            type: "Teória",
            cssClass: "theory-question",
            text: "Napíšte vzťahy pre polohový vektor, vektor rýchlosti a zrýchlenia. Definujte uhlovú rýchlosť a uhlové zrýchlenie a napíšte vektorové vzťahy medzi uhlovou a obvodovou rýchlosťou."
        },
        {
            type: "Teória",
            cssClass: "theory-question",
            text: "Napíšte pohybovú rovnicu harmonických tlmených kmitov a jej riešenie. Ukážte, čo je koeficient útlmu. Načrtnite časový priebeh tlmeného kmitu."
        },
        {
            type: "Odvodenie",
            cssClass: "derivation",
            text: "Odvoďte polohový vektor ťažiska sústavy hmotných bodov a tuhého telesa."
        },
        {
            type: "Príklad",
            cssClass: "calculation-example",
            text: "Hmotný bod koná pohyb po kružnici s polomerom R = 10 cm so stálym uhlovým zrýchlením 4 s⁻². Vypočítajte tangenciálne, normálové a celkové zrýchlenie na konci 5. sekundy."
        },
        {
            type: "Odvodenie",
            cssClass: "derivation",
            text: "Odvoďte I. kozmickú rýchlosť."
        },
        {
            type: "Teória",
            cssClass: "theory-question",
            text: "Charakterizujte silu kĺzavého trenia pre statické a dynamické trenie. Vysvetlite sily pôsobiace na naklonenej rovine a určovanie koeficientu trenia."
        },
        {
            type: "Teória",
            cssClass: "theory-question",
            text: "Načrtnite polohový vektor ťažiska dvoch hmotných bodov a vyjadrite ho vzťahom. Popíšte použité veličiny."
        },
        {
            type: "Odvodenie",
            cssClass: "derivation",
            text: "Odvoďte I. vetu impulzovú pre pohyb ťažiska."
        },
        {
            type: "Príklad",
            cssClass: "calculation-example",
            text: "Vozidlo z pôvodnej rýchlosti 90 km/h brzdilo podľa časovej závislosti v = v₀ − bt² a zastavilo za 16 s. Na akej dráhe zastavilo a akú maximálnu hodnotu zrýchlenia dosiahlo?"
        },
        {
            type: "Odvodenie",
            cssClass: "derivation",
            text: "Odvoďte pohybovú rovnicu harmonických tlmených kmitov a jej riešenie."
        },
        {
            type: "Teória",
            cssClass: "theory-question",
            text: "Napíšte Bernoulliho rovnicu, vysvetlite veličiny a uveďte aspoň 2 príklady využitia Bernoulliho rovnice v praxi."
        },
        {
            type: "Odvodenie",
            cssClass: "derivation",
            text: "Odvoďte Bernoulliho rovnicu."
        },
        {
            type: "Odvodenie",
            cssClass: "derivation",
            text: "Odvoďte Steinerovu vetu."
        },
        {
            type: "Odvodenie",
            cssClass: "derivation",
            text: "Odvoďte vzťahy pre kinetickú energiu translačného a rotačného pohybu tuhého telesa."
        },
        {
            type: "Odvodenie",
            cssClass: "derivation",
            text: "Odvoďte amplitúdu vynútených kmitov a podmienku rezonancie. Charakterizujte rezonanciu."
        },
        { 
            type: "Teória", 
            cssClass: "theory-question", 
            text: "Vysvetlite rozdiel medzi hydrostatikou a hydrodynamikou. Čo znamená, že ideálna kvapalina je nestlačiteľná?" },
        { 
            type: "Teória", 
            cssClass: "theory-question", 
            text: "Napíšte hydrostatický tlak a vysvetlite, prečo tlak v kvapaline rastie s hĺbkou." 
        },
        { 
            type: "Odvodenie", 
            cssClass: "derivation", 
            text: "Odvoďte rovnicu kontinuity pre nestlačiteľnú kvapalinu." 
        },
        { 
            type: "Teória", 
            cssClass: "theory-question", 
            text: "Vysvetlite rozdiel medzi laminárnym a turbulentným prúdením." 
        },
        { type: "Teória", 
            cssClass: "theory-question", 
            text: "Vysvetlite pojem viskozita a čo vyjadruje dynamická viskozita η." 
        },
        { type: "Teória", 
            cssClass: "theory-question", 
            text: "Vysvetlite povrchové napätie a uveďte príklady z praxe." 
        },
        { type: "Teória", 
            cssClass: "theory-question", 
            text: "Vysvetlite krivku deformácie a rozdiel medzi pružnou a plastickou oblasťou." },
        { type: "Odvodenie", 
            cssClass: "derivation", 
            text: "Odvoďte pohybovú rovnicu otáčavého pohybu tuhého telesa M = Jε." 
        },
        { type: "Teória", 
            cssClass: "theory-question", 
            text: "Vysvetlite fyzikálny význam rezonancie a vplyv tlmenia na rezonančnú krivku." 
        }
    ];

    let selectedQuestions = [];
    let remainingSeconds = TEST_DURATION_SECONDS;
    let timerInterval = null;

    const examList = document.getElementById("physicsRandomExamList");
    const timerElement = document.getElementById("physicsExamTimer");
    const resultElement = document.getElementById("physicsExamResult");

    const generateBtn = document.getElementById("generatePhysicsExamBtn");
    const startBtn = document.getElementById("startPhysicsExamTimerBtn");
    const stopBtn = document.getElementById("stopPhysicsExamTimerBtn");
    const resetBtn = document.getElementById("resetPhysicsExamTimerBtn");
    const finishBtn = document.getElementById("finishPhysicsExamBtn");

    if (!examList || !timerElement || !generateBtn || !startBtn || !stopBtn || !resetBtn || !finishBtn) {
        return;
    }

    function shuffleArray(array) {
        const copy = array.slice();

        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = copy[i];
            copy[i] = copy[j];
            copy[j] = temp;
        }

        return copy;
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const restSeconds = seconds % 60;

        return String(minutes).padStart(2, "0") + ":" + String(restSeconds).padStart(2, "0");
    }

    function updateTimerView() {
        timerElement.textContent = formatTime(remainingSeconds);

        if (remainingSeconds <= 5 * 60) {
            timerElement.classList.add("is-warning");
        } else {
            timerElement.classList.remove("is-warning");
        }
    }

    function stopTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }

    function resetTimer() {
        stopTimer();
        remainingSeconds = TEST_DURATION_SECONDS;
        updateTimerView();
    }

    function startTimer() {
        if (timerInterval) {
            return;
        }

        timerInterval = setInterval(function () {
            remainingSeconds--;

            updateTimerView();

            if (remainingSeconds <= 0) {
                stopTimer();
                remainingSeconds = 0;
                updateTimerView();
                finishExam(true);
            }
        }, 1000);
    }

    function generateExam() {
        stopTimer();
        remainingSeconds = TEST_DURATION_SECONDS;
        updateTimerView();

        selectedQuestions = shuffleArray(questions).slice(0, TEST_SIZE);

        let html = "";

        selectedQuestions.forEach(function (question, index) {
            const number = index + 1;

            html += `
                <article class="written-task ${question.cssClass} random-exam-task">
                    <span>${number}</span>

                    <div class="random-exam-question-content">
                        <div class="random-exam-type">${question.type}</div>
                        <p>${question.text}</p>

                        <div class="self-check">
                            <p>Ako si to vedel?</p>

                            <label>
                                <input type="radio" name="physics-self-${index}" value="2">
                                Vedel som celé
                            </label>

                            <label>
                                <input type="radio" name="physics-self-${index}" value="1">
                                Vedel som čiastočne
                            </label>

                            <label>
                                <input type="radio" name="physics-self-${index}" value="0">
                                Nevedel som
                            </label>
                        </div>
                    </div>
                </article>
            `;
        });

        examList.innerHTML = html;

        if (resultElement) {
            resultElement.innerHTML = "";
            resultElement.classList.remove("is-visible");
        }
    }

    function finishExam(timeEnded) {
        let score = 0;
        let answered = 0;

        selectedQuestions.forEach(function (_, index) {
            const checked = document.querySelector(`input[name="physics-self-${index}"]:checked`);

            if (checked) {
                score += Number(checked.value);
                answered++;
            }
        });

        const maxScore = TEST_SIZE * 2;
        const percent = Math.round((score / maxScore) * 100);

        let message = "";

        if (percent >= 85) {
            message = "Výborne. Vyzerá to, že si na skúšku pripravený veľmi dobre.";
        } else if (percent >= 65) {
            message = "Celkom dobré. Ešte si prejdi otázky, ktoré si vedel iba čiastočne.";
        } else if (percent >= 40) {
            message = "Treba ešte potrénovať. Zameraj sa hlavne na odvodenia a vzorce.";
        } else {
            message = "Ešte sa neuč podľa pocitu, ale podľa okruhov. Skús najprv teóriu, potom odvodenia a až potom príklady.";
        }

        if (resultElement) {
            resultElement.classList.add("is-visible");
            resultElement.innerHTML = `
                <strong>${timeEnded ? "Čas vypršal." : "Test vyhodnotený."}</strong>
                <p>Označené otázky: ${answered}/${TEST_SIZE}</p>
                <p>Skóre prípravy: ${score}/${maxScore} bodov (${percent} %)</p>
                <p>${message}</p>
            `;
        }

        try {
            const historyItem = {
                date: new Date().toISOString(),
                score: score,
                maxScore: maxScore,
                percent: percent,
                questions: selectedQuestions.map(function (question) {
                    return question.text;
                })
            };

            const oldHistory = JSON.parse(localStorage.getItem("studyHubPhysicsRandomExamHistory") || "[]");
            oldHistory.push(historyItem);
            localStorage.setItem("studyHubPhysicsRandomExamHistory", JSON.stringify(oldHistory.slice(-10)));
        } catch (error) {
            console.warn("Nepodarilo sa uložiť históriu testu.", error);
        }
    }

    generateBtn.addEventListener("click", generateExam);
    startBtn.addEventListener("click", startTimer);
    stopBtn.addEventListener("click", stopTimer);
    resetBtn.addEventListener("click", resetTimer);
    finishBtn.addEventListener("click", function () {
        finishExam(false);
    });

    generateExam();
})();