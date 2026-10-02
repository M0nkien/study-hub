-- Only the profile owner may change the display name; role is server-managed.
revoke update on public.profiles from anon,authenticated;
grant update(display_name) on public.profiles to authenticated;
drop policy if exists profiles_update_own_name on public.profiles;
create policy profiles_update_own_name on public.profiles
for update to authenticated
using (id=auth.uid()) with check (id=auth.uid());
-- Signup trigger inserts profiles with database default role 'student'; public signup never grants admin.
revoke insert,delete on public.profiles from anon,authenticated;