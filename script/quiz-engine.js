// Univerzálny kvíz engine: cvičenie, skúška, iba nesprávne otázky, časovač a história výsledkov

function createQuiz(config) {
    const quizData = config.quizData;
    const prefix = config.prefix;
    const storagePrefix = config.storagePrefix;

    const EXAM_MINUTES = {
        linuxQuiz: 35,
        ccnaQuiz: 30,
        msdQuiz: 20,
        fyzikaQuiz: 15
    };

    let questions = [];
    let currentIndex = 0;
    let score = 0;
    let answered = false;
    let selectedAnswers = [];
    let mode = "practice";
    let currentSetId = "all";
    let wrongRecords = [];
    let examTimer = null;
    let remainingSeconds = 0;
    let startedAt = null;

    const setSelect = document.getElementById(prefix + "Set");
    const modeSelect = document.getElementById(prefix + "Mode");
    const shuffleSelect = document.getElementById(prefix + "Shuffle");
    const startBtn = document.getElementById(prefix + "Start");

    const box = document.getElementById(prefix + "Box");
    const feedback = document.getElementById(prefix + "Feedback");
    const currentEl = document.getElementById(prefix + "Current");
    const totalEl = document.getElementById(prefix + "Total");
    const scoreEl = document.getElementById(prefix + "Score");
    const bestEl = document.getElementById(prefix + "Best");

    const checkBtn = document.getElementById(prefix + "Check");
    const nextBtn = document.getElementById(prefix + "Next");
    const prevBtn = document.getElementById(prefix + "Prev");
    const restartBtn = document.getElementById(prefix + "Restart");

    const quizPanel = box?.closest(".quiz-panel");
    let timerEl = null;

    if (quizPanel && !document.getElementById(prefix + "TimerBox")) {
        const timerBox = document.createElement("div");
        timerBox.className = "quiz-timer hidden";
        timerBox.id = prefix + "TimerBox";
        timerBox.innerHTML = `<span>Čas skúšky</span><strong id="${prefix}Timer">00:00</strong>`;
        const top = quizPanel.querySelector(".quiz-top");
        top?.insertAdjacentElement("beforebegin", timerBox);
        timerEl = document.getElementById(prefix + "Timer");
    } else {
        timerEl = document.getElementById(prefix + "Timer");
    }

    function escapeHtml(value) {
        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function shuffleArray(array) {
        const copy = [...array];

        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }

        return copy;
    }

    function questionKey(question) {
        return question.sourceId + "::" + question.text;
    }

    function wrongKey() {
        return storagePrefix + "_wrong";
    }

    function bestKey() {
        return storagePrefix + "_best_" + currentSetId + "_" + mode;
    }

    function getWrongKeys() {
        const saved = localStorage.getItem(wrongKey());
        if (!saved) return [];
        try { return JSON.parse(saved); } catch { return []; }
    }

    function saveWrongKeys(keys) {
        localStorage.setItem(wrongKey(), JSON.stringify([...new Set(keys)]));
    }

    function addWrong(question) {
        const keys = getWrongKeys();
        keys.push(questionKey(question));
        saveWrongKeys(keys);
    }

    function removeWrong(question) {
        const keys = getWrongKeys().filter(item => item !== questionKey(question));
        saveWrongKeys(keys);
    }

    function getAllQuestions() {
        let all = [];

        quizData.forEach(test => {
            test.questions.forEach(question => {
                all.push({
                    ...question,
                    sourceTitle: test.title,
                    sourceId: test.id
                });
            });
        });

        return all;
    }

    function getQuestionsBySet(setId) {
        if (setId === "all") return getAllQuestions();

        const test = quizData.find(item => item.id === setId);
        if (!test) return getAllQuestions();

        return test.questions.map(question => ({
            ...question,
            sourceTitle: test.title,
            sourceId: test.id
        }));
    }

    function prepareQuestion(question, shuffleAnswers) {
        let answers = question.answers.map((answer, index) => ({
            ...answer,
            originalIndex: index
        }));

        if (shuffleAnswers) answers = shuffleArray(answers);

        return { ...question, answers };
    }

    function getCorrectIndexes(question) {
        const indexes = [];
        question.answers.forEach((answer, index) => {
            if (answer.correct) indexes.push(index);
        });
        return indexes;
    }

    function sameSet(a, b) {
        if (a.length !== b.length) return false;
        const aa = [...a].sort((x, y) => x - y);
        const bb = [...b].sort((x, y) => x - y);
        return aa.every((value, index) => value === bb[index]);
    }

    function getBestScore() {
        const saved = localStorage.getItem(bestKey());
        return saved ? Number(saved) : 0;
    }

    function saveBestScore() {
        const best = getBestScore();
        if (score > best) localStorage.setItem(bestKey(), score);
    }

    function updateStats() {
        currentEl.textContent = Math.min(currentIndex + 1, questions.length);
        totalEl.textContent = questions.length;
        scoreEl.textContent = score;
        bestEl.textContent = getBestScore();
    }

    function buildExplanation(question) {
        const correctAnswers = question.answers
            .filter(answer => answer.correct)
            .map(answer => answer.text)
            .join(", ");

        return question.explanation || ("Správna odpoveď: " + correctAnswers);
    }

    function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
    }

    function stopTimer() {
        if (examTimer) {
            clearInterval(examTimer);
            examTimer = null;
        }
    }

    function startTimerIfNeeded() {
        stopTimer();

        const timerBox = document.getElementById(prefix + "TimerBox");
        if (mode !== "exam") {
            timerBox?.classList.add("hidden");
            return;
        }

        const minutes = EXAM_MINUTES[storagePrefix] || 25;
        remainingSeconds = minutes * 60;

        timerBox?.classList.remove("hidden");
        if (timerEl) timerEl.textContent = formatTime(remainingSeconds);

        examTimer = setInterval(() => {
            remainingSeconds--;
            if (timerEl) timerEl.textContent = formatTime(Math.max(0, remainingSeconds));

            if (remainingSeconds <= 0) {
                stopTimer();
                finishQuiz(true);
            }
        }, 1000);
    }

    function saveResult(percent, grade, timedOut) {
        const key = "studyHubQuizResults";
        const saved = localStorage.getItem(key);
        let results = [];

        try { results = saved ? JSON.parse(saved) : []; } catch { results = []; }

        const selectedOption = setSelect.options[setSelect.selectedIndex];
        results.unshift({
            subject: storagePrefix.replace("Quiz", "").toUpperCase(),
            setId: currentSetId,
            testTitle: selectedOption ? selectedOption.textContent : currentSetId,
            mode,
            score,
            total: questions.length,
            percent,
            grade,
            wrong: wrongRecords.length,
            timedOut: !!timedOut,
            date: new Date().toISOString(),
            durationSeconds: startedAt ? Math.round((Date.now() - startedAt) / 1000) : null
        });

        localStorage.setItem(key, JSON.stringify(results.slice(0, 50)));
    }

    function renderQuestion() {
        if (questions.length === 0) {
            box.innerHTML = `
                <div class="quiz-question-card">
                    <h3>Žiadne otázky</h3>
                    <p>Pre tento výber nie sú otázky. Ak si zvolil „iba nesprávne“, najprv musíš niečo pokaziť v cvičení alebo skúške.</p>
                </div>
            `;
            checkBtn.disabled = true;
            nextBtn.disabled = true;
            prevBtn.disabled = true;
            updateStats();
            return;
        }

        const question = questions[currentIndex];
        const correctCount = getCorrectIndexes(question).length;
        const chooseCount = question.choose || correctCount;

        answered = false;
        selectedAnswers = [];

        feedback.classList.add("hidden");
        feedback.textContent = "";

        checkBtn.disabled = false;
        nextBtn.disabled = true;
        prevBtn.disabled = currentIndex === 0;

        box.innerHTML = `
            <div class="quiz-question-card">
                <div class="quiz-meta">${escapeHtml(question.sourceTitle || "")}</div>
                <h3>${escapeHtml(question.text)}</h3>
                <p class="choice-info">${chooseCount > 1 ? "Vyber presne " + chooseCount + " odpovede." : "Vyber jednu odpoveď."}</p>

                <div class="quiz-options">
                    ${question.answers.map((option, index) => `
                        <button class="quiz-option" data-index="${index}">
                            <span>${String.fromCharCode(65 + index)}</span>
                            <p>${escapeHtml(option.text)}</p>
                        </button>
                    `).join("")}
                </div>
            </div>
        `;

        const buttons = box.querySelectorAll(".quiz-option");

        buttons.forEach(button => {
            button.addEventListener("click", function () {
                if (answered) return;

                const index = Number(button.dataset.index);

                if (chooseCount === 1) {
                    buttons.forEach(item => item.classList.remove("selected"));
                    selectedAnswers = [index];
                    button.classList.add("selected");
                } else {
                    if (selectedAnswers.includes(index)) {
                        selectedAnswers = selectedAnswers.filter(item => item !== index);
                        button.classList.remove("selected");
                    } else {
                        if (selectedAnswers.length >= chooseCount) {
                            feedback.className = "quiz-feedback warning";
                            feedback.textContent = "Pri tejto otázke môžeš vybrať iba " + chooseCount + " odpovede.";
                            feedback.classList.remove("hidden");
                            return;
                        }
                        selectedAnswers.push(index);
                        button.classList.add("selected");
                    }
                }
            });
        });

        updateStats();
    }

    function checkAnswer() {
        const question = questions[currentIndex];
        const correctIndexes = getCorrectIndexes(question);
        const chooseCount = question.choose || correctIndexes.length;

        if (selectedAnswers.length === 0) {
            feedback.className = "quiz-feedback warning";
            feedback.textContent = "Najprv vyber odpoveď.";
            feedback.classList.remove("hidden");
            return;
        }

        if (selectedAnswers.length !== chooseCount) {
            feedback.className = "quiz-feedback warning";
            feedback.textContent = "Pri tejto otázke musíš vybrať presne " + chooseCount + " odpovede.";
            feedback.classList.remove("hidden");
            return;
        }

        if (answered) return;

        answered = true;

        const isCorrect = sameSet(selectedAnswers, correctIndexes);

        if (isCorrect) {
            score++;
            removeWrong(question);
        } else {
            addWrong(question);
            wrongRecords.push({
                question: question.text,
                correct: question.answers.filter(answer => answer.correct).map(answer => answer.text).join(", ")
            });
        }

        const buttons = box.querySelectorAll(".quiz-option");

        buttons.forEach(button => {
            const index = Number(button.dataset.index);
            button.disabled = true;

            if (mode === "practice") {
                if (correctIndexes.includes(index)) button.classList.add("correct");
                if (selectedAnswers.includes(index) && !correctIndexes.includes(index)) button.classList.add("wrong");
            }
        });

        if (mode === "practice") {
            feedback.className = isCorrect ? "quiz-feedback success" : "quiz-feedback error";
            feedback.innerHTML = `<strong>${isCorrect ? "Správne." : "Nesprávne."}</strong><p>${escapeHtml(buildExplanation(question))}</p>`;
        } else {
            feedback.className = isCorrect ? "quiz-feedback success" : "quiz-feedback error";
            feedback.innerHTML = "<strong>Odpoveď zaznamenaná.</strong><p>Vyhodnotenie uvidíš až na konci testu.</p>";
        }

        feedback.classList.remove("hidden");
        checkBtn.disabled = true;
        nextBtn.disabled = false;
        updateStats();
    }

    function nextQuestion() {
        if (currentIndex < questions.length - 1) {
            currentIndex++;
            renderQuestion();
        } else {
            finishQuiz(false);
        }
    }

    function previousQuestion() {
        if (currentIndex > 0) {
            currentIndex--;
            renderQuestion();
        }
    }

    function finishQuiz(timedOut) {
        stopTimer();
        saveBestScore();

        const total = questions.length;
        const percent = total === 0 ? 0 : Math.round((score / total) * 100);
        const grade = percent >= 90 ? "A" : percent >= 80 ? "B" : percent >= 65 ? "C" : percent >= 50 ? "D" : "FX";

        saveResult(percent, grade, timedOut);

        box.innerHTML = `
            <div class="quiz-result-screen">
                <h3>${timedOut ? "Čas vypršal" : "Výsledok testu"}</h3>
                <p class="section-description">Test je dokončený. Výsledok sa uložil do stránky Výsledky.</p>

                <div class="quiz-result-grid">
                    <div class="quiz-result-card"><span>Body</span><strong>${score} / ${total}</strong></div>
                    <div class="quiz-result-card"><span>Percentá</span><strong>${percent}%</strong></div>
                    <div class="quiz-result-card"><span>Známka</span><strong>${grade}</strong></div>
                    <div class="quiz-result-card"><span>Nesprávne</span><strong>${wrongRecords.length}</strong></div>
                </div>

                <h4>Chybné otázky na zopakovanie</h4>

                <div class="wrong-list">
                    ${
                        wrongRecords.length === 0
                            ? "<p>Výborne, nemal si žiadnu chybu.</p>"
                            : wrongRecords.map(item => `
                                <div class="wrong-item">
                                    <strong>${escapeHtml(item.question)}</strong>
                                    <p>Správne: ${escapeHtml(item.correct)}</p>
                                </div>
                            `).join("")
                    }
                </div>
            </div>
        `;

        feedback.classList.add("hidden");
        checkBtn.disabled = true;
        nextBtn.disabled = true;
        prevBtn.disabled = true;
        updateStats();
    }

    function startQuiz() {
        currentSetId = setSelect.value;
        mode = modeSelect.value;
        startedAt = Date.now();

        const shuffleMode = shuffleSelect.value;

        let selectedQuestions = getQuestionsBySet(currentSetId);

        if (mode === "wrong") {
            const wrongKeys = JSON.parse(localStorage.getItem(storagePrefix + "_wrong") || "[]");
            selectedQuestions = getAllQuestions().filter(question => wrongKeys.includes(questionKey(question)));
        }

        const shuffleQuestions = shuffleMode === "questions" || shuffleMode === "both" || mode === "exam";
        const shuffleAnswers = shuffleMode === "answers" || shuffleMode === "both" || mode === "exam";

        if (shuffleQuestions) selectedQuestions = shuffleArray(selectedQuestions);

        // skúška má max 25 otázok, ak ich je viac
        if (mode === "exam" && selectedQuestions.length > 25) {
            selectedQuestions = selectedQuestions.slice(0, 25);
        }

        questions = selectedQuestions.map(question => prepareQuestion(question, shuffleAnswers));
        currentIndex = 0;
        score = 0;
        answered = false;
        selectedAnswers = [];
        wrongRecords = [];

        startTimerIfNeeded();
        renderQuestion();
    }

    function fillSelects() {
        quizData.forEach(test => {
            const option = document.createElement("option");
            option.value = test.id;
            option.textContent = test.title + " (" + test.questions.length + " otázok)";
            setSelect.appendChild(option);
        });
    }

    fillSelects();

    startBtn.addEventListener("click", startQuiz);
    checkBtn.addEventListener("click", checkAnswer);
    nextBtn.addEventListener("click", nextQuestion);
    prevBtn.addEventListener("click", previousQuestion);
    restartBtn.addEventListener("click", startQuiz);

    startQuiz();
}
