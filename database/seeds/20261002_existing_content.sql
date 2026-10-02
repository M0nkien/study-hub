-- StudyHub v2.3: preserve the 18 original roadmap cards and 20 original changelog entries.
-- The inserts are conditional and will not overwrite existing user entries.
do $$
begin
 if not exists (select 1 from public.roadmap_items limit 1) then
  insert into public.roadmap_items(title,description,status,priority,subject,item_type,target_date,sort_order,publication_status,visible)
  values
('PWA offline','Používanie poznámok a základných funkcií aj bez internetu.','napady','stredna','Web','funkcia','Budúcnosť',10,'published',true),
('Kompaktný režim','Hustejšie zobrazenie kariet a menšie medzery pre rýchle opakovanie.','napady','nizka','Dizajn','dizajn','Neskôr',11,'published',true),
('Študijný plánovač','Rozdelenie tém do dní podľa termínu skúšky.','napady','vysoka','StudyHub','funkcia','Budúcnosť',12,'published',true),
('Synchronizácia dát','Možnosť preniesť progres medzi zariadeniami.','napady','stredna','Backend','backend','Budúcnosť',13,'published',true),
('Print / PDF režim','Tlačiteľné poznámky bez navigácie a rušivých prvkov.','planovane','stredna','Materiály','funkcia','v2.2',14,'published',true),
('Zošit chýb','Jedno miesto pre nesprávne odpovede z kvízov.','planovane','vysoka','Kvízy','funkcia','v2.2',15,'published',true),
('Nastavenia StudyHubu','Export/import, vzhľad a personalizácia dashboardu.','planovane','stredna','Web','funkcia','v2.2',16,'published',true),
('Spaced repetition','Inteligentné opakovanie flashcards podľa úspešnosti.','planovane','vysoka','Flashcards','funkcia','v2.3',17,'published',true),
('Matematika – skúška','DR, Laplace, Fourierov rad, rady a ďalšie riešené príklady.','pracuje_sa','vysoka','Matematika','obsah','priebežne',18,'published',true),
('Fyzika – rozšírenia','Doplnenie podrobnejších odvodení, teórie a skúškových príkladov.','pracuje_sa','vysoka','Fyzika','obsah','priebežne',19,'published',true),
('CCNA – Packet Tracer','Rozšírenie príkazov, labov a cvičných testov.','pracuje_sa','vysoka','CCNA','obsah','priebežne',20,'published',true),
('MSD – zadania','Doplnenie Excel postupov, Fourier a pravdepodobnosti.','pracuje_sa','vysoka','MSD','obsah','priebežne',21,'published',true),
('Globálne vyhľadávanie','Okamžité výsledky pre predmety, témy, poznámky, zadania, kvízy, PDF a flashcards.','hotove','vysoka','Web','funkcia','29. 9. 2026',22,'published',true),
('Study streak','Automatická denná séria, rekord a 28-dňový prehľad aktivity.','hotove','vysoka','Dashboard','funkcia','29. 9. 2026',23,'published',true),
('Statusy predmetov','Funkčné stavy Hotové, Rozpracované, Pripravované a ich filter.','hotove','vysoka','Predmety','oprava','29. 9. 2026',24,'published',true),
('Mobilná navigácia','Hamburger sidebar a spodná navigácia pre hlavné sekcie.','hotove','vysoka','Mobil','dizajn','29. 9. 2026',25,'published',true),
('Admin editor','Pridávanie, úprava, mazanie, export a viditeľnosť predmetov.','hotove','vysoka','Admin','oprava','29. 9. 2026',26,'published',true),
('Dark dashboard','Tmavý dashboard, sidebar, topbar a jednotný vizuálny systém.','hotove','vysoka','Web','dizajn','09/2026',27,'published',true);
 end if;
 if not exists (select 1 from public.changelog_entries limit 1) then
  insert into public.changelog_entries(version,release_date,change_type,title,description,sort_order,publication_status,visible)
  values
('v2.1.1','2026-09-29','fixed','Netlify/GitHub repair','Doplnené chýbajúce V2 CSS/JS súbory na GitHub.',10,'published',true),
('v2.1.1','2026-09-29','fixed','Netlify/GitHub repair','Zjednotené predmetové stránky, globálny search, filter statusov a Admin editor.',11,'published',true),
('v2.1.1','2026-09-29','fixed','Netlify/GitHub repair','Pridaná Netlify konfigurácia a 404 stránka.',12,'published',true),
('v2.1.1','2026-09-29','new','Netlify/GitHub repair','Automatický Study streak s 28-dňovou aktivitou.',13,'published',true),
('v2.1.1','2026-09-29','new','Netlify/GitHub repair','Globálne okamžité vyhľadávanie cez predmety, témy, poznámky, zadania, kvízy, PDF a flashcards.',14,'published',true),
('v2.1.1','2026-09-29','new','Netlify/GitHub repair','Mobilná spodná navigácia pre Domov, Predmety, Flashcards a Výsledky.',15,'published',true),
('v2.1.1','2026-09-29','changed','Netlify/GitHub repair','Roadmapa prerobená na 4-stĺpcový Kanban.',16,'published',true),
('v2.1.1','2026-09-29','changed','Netlify/GitHub repair','Sidebar status zobrazuje verziu v2.1.1 a presný dátum aktualizácie.',17,'published',true),
('v2.1.1','2026-09-29','changed','Netlify/GitHub repair','Changelog používa novú verziovanú timeline.',18,'published',true),
('v2.1.1','2026-09-29','fixed','Netlify/GitHub repair','Filtrovanie predmetov podľa Hotové / Rozpracované / Pripravované.',19,'published',true),
('v2.1.1','2026-09-29','fixed','Netlify/GitHub repair','Nesprávne statusy predmetov vrátane Fyziky.',20,'published',true),
('v2.1.1','2026-09-29','fixed','Netlify/GitHub repair','Admin editor, export a správa viditeľnosti predmetov.',21,'published',true),
('v2.0.0','2026-09-01','new','Dark Dashboard','Tmavý dashboard, nový sidebar a topbar.',22,'published',true),
('v2.0.0','2026-09-01','new','Dark Dashboard','Mini dashboard, posledný otvorený predmet a rýchle odkazy.',23,'published',true),
('v2.0.0','2026-09-01','changed','Dark Dashboard','Jednotný vzhľad predmetových a systémových stránok.',24,'published',true),
('v1.3.0','2026-06-01','new','Študijné nástroje','Flashcards, výsledky, roadmapa a changelog.',25,'published',true),
('v1.3.0','2026-06-01','new','Študijné nástroje','Checklisty a progres učenia.',26,'published',true),
('v1.3.0','2026-06-01','changed','Študijné nástroje','CSS a JavaScript presunuté do priečinkov style/ a script/.',27,'published',true),
('v1.0.0','2026-06-01','new','Základ StudyHubu','Samostatná stránka Predmety.',28,'published',true),
('v1.0.0','2026-06-01','new','Základ StudyHubu','Prvé predmetové stránky a študijné materiály.',29,'published',true);
 end if;
end;
$$;