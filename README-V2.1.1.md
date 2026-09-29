# StudyHub v2.1.1 – Netlify/GitHub repair

Táto verzia opravuje neúplný deploy v2.1.0.

## Opravené
- doplnené chýbajúce `style/v2.css`, `script/v2.js`, `script/v21.js` a `script/search-index.js`,
- všetky predmetové stránky načítavajú V2 shell a globálne vyhľadávanie,
- filter stavov predmetov používa `data-status` a rešpektuje admin viditeľnosť,
- Admin editor používa jednotné localStorage kľúče a podporuje pridať/upraviť/vymazať/exportovať,
- heslo zobrazené v Admin UI zodpovedá predvolenému heslu `studyhub`,
- Admin nie je v hlavnom sidebare; prístup je cez účet → Admin prihlásenie a panel sa odomkne až po prihlásení,
- mobilný hamburger a bottom navigation ostávajú aktívne,
- Roadmapa ostáva Kanban a Changelog timeline,
- sidebar ukazuje v2.1.1 / 29. 9. 2026 / zelený systémový stav,
- pridaný `netlify.toml` a vlastná `404.html`.

## Netlify
Netlify má publikovať koreň repozitára (`publish = "."`). Po merge/pushi do `main` sa má deploy spustiť automaticky.

## Ďalšia fáza
Po stabilizácii tejto verzie presunúť Admin/Auth a dáta z localStorage do Supabase.
