-- StudyHub v2.3: public search only exposes published content and quiz prompts, never correct answers.
create or replace function public.studyhub_public_search_index()
returns table(title text,type text,url text,subject text,keywords text,snippet text)
language sql stable security definer set search_path=public as $$
select s.name::text,'Predmet'::text,
 s.href::text,s.name::text,s.description::text,s.description::text
from public.subjects s where s.visible and s.publication_status='published'
union all
select t.title::text,'Téma'::text,
 (s.href||'#db-topic-'||t.id::text)::text,s.name::text,
 (t.summary||' '||t.content)::text,t.summary::text
from public.topics t join public.subjects s on s.id=t.subject_id
where t.visible and t.publication_status='published'
  and s.visible and s.publication_status='published'
union all
select m.title::text,
 case m.type when 'pdf' then 'PDF' when 'zadanie' then 'Zadanie'
 when 'poznamka' then 'Poznámky' when 'kviz' then 'Kvíz'
 else 'Materiál' end::text,
 s.href::text,s.name::text,(m.description||' '||m.content)::text,m.description::text
from public.materials m join public.subjects s on s.id=m.subject_id
where m.visible and m.publication_status='published'
  and s.visible and s.publication_status='published'
union all
select q.question::text,'Kvíz'::text,s.href::text,s.name::text,
 q.question::text,'Databázová otázka'::text
from public.quiz_questions q join public.subjects s on s.id=q.subject_id
where q.visible and q.publication_status='published'
  and s.visible and s.publication_status='published'
union all
select f.front::text,'Flashcard'::text,'flashcards.html'::text,s.name::text,
 (f.front||' '||f.back)::text,f.front::text
from public.flashcards f join public.subjects s on s.id=f.subject_id
where f.visible and f.publication_status='published'
  and s.visible and s.publication_status='published'
union all
select r.title::text,'Roadmapa'::text,'roadmap.html'::text,
 coalesce(r.subject,'StudyHub')::text,r.description::text,r.description::text
from public.roadmap_items r where r.visible and r.publication_status='published'
union all
select c.title::text,'Changelog'::text,'changelog.html'::text,
 c.version::text,c.description::text,c.description::text
from public.changelog_entries c where c.visible and c.publication_status='published';
$$;
revoke all on function public.studyhub_public_search_index() from public;
grant execute on function public.studyhub_public_search_index() to anon,authenticated;