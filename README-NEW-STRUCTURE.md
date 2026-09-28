# Odporúčaná štruktúra po dizajn patchi

```text
studyHUB/
├── index.html
├── subjects.html
├── admin.html
├── subjects/
│   ├── fyzika.html
│   ├── matematika.html
│   └── ...
├── style/
│   ├── style.css
│   ├── fix.css
│   ├── subject-pages.css
│   └── neon-dashboard.css
├── script/
│   └── ...
├── tools/
│   └── apply-modern-neon-design-links.js
├── preview/
│   └── modern-neon-preview.html
└── files/
    └── fyzika/
```

`neon-dashboard.css` má byť posledný načítaný CSS súbor, aby vedel prepísať starší vzhľad.
