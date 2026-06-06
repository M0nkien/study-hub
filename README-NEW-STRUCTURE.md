# Study Hub – nová štruktúra súborov

Tento patch upratuje frontend štruktúru projektu.

## Nové priečinky

```text
assets/
├── css/
│   ├── style.css
│   ├── subjects.css
│   ├── quiz.css
│   ├── admin.css
│   └── responsive.css
│
├── js/
│   ├── main.js
│   ├── progress.js
│   ├── subject-search.js
│   ├── filters.js
│   ├── quiz-engine.js
│   ├── quiz-linux.js
│   ├── quiz-msd.js
│   ├── quiz-ccna.js
│   ├── checklist.js
│   ├── flashcards.js
│   ├── results.js
│   ├── ccna-tools.js
│   ├── admin.js
│   ├── support.js
│   └── data-loader.js
│
└── img/
    ├── icons/
    └── subjects/

data/
├── subjects.json
├── materials.json
├── quizzes.json
├── flashcards.json
├── roadmap.json
└── changelog.json
```

## Dôležité

HTML súbory už načítavajú CSS a JS z `assets/`.

Staré súbory v koreňovom priečinku, napríklad `style.css`, `script.js`, `flashcards.js`, `quiz-engine.js`,
môžeš po otestovaní odstrániť. Na to je pripravený súbor `cleanup-old-root-files.ps1`.

## Git príkazy

```bash
git add .
git commit -m "Reorganize frontend assets and add JSON data"
git push
```
