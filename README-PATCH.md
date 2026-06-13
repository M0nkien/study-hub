# README PATCH – Study Hub / Fyzika

## Čo tento ZIP robí

Tento patch dopĺňa stránku `subjects/fyzika.html` podľa nahratých prezentácií z fyziky a predchádzajúcich požiadaviek.

## Dôležité

Predchádzajúca hlavička referátu na labáky sa nepridáva. Tento patch sa sústreďuje na:

- prezentácie,
- doplnenie teórie,
- vzorce navyše,
- podrobné odvodenia,
- príklady z cvičení,
- obrázky, ktoré treba vedieť nakresliť,
- náhodný test na 60 minút.

## Zmenené/pridané súbory

```text
subjects/fyzika.html
style/fix.css
script/fyzika-random-exam.js
files/fyzika/prezentacie/1_uvod.pdf
files/fyzika/prezentacie/2_kinematika.pdf
files/fyzika/prezentacie/3_dynamika.pdf
files/fyzika/prezentacie/4_gravitacia.pdf
files/fyzika/prezentacie/5_trenie.pdf
files/fyzika/prezentacie/6_tuheteleso.pdf
files/fyzika/prezentacie/7_kmity.pdf
files/fyzika/prezentacie/8_deformacia.pdf
files/fyzika/prezentacie/9_hydromechanika.pdf
files/fyzika/prezentacie/10_realna_kvapalina.pdf
images/fyzika/*.png
README-PATCH.md
README-NEW-STRUCTURE.md
```

## Nové / upravené sekcie vo Fyzike

```text
Prezentácie z fyziky
Doplnenie z prednášok
Vzorce navyše
Odvodenia ku skúške – podrobne
Odvodenia navyše
Riešené príklady ako z cvičení
Príklady na precvičenie z cvík
Obrázky, ktoré vedieť nakresliť k témam
Náhodný test z fyziky na 60 minút
Checklist doplnený o nové body
```

## Ako nahrať

Rozbaľ ZIP do koreňa projektu Study Hub a potvrď prepísanie súborov.

Potom použi:

```bash
git add subjects/fyzika.html style/fix.css script/fyzika-random-exam.js files/fyzika/prezentacie images/fyzika README-PATCH.md README-NEW-STRUCTURE.md
git commit -m "Add complete physics lecture materials and exam training"
git push
```

Po nahratí na GitHub Pages daj na stránke Fyzika `Ctrl + F5`.

## Kontrola po nahratí

- otvor `subjects/fyzika.html`,
- skontroluj bočné menu,
- otvor sekciu Prezentácie,
- otvor Odvodenia a Príklady,
- skontroluj Obrázky ku skúške,
- vyskúšaj Náhodný test na 60 minút.
