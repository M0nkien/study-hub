# Study Hub patch – Modern Neon Dashboard

Tento patch mení predchádzajúci čistý neon štýl na kombináciu:

- **štýl 1 Modern Dark Dashboard** ako základ,
- jemné prvky zo **štýlu 5 Neon Tech / Cyber** ako doplnok.

Výsledok je tmavý, moderný, appkový, ale menej krikľavý než čistý neon.

## Súbory v patchi

```text
style/neon-dashboard.css
tools/apply-modern-neon-design-links.js
preview/modern-neon-preview.html
README-PATCH.md
README-NEW-STRUCTURE.md
```

## Čo sa zmení

- tmavý moderný dashboard vzhľad,
- jemné neon cyan/fialové/ružové efekty,
- lepšie čitateľné karty a sekcie,
- moderný sidebar,
- nové tlačidlá,
- modernizované predmetové karty,
- zachované predmetové farby,
- menej agresívny glow efekt,
- vhodné aj na dlhé poznámky, vzorce a odvodenia.

## Ako nahrať

1. Rozbaľ ZIP do koreňa projektu.
2. Ak sa opýta na prepísanie `style/neon-dashboard.css`, povoľ prepísanie.
3. Spusti:

```bash
node tools/apply-modern-neon-design-links.js
```

4. Potom:

```bash
git add style/neon-dashboard.css tools/apply-modern-neon-design-links.js preview/modern-neon-preview.html
git add .
git commit -m "Switch Study Hub to Modern Neon Dashboard design"
git push
```

5. Na webe daj `Ctrl + F5`.

## Ak už máš pridaný pôvodný neon-dashboard.css

Stačí nahrať nový `style/neon-dashboard.css`. HTML link môže zostať rovnaký.

## Ako sa vrátiť späť

Odstráň z HTML riadok:

```html
<link rel="stylesheet" href="style/neon-dashboard.css?v=modern-neon-20260928">
```

alebo pri stránkach v podpriečinku:

```html
<link rel="stylesheet" href="../style/neon-dashboard.css?v=modern-neon-20260928">
```
