-- Contact form submissions for public portfolios

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now(),
  constraint contact_messages_name_length check (char_length(trim(name)) between 1 and 120),
  constraint contact_messages_email_length check (char_length(trim(email)) between 3 and 254),
  constraint contact_messages_message_length check (char_length(trim(message)) between 1 and 5000)
);

create index if not exists contact_messages_owner_id_idx
  on public.contact_messages (owner_id, created_at desc);

alter table public.contact_messages enable row level security;

drop policy if exists "Anyone can send contact messages" on public.contact_messages;
create policy "Anyone can send contact messages"
  on public.contact_messages for insert
  to anon, authenticated
  with check (
    exists (select 1 from public.profiles p where p.id = owner_id)
  );

drop policy if exists "Owners read their contact messages" on public.contact_messages;
create policy "Owners read their contact messages"
  on public.contact_messages for select
  to authenticated
  using (auth.uid() = owner_id);

grant select on table public.contact_messages to authenticated;
grant insert on table public.contact_messages to anon, authenticated;
