# StudyHub v2.3 – Admin Cloud & Study Sync

Táto verzia nadväzuje na vetvu v2.2 (Supabase Auth a základ PostgreSQL). Tmavý dizajn a existujúce študijné stránky zostávajú zachované.

## Nové funkcie
- Content Studio po overení používateľa s rolou admin: súhrn predmetov, tém, materiálov, otázok, flashcards, konceptov, posledné úpravy a upozornenia na chýbajúci publikovaný obsah.
- Kompletný databázový editor predmetov, tém, materiálov, otázok a flashcards. Koncepty a publikované položky majú samostatný stav.
- Nahrávanie PDF, obrázkov a TXT (do 10 MB) do súkromného Supabase Storage. Odkaz na súbor sa vydáva iba pre oprávneného admina alebo publikovaný materiál.
- Audit vytvorenia, úpravy a vymazania obsahu v content_versions; obnovenie starej verzie materiálu vrátane vymazaného materiálu, ak jeho predmet stále existuje.
- JSON export aktuálneho obsahu a histórie zmien (admin-only).
- Bezpečné databázové kvízy: verejné RPC vráti otázky a možnosti bez correct flagov, vyhodnotenie pre prihlásených prebieha na serveri a výsledok sa ukladá do quiz_results.
- Voliteľný študentský účet cez login.html. Prihlásený používateľ má vlastné RLS dáta pre topic progress, checklisty, flashcard review a quiz_results.
- Cloudové flashcards s hodnotením Znova/Ťažké/Viem/Ľahké a plánovaním opakovania.
- Synchronizácia existujúceho pokroku, checklistov, výsledkov statických kvízov a histórie pôvodných flashcards cez user_learning_state. Hosť zostáva localStorage-only.
- Study streak prihlásených používateľov cez user_activity.
- Nové predmety z databázového editora sa otvárajú cez všeobecnú stránku subject.html?slug=...; pôvodné predmetové HTML zostáva.
- Globálne vyhľadávanie používa bezpečnú databázovú RPC pre publikované predmety, témy, materiály, kvízové otázky (bez odpovedí), flashcards, roadmapu a changelog.
- Status sidebaru je zelený až po úspešnej kontrole databázy, Auth health a Storage; inak zobrazí neutrálny alebo chybový stav.
- Prehľadnejšie mobilné ovládanie a väčšie dotykové prvky.

## Čo už bolo vykonané na existujúcom Supabase projekte
- Nedestruktívne aplikované tri migrácie z database/migrations/.
- Verejné SELECT oprávnenie na quiz_questions bolo zrušené.
- Pôvodných 18 položiek Roadmapy a 20 záznamov Changelogu bolo prenesených do PostgreSQL.
- Existujúcich 11 predmetov a používateľské profily neboli vymazané.
- Vo vetve je nakonfigurovaný výhradne verejný Supabase publishable key. Secret/service-role key nie je uložený v repozitári.

## Postup nasadenia
1. Najprv otestuj túto vetvu v Netlify Deploy Preview alebo lokálne cez Live Server.
2. V Supabase Authentication skontroluj Site URL a Redirect URLs pre produkčnú stránku a prípadnú preview adresu.
3. Over, že tvoj profil má v public.profiles rolu admin a prihlásenie na admin.html otvorí editor až po autorizácii.
4. V editore ulož testovaciu tému ako koncept. Nesmie sa zobraziť verejne. Po zmene na Publikované sa musí objaviť na predmetovej stránke.
5. Nahraj testovací PDF ako koncept, potom ho publikuj a over časovo obmedzený odkaz.
6. Otestuj obnovenie staršej verzie materiálu, export JSON, flashcards a prihlasovanie študenta na dvoch zariadeniach.
7. Až po overení zluč PR do main. Netlify pripojený k main potom nasadí aktualizovaný frontend.

## Vytvorenie databázy na inom Supabase projekte
Spusti najprv database/schema.sql, potom migrácie v tomto poradí:
- database/migrations/20261002_v23.sql
- database/migrations/20261002_v23_sync.sql
- database/migrations/20261002_v23_search.sql
Ak potrebuješ pôvodný Kanban a Changelog, spusti database/seeds/20261002_existing_content.sql. Na existujúcom StudyHub projekte už sú tieto kroky vykonané; znova ich nespúšťaj.

## Bezpečnosť a dôležité obmedzenia
- RLS vynucuje oprávnenia v databáze; skrytie Admin UI nie je samotná bezpečnostná bariéra.
- Nové databázové kvízy majú serverové vyhodnocovanie a podporujú momentálne presne jednu správnu odpoveď na otázku (maximálne 40 otázok na predmet). Pôvodné statické kvízy v script/quiz-*.js ešte obsahujú odpovede v JS; na ich úplné zabezpečenie treba preniesť celý starý otázkový bank a jeho režimy do serverového kvízového systému.
- Existujúce HTML teórie a pôvodné statické flashcards neboli automaticky prevedené do PostgreSQL. Každý nový obsah vytvorený v Content Studio už používa databázu. Pre úplne jediný zdroj pravdy treba postupne preniesť aj zvyšný starý obsah.
- História verzií je automatická ochrana proti omylom pri úprave obsahu. JSON export je manuálny. NIE JE to plnohodnotná automatická záloha celého PostgreSQL ani Storage. Nastav a otestuj zálohovanie samostatne v Supabase podľa dostupnosti vo svojom pláne.
- Ak Supabase Security Advisor hlási verejne prístupné definer funkcie studyhub_public_search_index a studyhub_quiz_questions, sú to zámerne verejné RPC s explicitne obmedzeným výstupom bez utajených odpovedí. Obmedzenie uniknutých hesiel v Supabase Auth nastav podľa možností projektu.

## Zmenené súbory
Admin: admin.html, script/admin.js, script/admin-v23.js, style/v23.css.
Backend: database/migrations/20261002_v23.sql, 20261002_v23_sync.sql, 20261002_v23_search.sql a seed pôvodného obsahu.
Klienti: script/supabase-config.js, supabase-client.js, auth-ui.js, cloud-sync.js, cloud-content.js, cloud-topic-progress.js, cloud-quiz.js, cloud-flashcards.js, cloud-results.js, system-health.js, database-search.js, database-subjects.js, database-activity.js, database-roadmap.js, database-changelog.js.
Verejné stránky: index.html, subjects.html, subject.html, login.html, flashcards.html, results.html, roadmap.html, changelog.html, support.html a všetkých 11 stránok v subjects/.
Kompatibilita: script/progress.js, checklist.js, flashcards.js, quiz-engine.js, v2.js a v21.js.
