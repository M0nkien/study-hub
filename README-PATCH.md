# README PATCH – Study Hub

## Názov patchu

Fyzika – riešené príklady ako otváracie/zatváracie časti.

## Dôvod úpravy

Používateľ poslal riešené príklady z fyziky a chcel ich doplniť do stránky do sekcie „Vzorový príklad“.

Požiadavka:

```text
- skontrolovať výpočty,
- doplniť príklady do stránky,
- každý príklad má byť ako samostatná časť,
- príklad sa má dať otvoriť a zatvoriť,
- po otvorení sa má zobraziť celé zadanie, známe hodnoty, riešenie a výsledok.
```

## Súbory v tomto patchi

```text
subjects/fyzika.html
style/fix.css
style/subject-pages.css
README-PATCH.md
README-NEW-STRUCTURE.md
```

## Skontrolované výpočty

Všetky doplnené výpočty boli prekontrolované.

### 5.1 Koleso sa zastaví trením

Výsledok sedí:

```text
f0 = 600 ot/min = 10 Hz
ω0 = 20π rad/s
φ = 500 · 2π = 1000π rad
ε = -π/5 rad/s² ≈ -0,628 rad/s²
t = 100 s
```

### 5.2 Šikmý vrh loptičky

Výsledok sedí:

```text
H ≈ 5,10 m
D ≈ 35,3 m
```

### 5.3 Ťažisko troch bodov

Výsledok sedí:

```text
rT = (1,2; 3,0) m
```

### 5.4 Moment sily cez vektorový súčin

Výsledok sedí:

```text
M = (0, 0, 7) N·m
```

### 5.5 Naklonená rovina s trením

Výsledok sedí:

```text
a ≈ 1,97 m/s²
```

### 5.6 Pružina a netlmené kmity

Výsledok sedí:

```text
ω0 ≈ 12,65 rad/s
T ≈ 0,50 s
```

### 5.7 Bernoulli + kontinuita v potrubí

Výsledok sedí:

```text
v2 = 3 m/s
p2 = 146 kPa
```

## Čo bolo upravené v `subjects/fyzika.html`

Sekcia:

```text
Vzorový príklad
```

bola nahradená rozšírenou sekciou:

```text
Riešené príklady ako z cvičení
```

Pridané boli otváracie časti `<details>` pre:

```text
5.1 Koleso sa zastaví trením
5.2 Šikmý vrh loptičky
5.3 Ťažisko troch bodov vo vektoroch
5.4 Moment sily cez vektorový súčin
5.5 Naklonená rovina s trením
5.6 Pružina a netlmené kmity
5.7 Bernoulli + kontinuita v potrubí
```

Každý príklad obsahuje:

```text
- zadanie,
- známe hodnoty,
- riešenie,
- výsledok.
```

## Čo bolo upravené v CSS

Do súborov:

```text
style/fix.css
style/subject-pages.css
```

boli doplnené štýly pre:

```text
- otváracie príklady,
- fialový blok zadania,
- blok známych hodnôt,
- blok riešenia,
- zelený blok výsledku,
- mobilné zobrazenie.
```

## Ako nahrať patch

Rozbaľ ZIP do koreňa projektu Study Hub a nahraď existujúce súbory.

Potom použi:

```bash
git add subjects/fyzika.html style/fix.css style/subject-pages.css README-PATCH.md README-NEW-STRUCTURE.md
git commit -m "Add collapsible solved physics examples"
git push
```

## Čo skontrolovať po nahratí

```text
1. Otvor subjects/fyzika.html.
2. Prejdi do sekcie Vzorové príklady / Riešené príklady ako z cvičení.
3. Skontroluj, že príklady 5.1 až 5.7 sú zatvorené.
4. Klikni na príklad.
5. Skontroluj, že sa zobrazí celé riešenie.
6. Klikni znova a príklad sa zatvorí.
7. Skontroluj mobilné zobrazenie.
8. Po nahratí na GitHub Pages daj Ctrl + F5.
```
