# StudyHub v2.2 – Supabase databáza a Admin Auth

Táto verzia pridáva prvý reálny cloudový backend StudyHubu cez Supabase PostgreSQL + Supabase Auth.

## Hotové v kóde
- Admin už nepoužíva heslo uložené v JavaScripte.
- Pred prihlásením sa zobrazuje iba e-mail + heslo. Žiadne predvolené heslo sa na stránke nevypisuje.
- Admin obsah sa zobrazí až po úspešnom Supabase prihlásení a overení role admin.
- Materiály a kvízové otázky sa ukladajú do PostgreSQL.
- Predmety, ich stav a viditeľnosť sa spravujú z databázy.
- subjects.html načíta stavy a viditeľnosť zo Supabase; ak Supabase nie je nastavený, ostane funkčný statický fallback.
- Databáza obsahuje pripravené tabuľky aj pre Roadmapu, Changelog a Study streak aktivitu.
- RLS politiky povoľujú zápis iba Adminovi.

## 1. Vytvor Supabase projekt
V Supabase vytvor projekt StudyHub.

## 2. Spusti databázovú migráciu
Supabase -> SQL Editor -> New query -> vlož celý obsah súboru database/schema.sql a klikni Run.

## 3. Vytvor svoj Admin účet
Supabase -> Authentication -> Users -> Add user.

Použi svoj e-mail a vlastné silné heslo.

Potom v SQL Editore spusti:

    update public.profiles
    set role = 'admin'
    where id = (
      select id
      from auth.users
      where email = 'TVOJ_EMAIL'
    );

## 4. Prepoj frontend
Supabase -> Connect / Settings -> API Keys.

Do script/supabase-config.js vlož:
- Project URL
- Publishable key

Príklad:

    window.STUDYHUB_SUPABASE_CONFIG = {
      url: "https://xxxx.supabase.co",
      publishableKey: "sb_publishable_xxxx"
    };

Nikdy sem nedávaj secret key ani service_role key.

## 5. Netlify/Auth URL
V Supabase Auth URL configuration nastav Site URL:

    https://schoolstudinghub.netlify.app

Ak neskôr použiješ studyhub.sk, pridaj aj túto doménu medzi povolené redirect URL.

## 6. Prihlásenie
Otvor /admin.html.

Po prihlásení Admin uvidí databázový editor. Neadmin používateľ dostane hlášku o chýbajúcich právach.

## Databázové tabuľky
- profiles
- subjects
- materials
- quiz_questions
- roadmap_items
- changelog_entries
- user_activity

## Bezpečnosť
Frontend používa iba publishable key. Skutočné práva chráni PostgreSQL RLS.
Secret/service-role kľúč nesmie byť v GitHube ani v browseri.
