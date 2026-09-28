# Study Hub – Modern Neon Dashboard aplikovaný

Tento ZIP obsahuje pôvodný projekt `study-hub` s aplikovaným dizajnom **Modern Dark Dashboard + jemný Neon Tech efekt**.

## Čo bolo upravené

- Pridaný/pripravený hlavný dizajn v `style/neon-dashboard.css`.
- Do hlavných HTML stránok bol doplnený link na `neon-dashboard.css` ako posledný CSS súbor pred `</head>`.
- Zachovaný pôvodný obsah, predmety, skripty, PDF, obrázky a dáta.
- Dizajn používa tmavý moderný dashboard základ a jemné neonové prvky:
  - cyan/fialový glow,
  - tmavé karty,
  - moderné tlačidlá,
  - nové orámovania,
  - zachované predmetové farby.

## Aplikované na stránky

- `index.html`
- `subjects.html`
- `admin.html`
- `flashcards.html`
- `roadmap.html`
- `changelog.html`
- `results.html`
- `support.html`
- všetky HTML stránky v priečinku `subjects/`
- náhľady v priečinku `preview/`

## Po nahratí na GitHub

Spusti:

```bash
git add .
git commit -m "Apply Modern Neon Dashboard design"
git push
```

Potom na stránke použi tvrdé obnovenie:

```text
Ctrl + F5
```

## Návrat späť

Ak by si chcel dizajn vypnúť, odstráň zo stránok link:

```html
<link rel="stylesheet" href="style/neon-dashboard.css?v=modern-neon-20260928">
```

Na stránkach v priečinku `subjects/` je cesta:

```html
<link rel="stylesheet" href="../style/neon-dashboard.css?v=modern-neon-20260928">
```
