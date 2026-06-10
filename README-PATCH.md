# README PATCH – Linux teória bez inline CSS

## Čo bolo upravené

Používateľ chcel, aby CSS nebolo priamo v HTML súbore.

Upravené bolo:

```text
subjects/linux.html
style/linux-extra.css
```

## Zmeny

- z `subjects/linux.html` bol odstránený vložený `<style>...</style>` blok,
- CSS pre nové Linux sekcie bolo presunuté do samostatného súboru `style/linux-extra.css`,
- do hlavičky HTML bol pridaný odkaz:

```html
<link rel="stylesheet" href="../style/linux-extra.css?v=20260610-linux-theory">
```

## Ako nahrať

Súbory vlož do projektu takto:

```text
subjects/linux.html
style/linux-extra.css
```

Potom nahraj na GitHub:

```bash
git add subjects/linux.html style/linux-extra.css README-PATCH.md
git commit -m "Move Linux extra styles to CSS file"
git push
```

## Kontrola

Po nahratí otvor:

```text
subjects/linux.html
```

Skontroluj sekcie:

```text
Podrobná teória
Čo spraví tento príkaz?
Príkazy s výstupom
Skúškové zhrnutie
```

Ak sa štýly nenačítajú, stlač `Ctrl + F5`.
