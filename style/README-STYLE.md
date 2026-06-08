# Study Hub – priečinok `style`

Tento priečinok obsahuje všetky CSS súbory webu.

## Hlavný súbor

```text
style/main.css
```

Tento súbor sa načítava v HTML stránkach a importuje ďalšie CSS súbory.

## Princíp

Pôvodne boli štýly v:

```text
assets/css/style.css
assets/css/modules/
```

Teraz sú CSS súbory uložené prehľadnejšie v jednom priečinku:

```text
style/
```

## Poznámka

Poradie importov v `main.css` je dôležité, pretože neskoršie štýly môžu prepisovať staršie.
