-- StudyHub v2.3 additive schema: editor, history, storage, student progress, safe quizzes.
-- Existing data is preserved.
-- Secure the initial schema when installing into a fresh Supabase project.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
alter function public.set_updated_at() set search_path=public;
alter table public.subjects add column if not exists publication_status text not null default 'published'
  check (publication_status in ('draft','published'));
alter table public.materials add column if not exists publication_status text not null default 'published'
  check (publication_status in ('draft','published'));
alter table public.materials add column if not exists content text not null default '';
alter table public.materials add column if not exists storage_path text;
alter table public.materials add column if not exists topic_id uuid;
alter table public.quiz_questions add column if not exists publication_status text not null default 'published'
  check (publication_status in ('draft','published'));
alter table public.roadmap_items add column if not exists publication_status text not null default 'published'
  check (publication_status in ('draft','published'));
alter table public.changelog_entries add column if not exists publication_status text not null default 'published'
  check (publication_status in ('draft','published'));

create table if not exists public.topics (
 id uuid primary key default gen_random_uuid(),
 subject_id uuid not null references public.subjects(id) on delete cascade,
 slug text not null,
 title text not null,
 content text not null default '',
 summary text not null default '',
 sort_order integer not null default 100,
 publication_status text not null default 'draft' check (publication_status in ('draft','published')),
 visible boolean not null default true,
 created_by uuid references auth.users(id) on delete set null,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 unique(subject_id, slug)
);
alter table public.materials add constraint materials_topic_id_fkey
 foreign key (topic_id) references public.topics(id) on delete set null;

create table if not exists public.flashcards (
 id uuid primary key default gen_random_uuid(),
 subject_id uuid not null references public.subjects(id) on delete cascade,
 topic_id uuid references public.topics(id) on delete set null,
 front text not null,
 back text not null,
 publication_status text not null default 'draft' check (publication_status in ('draft','published')),
 visible boolean not null default true,
 created_by uuid references auth.users(id) on delete set null,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);

create table if not exists public.content_versions (
 id bigint generated always as identity primary key,
 entity_type text not null check (entity_type in ('subjects','topics','materials','quiz_questions','flashcards','roadmap_items','changelog_entries')),
 entity_id uuid not null,
 action text not null check (action in ('created','updated','deleted')),
 snapshot jsonb not null,
 changed_by uuid references auth.users(id) on delete set null,
 changed_at timestamptz not null default now()
);
create index if not exists content_versions_entity_idx on public.content_versions(entity_type,entity_id,id desc);

create table if not exists public.user_topic_progress (
 user_id uuid not null references auth.users(id) on delete cascade,
 topic_id uuid not null references public.topics(id) on delete cascade,
 status text not null default 'not_started' check (status in ('not_started','in_progress','learned')),
 updated_at timestamptz not null default now(),
 primary key(user_id,topic_id)
);
create table if not exists public.user_checklist (
 user_id uuid not null references auth.users(id) on delete cascade,
 item_key text not null,
 completed boolean not null default false,
 updated_at timestamptz not null default now(),
 primary key(user_id,item_key)
);
create table if not exists public.flashcard_reviews (
 user_id uuid not null references auth.users(id) on delete cascade,
 flashcard_id uuid not null references public.flashcards(id) on delete cascade,
 interval_days integer not null default 0,
 ease numeric(4,2) not null default 2.50,
 repetitions integer not null default 0,
 due_at timestamptz not null default now(),
 last_rating text check (last_rating in ('again','hard','good','easy')),
 reviewed_at timestamptz,
 primary key(user_id,flashcard_id)
);
create index if not exists flashcard_reviews_due_idx on public.flashcard_reviews(user_id,due_at);
create table if not exists public.quiz_results (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 subject_id uuid not null references public.subjects(id) on delete cascade,
 correct_count integer not null,
 total_count integer not null,
 details jsonb not null default '[]'::jsonb,
 completed_at timestamptz not null default now()
);
create index if not exists quiz_results_user_idx on public.quiz_results(user_id,completed_at desc);

create or replace function public.audit_content()
returns trigger language plpgsql security definer set search_path = public as $$
declare snap jsonb; target_id uuid; action_name text;
begin
 if tg_op = 'INSERT' then snap := to_jsonb(new); target_id:=new.id; action_name:='created';
 elsif tg_op = 'UPDATE' then snap := to_jsonb(old); target_id:=old.id; action_name:='updated';
 else snap := to_jsonb(old); target_id:=old.id; action_name:='deleted';
 end if;
 insert into public.content_versions(entity_type,entity_id,action,snapshot,changed_by)
 values (tg_table_name,target_id,action_name,snap,auth.uid());
 return null;
end;
$$;
revoke all on function public.audit_content() from public, anon, authenticated;

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at=now(); return new; end;
$$;
drop trigger if exists topics_updated_at on public.topics;
create trigger topics_updated_at before update on public.topics for each row execute function public.set_updated_at();
drop trigger if exists flashcards_updated_at on public.flashcards;
create trigger flashcards_updated_at before update on public.flashcards for each row execute function public.set_updated_at();
drop trigger if exists user_topic_progress_updated_at on public.user_topic_progress;
create trigger user_topic_progress_updated_at before update on public.user_topic_progress for each row execute function public.set_updated_at();
drop trigger if exists user_checklist_updated_at on public.user_checklist;
create trigger user_checklist_updated_at before update on public.user_checklist for each row execute function public.set_updated_at();
-- Track every future content edit; do not alter existing content.
do $$
declare n text;
begin
 foreach n in array array['subjects','topics','materials','quiz_questions','flashcards','roadmap_items','changelog_entries']
 loop
   execute format('drop trigger if exists studyhub_audit on public.%I', n);
   execute format('create trigger studyhub_audit after insert or update or delete on public.%I for each row execute function public.audit_content()', n);
 end loop;
end;
$$;

alter table public.topics enable row level security;
alter table public.flashcards enable row level security;
alter table public.content_versions enable row level security;
alter table public.user_topic_progress enable row level security;
alter table public.user_checklist enable row level security;
alter table public.flashcard_reviews enable row level security;
alter table public.quiz_results enable row level security;

revoke all on public.topics,public.flashcards,public.content_versions,
 public.user_topic_progress,public.user_checklist,public.flashcard_reviews,public.quiz_results
 from anon,authenticated;
grant select on public.topics,public.flashcards to anon,authenticated;
grant insert,update,delete on public.topics,public.flashcards to authenticated;
grant select on public.content_versions to authenticated;
grant select,insert,update,delete on public.user_topic_progress,public.user_checklist,public.flashcard_reviews to authenticated;
grant select on public.quiz_results to authenticated;

drop policy if exists subjects_public_read on public.subjects;
create policy subjects_public_read on public.subjects for select to anon,authenticated
 using ((visible and publication_status='published') or public.is_admin());
drop policy if exists materials_public_read on public.materials;
create policy materials_public_read on public.materials for select to anon,authenticated
 using ((visible and publication_status='published') or public.is_admin());
drop policy if exists roadmap_public_read on public.roadmap_items;
create policy roadmap_public_read on public.roadmap_items for select to anon,authenticated
 using ((visible and publication_status='published') or public.is_admin());
drop policy if exists changelog_public_read on public.changelog_entries;
create policy changelog_public_read on public.changelog_entries for select to anon,authenticated
 using ((visible and publication_status='published') or public.is_admin());

create policy topics_public_read on public.topics for select to anon,authenticated
 using ((visible and publication_status='published' and exists
         (select 1 from public.subjects s where s.id=subject_id and s.visible and s.publication_status='published'))
         or public.is_admin());
create policy topics_admin_insert on public.topics for insert to authenticated with check (public.is_admin());
create policy topics_admin_update on public.topics for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy topics_admin_delete on public.topics for delete to authenticated using (public.is_admin());

create policy flashcards_public_read on public.flashcards for select to anon,authenticated
 using ((visible and publication_status='published' and exists
         (select 1 from public.subjects s where s.id=subject_id and s.visible and s.publication_status='published'))
         or public.is_admin());
create policy flashcards_admin_insert on public.flashcards for insert to authenticated with check (public.is_admin());
create policy flashcards_admin_update on public.flashcards for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy flashcards_admin_delete on public.flashcards for delete to authenticated using (public.is_admin());

create policy versions_admin_read on public.content_versions for select to authenticated using (public.is_admin());
create policy topic_progress_owner on public.user_topic_progress for all to authenticated
 using (user_id=auth.uid()) with check (user_id=auth.uid());
create policy checklist_owner on public.user_checklist for all to authenticated
 using (user_id=auth.uid()) with check (user_id=auth.uid());
create policy flashcard_reviews_owner on public.flashcard_reviews for all to authenticated
 using (user_id=auth.uid()) with check (user_id=auth.uid());
create policy quiz_results_owner on public.quiz_results for select to authenticated
 using (user_id=auth.uid());

-- Existing correct-answer table is never readable by ordinary users.
revoke select on public.quiz_questions from anon;
drop policy if exists questions_public_read on public.quiz_questions;
drop policy if exists questions_admin_read on public.quiz_questions;
create policy questions_admin_read on public.quiz_questions for select to authenticated
 using (public.is_admin());

-- Private files: readers can get short-lived URLs only for published materials.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('studyhub-materials','studyhub-materials',false,10485760,
 array['application/pdf','image/png','image/jpeg','image/webp','text/plain'])
on conflict(id) do nothing;
create policy studyhub_files_read on storage.objects for select to anon,authenticated using (
 bucket_id='studyhub-materials'
 and (public.is_admin() or exists (
    select 1 from public.materials m
    where m.storage_path=storage.objects.name
      and m.visible and m.publication_status='published'
  ))
);
create policy studyhub_files_insert on storage.objects for insert to authenticated
 with check (bucket_id='studyhub-materials' and public.is_admin());
create policy studyhub_files_update on storage.objects for update to authenticated
 using (bucket_id='studyhub-materials' and public.is_admin())
 with check (bucket_id='studyhub-materials' and public.is_admin());
create policy studyhub_files_delete on storage.objects for delete to authenticated
 using (bucket_id='studyhub-materials' and public.is_admin());

-- Restores the previous snapshot of a material; restoration itself is audited.
create or replace function public.restore_material_version(p_version_id bigint)
returns boolean language plpgsql security definer set search_path=public as $$
declare v record; snap jsonb;
begin
 if not public.is_admin() then raise exception 'Admin role required'; end if;
 select * into v from public.content_versions
 where id=p_version_id and entity_type='materials';
 if not found then raise exception 'Material version not found'; end if;
 snap:=v.snapshot;
 insert into public.materials(id,subject_id,topic_id,title,type,description,content,url,storage_path,
  visible,publication_status,created_by)
 values (
   (snap->>'id')::uuid,(snap->>'subject_id')::uuid,
   nullif(snap->>'topic_id','')::uuid, snap->>'title',snap->>'type',
   coalesce(snap->>'description',''),coalesce(snap->>'content',''),
   nullif(snap->>'url',''),nullif(snap->>'storage_path',''),
   coalesce((snap->>'visible')::boolean,true),
   coalesce(snap->>'publication_status','draft'),
   nullif(snap->>'created_by','')::uuid
 )
 on conflict(id) do update set
  subject_id=excluded.subject_id,topic_id=excluded.topic_id,
  title=excluded.title,type=excluded.type,description=excluded.description,
  content=excluded.content,url=excluded.url,storage_path=excluded.storage_path,
  visible=excluded.visible,publication_status=excluded.publication_status;
 return true;
end;
$$;
revoke all on function public.restore_material_version(bigint) from public,anon;
grant execute on function public.restore_material_version(bigint) to authenticated;

-- Unauthenticated visitors may list questions without their correct answers.
create or replace function public.studyhub_quiz_questions(p_slug text)
returns table(question_id uuid,prompt text,options jsonb)
language sql stable security definer set search_path=public as $$
 select q.id, q.question,
  (select coalesce(jsonb_agg(jsonb_build_object('text',item.value->>'text') order by item.ordinality),'[]'::jsonb)
   from jsonb_array_elements(q.answers) with ordinality as item(value,ordinality))
 from public.quiz_questions q
 join public.subjects s on s.id=q.subject_id
 where s.slug=p_slug and s.visible and s.publication_status='published'
   and q.visible and q.publication_status='published'
 order by q.created_at,q.id
 limit 40;
$$;
revoke all on function public.studyhub_quiz_questions(text) from public;
grant execute on function public.studyhub_quiz_questions(text) to anon,authenticated;

-- Complete submissions are graded server-side; answers released only afterwards.
create or replace function public.studyhub_submit_quiz(p_slug text,p_responses jsonb)
returns jsonb language plpgsql security definer set search_path=public as $$
declare total integer; provided integer; matched integer; correct integer;
        sid uuid; outcome jsonb;
begin
 if auth.uid() is null then raise exception 'Login required'; end if;
 if jsonb_typeof(p_responses)<>'array' then raise exception 'Expected array'; end if;
 select s.id,count(q.id) into sid,total
 from public.subjects s join public.quiz_questions q on q.subject_id=s.id
 where s.slug=p_slug and s.visible and s.publication_status='published'
  and q.visible and q.publication_status='published'
 group by s.id;
 if total is null or total=0 or total>40 then raise exception 'Quiz unavailable'; end if;
 if jsonb_array_length(p_responses)<>total then raise exception 'Submit the complete quiz'; end if;
 select count(distinct (item->>'id')::uuid) into provided
 from jsonb_array_elements(p_responses) item;
 if provided<>total then raise exception 'Duplicate or missing question'; end if;
 select count(*) into matched
 from jsonb_array_elements(p_responses) item
 join public.quiz_questions q on q.id=(item->>'id')::uuid
 where q.subject_id=sid and q.visible and q.publication_status='published';
 if matched<>total then raise exception 'Invalid quiz submission'; end if;
 select count(*) filter(where coalesce((q.answers->((item->>'answer')::int)->>'correct')::boolean,false)),
    coalesce(jsonb_agg(jsonb_build_object(
      'id',q.id,
      'correct',coalesce((q.answers->((item->>'answer')::int)->>'correct')::boolean,false),
      'correct_answer',(select answer.ordinality-1 from jsonb_array_elements(q.answers)
        with ordinality as answer(value,ordinality)
        where (answer.value->>'correct')::boolean is true limit 1),
      'explanation',q.explanation
    )),'[]'::jsonb)
 into correct,outcome
 from jsonb_array_elements(p_responses) item
 join public.quiz_questions q on q.id=(item->>'id')::uuid
 where q.subject_id=sid;
 insert into public.quiz_results(user_id,subject_id,correct_count,total_count,details)
 values (auth.uid(),sid,correct,total,outcome);
 return jsonb_build_object('correct',correct,'total',total,'details',outcome);
end;
$$;
revoke all on function public.studyhub_submit_quiz(text,jsonb) from public,anon;
grant execute on function public.studyhub_submit_quiz(text,jsonb) to authenticated;