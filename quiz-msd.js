const msdQuizData = [
    {
        "id": "msd-zadania",
        "title": "MSD – zadania a teória",
        "questions": [
            {
                "text": "Čo má obsahovať časový rad v zadaní Z1?",
                "choose": 1,
                "answers": [
                    {
                        "text": "V stĺpci A dátum/čas a v stĺpci B číselné hodnoty.",
                        "correct": true
                    },
                    {
                        "text": "Iba graf bez tabuľky.",
                        "correct": false
                    },
                    {
                        "text": "Iba náhodné hodnoty bez časového poradia.",
                        "correct": false
                    },
                    {
                        "text": "Textové poznámky bez čísel.",
                        "correct": false
                    }
                ],
                "explanation": "Z1 vyžaduje časové alebo dátumové údaje v stĺpci A a číselné hodnoty v stĺpci B."
            },
            {
                "text": "Aký je vzorec koeficientu pri priemete na jeden bázový vektor b?",
                "choose": 1,
                "answers": [
                    {
                        "text": "c = <y,b> / <b,b>",
                        "correct": true
                    },
                    {
                        "text": "c = <b,b> / <y,b>",
                        "correct": false
                    },
                    {
                        "text": "c = y + b",
                        "correct": false
                    },
                    {
                        "text": "c = y / b",
                        "correct": false
                    }
                ],
                "explanation": "Pri kolmóm priemete na jeden vektor sa používa skalárny súčin."
            },
            {
                "text": "Aký model zodpovedá báze B2 = (1, t)?",
                "choose": 1,
                "answers": [
                    {
                        "text": "y(t) = c0 + c1t",
                        "correct": true
                    },
                    {
                        "text": "y(t) = c0 + c1t + c2t²",
                        "correct": false
                    },
                    {
                        "text": "y(t) = c0 + c1√t + c2/t",
                        "correct": false
                    },
                    {
                        "text": "y(t) = e^t",
                        "correct": false
                    }
                ],
                "explanation": "B2 obsahuje konštantný a lineárny člen."
            },
            {
                "text": "Aký model zodpovedá báze B3 = (1, t, t²)?",
                "choose": 1,
                "answers": [
                    {
                        "text": "Kvadratický model y(t)=c0+c1t+c2t²",
                        "correct": true
                    },
                    {
                        "text": "Iba konštantný model",
                        "correct": false
                    },
                    {
                        "text": "Exponenciálny model",
                        "correct": false
                    },
                    {
                        "text": "Geometrické rozdelenie",
                        "correct": false
                    }
                ],
                "explanation": "B3 má tri bázové vektory: 1, t, t²."
            },
            {
                "text": "Ktorá aproximácia je lepšia?",
                "choose": 1,
                "answers": [
                    {
                        "text": "Tá, ktorá má menšiu chybu.",
                        "correct": true
                    },
                    {
                        "text": "Tá, ktorá má väčšiu chybu.",
                        "correct": false
                    },
                    {
                        "text": "Vždy tá s menším počtom koeficientov.",
                        "correct": false
                    },
                    {
                        "text": "Vždy tá s väčším počtom grafov.",
                        "correct": false
                    }
                ],
                "explanation": "Chyba sa počíta z rezíduí. Menšia chyba znamená lepšiu aproximáciu."
            },
            {
                "text": "Ako sa počíta chyba aproximácie?",
                "choose": 1,
                "answers": [
                    {
                        "text": "√Σ(yᵢ - ŷᵢ)²",
                        "correct": true
                    },
                    {
                        "text": "Σyᵢ",
                        "correct": false
                    },
                    {
                        "text": "max - min",
                        "correct": false
                    },
                    {
                        "text": "počet dát / priemer",
                        "correct": false
                    }
                ],
                "explanation": "Používa sa norma reziduálneho vektora."
            },
            {
                "text": "Aký je vzorec normálnych rovníc pre regresiu?",
                "choose": 1,
                "answers": [
                    {
                        "text": "c = (XᵀX)^(-1)Xᵀy",
                        "correct": true
                    },
                    {
                        "text": "c = X + y",
                        "correct": false
                    },
                    {
                        "text": "c = X/y",
                        "correct": false
                    },
                    {
                        "text": "c = y²",
                        "correct": false
                    }
                ],
                "explanation": "Toto je maticový tvar metódy najmenších štvorcov."
            },
            {
                "text": "Na čo slúži Fourierova transformácia?",
                "choose": 1,
                "answers": [
                    {
                        "text": "Na rozklad dát na frekvenčné zložky.",
                        "correct": true
                    },
                    {
                        "text": "Na zoradenie dát podľa abecedy.",
                        "correct": false
                    },
                    {
                        "text": "Na mazanie trendu bez výpočtu.",
                        "correct": false
                    },
                    {
                        "text": "Na výpočet iba minima a maxima.",
                        "correct": false
                    }
                ],
                "explanation": "Fourierova transformácia ukáže, ktoré frekvencie sú v dátach výrazné."
            },
            {
                "text": "Ako sa počíta amplitúda Fourierovej zložky?",
                "choose": 1,
                "answers": [
                    {
                        "text": "√(Re² + Im²)",
                        "correct": true
                    },
                    {
                        "text": "Re + Im",
                        "correct": false
                    },
                    {
                        "text": "Re - Im",
                        "correct": false
                    },
                    {
                        "text": "Re / Im",
                        "correct": false
                    }
                ],
                "explanation": "Amplitúda je veľkosť komplexnej zložky."
            },
            {
                "text": "Čo sa robí v zadaní Z7?",
                "choose": 1,
                "answers": [
                    {
                        "text": "Hľadajú sa náhodné reálne dáta, ktoré nie sú časovým radom.",
                        "correct": true
                    },
                    {
                        "text": "Hľadá sa iba časový rad.",
                        "correct": false
                    },
                    {
                        "text": "Hľadajú sa iba celé čísla 0 až 9.",
                        "correct": false
                    },
                    {
                        "text": "Robí sa iba graf bez výpočtov.",
                        "correct": false
                    }
                ],
                "explanation": "Z7 je pre náhodné reálne hodnoty, nie pre časový rad."
            },
            {
                "text": "Čo má byť v bunke C2 v zadaní Z7?",
                "choose": 1,
                "answers": [
                    {
                        "text": "Pravdepodobnosť, že hodnota je väčšia ako aritmetický priemer.",
                        "correct": true
                    },
                    {
                        "text": "Maximum dát.",
                        "correct": false
                    },
                    {
                        "text": "Minimum dát.",
                        "correct": false
                    },
                    {
                        "text": "Medián dát.",
                        "correct": false
                    }
                ],
                "explanation": "Počíta sa relatívna početnosť hodnôt väčších ako priemer."
            },
            {
                "text": "Čo robí transformácia v Z8?",
                "choose": 1,
                "answers": [
                    {
                        "text": "Prevádza reálne hodnoty na triedy 0 až 9.",
                        "correct": true
                    },
                    {
                        "text": "Prevádza hodnoty na dátumy.",
                        "correct": false
                    },
                    {
                        "text": "Vynásobí všetko nulou.",
                        "correct": false
                    },
                    {
                        "text": "Vymaže desatinné čísla bez škálovania.",
                        "correct": false
                    }
                ],
                "explanation": "Pomocou minima a maxima sa hodnoty škálujú na 0 až 9."
            },
            {
                "text": "Ako sa odhadne P(X = xi) pri diskrétnej náhodnej premennej?",
                "choose": 1,
                "answers": [
                    {
                        "text": "Početnosť xi / celkový počet hodnôt.",
                        "correct": true
                    },
                    {
                        "text": "xi / maximum.",
                        "correct": false
                    },
                    {
                        "text": "Priemer / xi.",
                        "correct": false
                    },
                    {
                        "text": "max - min.",
                        "correct": false
                    }
                ],
                "explanation": "Pravdepodobnosť sa odhaduje relatívnou početnosťou."
            },
            {
                "text": "Ako sa počíta stredná hodnota diskrétnej premennej?",
                "choose": 1,
                "answers": [
                    {
                        "text": "E(X) = Σ xi · P(X=xi)",
                        "correct": true
                    },
                    {
                        "text": "E(X)=max-min",
                        "correct": false
                    },
                    {
                        "text": "E(X)=počet riadkov",
                        "correct": false
                    },
                    {
                        "text": "E(X)=ΣP bez xi",
                        "correct": false
                    }
                ],
                "explanation": "Je to vážený priemer hodnôt podľa pravdepodobností."
            },
            {
                "text": "Ako vznikne V2 v zadaní Z9?",
                "choose": 1,
                "answers": [
                    {
                        "text": "Ku každej hodnote V1 sa pripočíta 1.",
                        "correct": true
                    },
                    {
                        "text": "Od každej hodnoty V1 sa odpočíta 1.",
                        "correct": false
                    },
                    {
                        "text": "Každá hodnota sa vynásobí 10.",
                        "correct": false
                    },
                    {
                        "text": "Vezmú sa len párne hodnoty.",
                        "correct": false
                    }
                ],
                "explanation": "V2 má hodnoty z množiny 1 až 10."
            },
            {
                "text": "Aký je odhad λ pre Poissonovo rozdelenie momentovou metódou?",
                "choose": 1,
                "answers": [
                    {
                        "text": "λ = priemer dát",
                        "correct": true
                    },
                    {
                        "text": "λ = maximum dát",
                        "correct": false
                    },
                    {
                        "text": "λ = minimum dát",
                        "correct": false
                    },
                    {
                        "text": "λ = 1/maximum",
                        "correct": false
                    }
                ],
                "explanation": "Pre Poissonovo rozdelenie platí E(X)=λ."
            },
            {
                "text": "Aký je odhad λ pre exponenciálne rozdelenie Exp(λ)?",
                "choose": 1,
                "answers": [
                    {
                        "text": "λ = 1/priemer",
                        "correct": true
                    },
                    {
                        "text": "λ = priemer",
                        "correct": false
                    },
                    {
                        "text": "λ = maximum",
                        "correct": false
                    },
                    {
                        "text": "λ = rozptyl + 1",
                        "correct": false
                    }
                ],
                "explanation": "Pre exponenciálne rozdelenie platí E(X)=1/λ."
            },
            {
                "text": "Ako sa určia parametre normálneho rozdelenia N(μ,σ²)?",
                "choose": 1,
                "answers": [
                    {
                        "text": "μ = priemer, σ² = rozptyl",
                        "correct": true
                    },
                    {
                        "text": "μ = maximum, σ² = minimum",
                        "correct": false
                    },
                    {
                        "text": "μ = počet hodnôt, σ² = súčet",
                        "correct": false
                    },
                    {
                        "text": "μ = 0, σ² = 1 vždy",
                        "correct": false
                    }
                ],
                "explanation": "Momentová metóda pre normálne rozdelenie používa priemer a rozptyl."
            },
            {
                "text": "Čo znamená metóda maximálnej vierohodnosti?",
                "choose": 1,
                "answers": [
                    {
                        "text": "Vyberá model, pri ktorom sú pozorované dáta najpravdepodobnejšie.",
                        "correct": true
                    },
                    {
                        "text": "Vyberá vždy najjednoduchší model.",
                        "correct": false
                    },
                    {
                        "text": "Vyberá model podľa názvu.",
                        "correct": false
                    },
                    {
                        "text": "Nepoužíva pravdepodobnosti.",
                        "correct": false
                    }
                ],
                "explanation": "Porovnávajú sa vierohodnosti modelov."
            },
            {
                "text": "Ktoré rozdelenia sa porovnávajú v Z10?",
                "choose": 1,
                "answers": [
                    {
                        "text": "R(a,b), Exp(λ), N(μ,σ²)",
                        "correct": true
                    },
                    {
                        "text": "Bi(n,p), Po(λ), Ge(p)",
                        "correct": false
                    },
                    {
                        "text": "Iba normálne rozdelenie",
                        "correct": false
                    },
                    {
                        "text": "Iba R(10)",
                        "correct": false
                    }
                ],
                "explanation": "Z10 rieši spojité rozdelenia: rovnomerné, exponenciálne a normálne."
            }
        ]
    }
];
