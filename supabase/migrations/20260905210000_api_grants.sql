-- Grant API roles access to app tables (RLS still enforces row rules)

grant usage on schema public to anon, authenticated;

grant select on table public.profiles to anon, authenticated;
grant update on table public.profiles to authenticated;

grant select on table public.works to anon, authenticated;
grant insert, update, delete on table public.works to authenticated;

grant select on table public.experience to anon, authenticated;
grant insert, update, delete on table public.experience to authenticated;

grant select on table public.invites to anon, authenticated;
grant insert, update, delete on table public.invites to authenticated;

grant usage, select on all sequences in schema public to authenticated;
