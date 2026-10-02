-- StudyHub v2.3: synchronize existing HTML/JS study data without losing local history.
create table if not exists public.user_learning_state (
 user_id uuid not null references auth.users(id) on delete cascade,
 storage_key text not null check (
   length(storage_key) < 160 and (
   storage_key in ('studyHubProgress','mikStudyLearned',
    'studyHubFlashcardsState','studyHubFlashcardsHistory',
    'studyHubStreakData','studyHubQuizResults')
   or storage_key like 'studyHubChecklist:%'
   )
 ),
 value jsonb not null check (octet_length(value::text) <= 200000),
 updated_at timestamptz not null default now(),
 primary key(user_id,storage_key)
);
alter table public.user_learning_state enable row level security;
revoke all on public.user_learning_state from anon,authenticated;
grant select,insert,update,delete on public.user_learning_state to authenticated;
drop policy if exists learning_state_owner on public.user_learning_state;
create policy learning_state_owner on public.user_learning_state
 for all to authenticated using (user_id=auth.uid()) with check (user_id=auth.uid());
drop trigger if exists learning_state_updated_at on public.user_learning_state;
create trigger learning_state_updated_at before update on public.user_learning_state
 for each row execute function public.set_updated_at();