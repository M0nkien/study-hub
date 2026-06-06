/*
    quiz-enhanced-template.js

    Toto je univerzálny vylepšený kvíz engine.
    Vie režimy:
    - Cvičenie: po kontrole ukáže správnu odpoveď a vysvetlenie.
    - Skúška: počas testu neukazuje správne odpovede, vyhodnotí až na konci.
    - Iba nesprávne: spustí test iba z otázok, ktoré si predtým pokazil.

    Dáta musia byť v premennej:
    const quizData = [
      {
        id: "test1",
        title: "Test 1",
        questions: [
          {
            text: "Otázka?",
            choose: 1,
            answers: [
              { text: "A", correct: true },
              { text: "B", correct: false }
            ],
            explanation: "Vysvetlenie"
          }
        ]
      }
    ];
*/

function createEnhancedQuiz(config) {
    const quizData = config.quizData;
    const storagePrefix = config.storagePrefix || "enhancedQuiz";

    let currentQuestions = [];
    let currentIndex = 0;
    let score = 0;
    let answered = false;
    let selectedAnswers = [];
    let mode = "practice";
    let currentSetId = "all";
    let currentWrongRecords = [];

    const setSelect = document.getElementById(config.setSelectId);
    const modeSelect = document.getElementById(config.modeSelectId);
    const shuffleSelect = document.getElementById(config.shuffleSelectId);
    const startBtn = document.getElementById(config.startBtnId);

    const box = document.getElementById(config.boxId);
    const feedback = document.getElementById(config.feedbackId);
    const currentEl = document.getElementById(config.currentId);
    const totalEl = document.getElementById(config.totalId);
    const scoreEl = document.getElementById(config.scoreId);
    const bestEl = document.getElementById(config.bestId);

    const checkBtn = document.getElementById(config.checkBtnId);
    const nextBtn = document.getElementById(config.nextBtnId);
    const prevBtn = document.getElementById(config.prevBtnId);
    const restartBtn = document.getElementById(config.restartBtnId);

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
            const temp = copy[i];
            copy[i] = copy[j];
            copy[j] = temp;
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
        if (!saved) {
            return [];
        }

        try {
            return JSON.parse(saved);
        } catch (error) {
            return [];
        }
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
        const keys = getWrongKeys().filter(function (item) {
            return item !== questionKey(question);
        });
        saveWrongKeys(keys);
    }

    function getAllQuestions() {
        let questions = [];

        quizData.forEach(function (test) {
            test.questions.forEach(function (question) {
                questions.push({
                    ...question,
                    sourceTitle: test.title,
                    sourceId: test.id
                });
            });
        });

        return questions;
    }

    function getQuestionsBySet(setId) {
        if (setId === "all") {
            return getAllQuestions();
        }

        const test = quizData.find(function (item) {
            return item.id === setId;
        });

        if (!test) {
            return getAllQuestions();
        }

        return test.questions.map(function (question) {
            return {
                ...question,
                sourceTitle: test.title,
                sourceId: test.id
            };
        });
    }

    function prepareQuestion(question, shuffleAnswers) {
        let answers = question.answers.map(function (answer, index) {
            return {
                ...answer,
                originalIndex: index
            };
        });

        if (shuffleAnswers) {
            answers = shuffleArray(answers);
        }

        return {
            ...question,
            answers: answers
        };
    }

    function getCorrectIndexes(question) {
        const indexes = [];

        question.answers.forEach(function (answer, index) {
            if (answer.correct) {
                indexes.push(index);
            }
        });

        return indexes;
    }

    function arraysEqualAsSets(a, b) {
        if (a.length !== b.length) {
            return false;
        }

        const aa = [...a].sort(function (x, y) { return x - y; });
        const bb = [...b].sort(function (x, y) { return x - y; });

        return aa.every(function (value, index) {
            return value === bb[index];
        });
    }

    function getBestScore() {
        const saved = localStorage.getItem(bestKey());
        return saved ? Number(saved) : 0;
    }

    function saveBestScore() {
        const best = getBestScore();

        if (score > best) {
            localStorage.setItem(bestKey(), score);
        }
    }

    function updateStats() {
        currentEl.textContent = Math.min(currentIndex + 1, currentQuestions.length);
        totalEl.textContent = currentQuestions.length;
        scoreEl.textContent = score;
        bestEl.textContent = getBestScore();
    }

    function buildExplanation(question) {
        const correctAnswers = question.answers
            .filter(function (answer) { return answer.correct; })
            .map(function (answer) { return answer.text; })
            .join(", ");

        return question.explanation || ("Správna odpoveď: " + correctAnswers);
    }

    function renderQuestion() {
        if (currentQuestions.length === 0) {
            box.innerHTML = `
                <div class="quiz-question-card quiz-finish">
                    <h3>Žiadne otázky</h3>
                    <p>Pre tento výber nie sú uložené žiadne otázky.</p>
                </div>
            `;
            checkBtn.disabled = true;
            nextBtn.disabled = true;
            prevBtn.disabled = true;
            updateStats();
            return;
        }

        const question = currentQuestions[currentIndex];
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
                <div class="linux-question-meta">${escapeHtml(question.sourceTitle || "")}</div>

                <h3>${escapeHtml(question.text)}</h3>

                <p class="linux-choice-info">
                    ${chooseCount > 1 ? "Vyber presne " + chooseCount + " odpovede." : "Vyber jednu odpoveď."}
                </p>

                <div class="quiz-options">
                    ${question.answers.map(function (option, index) {
                        return `
                            <button class="quiz-option" data-index="${index}">
                                <span>${String.fromCharCode(65 + index)}</span>
                                <p>${escapeHtml(option.text)}</p>
                            </button>
                        `;
                    }).join("")}
                </div>
            </div>
        `;

        const buttons = box.querySelectorAll(".quiz-option");

        buttons.forEach(function (button) {
            button.addEventListener("click", function () {
                if (answered) {
                    return;
                }

                const index = Number(button.dataset.index);

                if (chooseCount === 1) {
                    buttons.forEach(function (item) {
                        item.classList.remove("selected");
                    });

                    selectedAnswers = [index];
                    button.classList.add("selected");
                } else {
                    if (selectedAnswers.includes(index)) {
                        selectedAnswers = selectedAnswers.filter(function (item) {
                            return item !== index;
                        });
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
        const question = currentQuestions[currentIndex];
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

        if (answered) {
            return;
        }

        answered = true;

        const isCorrect = arraysEqualAsSets(selectedAnswers, correctIndexes);

        if (isCorrect) {
            score++;
            removeWrong(question);
        } else {
            addWrong(question);
            currentWrongRecords.push({
                question: question.text,
                correct: question.answers
                    .filter(function (answer) { return answer.correct; })
                    .map(function (answer) { return answer.text; })
                    .join(", ")
            });
        }

        const buttons = box.querySelectorAll(".quiz-option");

        buttons.forEach(function (button) {
            const index = Number(button.dataset.index);
            button.disabled = true;

            if (mode === "practice") {
                if (correctIndexes.includes(index)) {
                    button.classList.add("correct");
                }

                if (selectedAnswers.includes(index) && !correctIndexes.includes(index)) {
                    button.classList.add("wrong");
                }
            }
        });

        if (mode === "practice") {
            if (isCorrect) {
                feedback.className = "quiz-feedback success";
                feedback.innerHTML = `<strong>Správne.</strong><p>${escapeHtml(buildExplanation(question))}</p>`;
            } else {
                feedback.className = "quiz-feedback error";
                feedback.innerHTML = `<strong>Nesprávne.</strong><p>${escapeHtml(buildExplanation(question))}</p>`;
            }
        } else {
            feedback.className = isCorrect ? "quiz-feedback success" : "quiz-feedback error";
            feedback.innerHTML = isCorrect
                ? "<strong>Odpoveď zaznamenaná.</strong><p>Vyhodnotenie uvidíš až na konci skúšky.</p>"
                : "<strong>Odpoveď zaznamenaná.</strong><p>Vyhodnotenie uvidíš až na konci skúšky.</p>";
        }

        feedback.classList.remove("hidden");
        checkBtn.disabled = true;
        nextBtn.disabled = false;
        updateStats();
    }

    function nextQuestion() {
        if (currentIndex < currentQuestions.length - 1) {
            currentIndex++;
            renderQuestion();
        } else {
            finishQuiz();
        }
    }

    function previousQuestion() {
        if (currentIndex > 0) {
            currentIndex--;
            renderQuestion();
        }
    }

    function finishQuiz() {
        saveBestScore();

        const total = currentQuestions.length;
        const percent = total === 0 ? 0 : Math.round((score / total) * 100);
        const grade = percent >= 90 ? "A" : percent >= 80 ? "B" : percent >= 65 ? "C" : percent >= 50 ? "D" : "FX";

        box.innerHTML = `
            <div class="quiz-result-screen">
                <h3>Výsledok testu</h3>
                <p class="section-description">Test je dokončený. Tu máš vyhodnotenie.</p>

                <div class="quiz-result-grid">
                    <div class="quiz-result-card">
                        <span>Body</span>
                        <strong>${score} / ${total}</strong>
                    </div>

                    <div class="quiz-result-card">
                        <span>Percentá</span>
                        <strong>${percent}%</strong>
                    </div>

                    <div class="quiz-result-card">
                        <span>Známka</span>
                        <strong>${grade}</strong>
                    </div>

                    <div class="quiz-result-card">
                        <span>Nesprávne</span>
                        <strong>${currentWrongRecords.length}</strong>
                    </div>
                </div>

                <h4>Chybné otázky na zopakovanie</h4>

                <div class="wrong-list">
                    ${
                        currentWrongRecords.length === 0
                            ? "<p>Výborne, nemal si žiadnu chybu.</p>"
                            : currentWrongRecords.map(function (item) {
                                return `
                                    <div class="wrong-item">
                                        <strong>${escapeHtml(item.question)}</strong>
                                        <p>Správne: ${escapeHtml(item.correct)}</p>
                                    </div>
                                `;
                            }).join("")
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
        const shuffleMode = shuffleSelect.value;

        let questions = getQuestionsBySet(currentSetId);

        if (mode === "wrong") {
            const wrongKeys = getWrongKeys();
            questions = getAllQuestions().filter(function (question) {
                return wrongKeys.includes(questionKey(question));
            });
        }

        const shuffleQuestions = shuffleMode === "questions" || shuffleMode === "both";
        const shuffleAnswers = shuffleMode === "answers" || shuffleMode === "both";

        if (shuffleQuestions) {
            questions = shuffleArray(questions);
        }

        currentQuestions = questions.map(function (question) {
            return prepareQuestion(question, shuffleAnswers);
        });

        currentIndex = 0;
        score = 0;
        answered = false;
        selectedAnswers = [];
        currentWrongRecords = [];

        renderQuestion();
    }

    function fillSetSelect() {
        quizData.forEach(function (test) {
            const option = document.createElement("option");
            option.value = test.id;
            option.textContent = test.title + " (" + test.questions.length + " otázok)";
            setSelect.appendChild(option);
        });
    }

    fillSetSelect();

    startBtn.addEventListener("click", startQuiz);
    checkBtn.addEventListener("click", checkAnswer);
    nextBtn.addEventListener("click", nextQuestion);
    prevBtn.addEventListener("click", previousQuestion);
    restartBtn.addEventListener("click", startQuiz);

    startQuiz();
}
