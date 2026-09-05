-- Portfolio Studio multi-tenant schema
-- Run in Supabase SQL Editor (or via supabase db push)

-- Profiles (1:1 with auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  slug text not null,
  display_name text not null,
  headline text not null default '',
  bio text not null default '',
  contact_email text not null default '',
  hero_path text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint profiles_slug_length check (char_length(slug) between 2 and 48)
);

create unique index if not exists profiles_slug_unique on public.profiles (slug);

-- Work items
create table if not exists public.works (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  role text not null default '',
  year text not null default '',
  image_path text,
  alt text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists works_owner_id_idx on public.works (owner_id);

-- Experience / resume
create table if not exists public.experience (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  role text not null,
  org text not null default '',
  period text not null default '',
  detail text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists experience_owner_id_idx on public.experience (owner_id);

-- Invite links (single-use, 7-day default handled in app)
create table if not exists public.invites (
  id uuid primary key default gen_random_uuid(),
  token text not null,
  created_by uuid not null references public.profiles (id) on delete cascade,
  expires_at timestamptz not null,
  redeemed_by uuid references public.profiles (id) on delete set null,
  redeemed_at timestamptz,
  created_at timestamptz not null default now(),
  constraint invites_token_length check (char_length(token) >= 16)
);

create unique index if not exists invites_token_unique on public.invites (token);

-- updated_at helper
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists works_set_updated_at on public.works;
create trigger works_set_updated_at
  before update on public.works
  for each row execute function public.set_updated_at();

drop trigger if exists experience_set_updated_at on public.experience;
create trigger experience_set_updated_at
  before update on public.experience
  for each row execute function public.set_updated_at();

-- Helpers
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select is_admin from public.profiles where id = auth.uid()),
    false
  );
$$;

create or replace function public.has_profile()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid());
$$;

-- Atomically redeem invite + create profile
create or replace function public.redeem_invite(
  invite_token text,
  new_slug text,
  new_display_name text,
  new_headline text default '',
  new_bio text default '',
  new_contact_email text default ''
)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  invite_row public.invites;
  profile_row public.profiles;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  if exists (select 1 from public.profiles where id = auth.uid()) then
    raise exception 'Profile already exists';
  end if;

  select * into invite_row
  from public.invites
  where token = invite_token
  for update;

  if invite_row.id is null then
    raise exception 'Invite not found';
  end if;

  if invite_row.redeemed_at is not null then
    raise exception 'Invite already redeemed';
  end if;

  if invite_row.expires_at < now() then
    raise exception 'Invite expired';
  end if;

  insert into public.profiles (
    id, slug, display_name, headline, bio, contact_email, is_admin
  ) values (
    auth.uid(),
    lower(new_slug),
    new_display_name,
    coalesce(new_headline, ''),
    coalesce(new_bio, ''),
    coalesce(new_contact_email, ''),
    false
  )
  returning * into profile_row;

  update public.invites
  set redeemed_by = auth.uid(), redeemed_at = now()
  where id = invite_row.id;

  return profile_row;
end;
$$;

grant execute on function public.redeem_invite(text, text, text, text, text, text) to authenticated;
grant execute on function public.is_admin() to authenticated, anon;
grant execute on function public.has_profile() to authenticated, anon;

-- RLS
alter table public.profiles enable row level security;
alter table public.works enable row level security;
alter table public.experience enable row level security;
alter table public.invites enable row level security;

-- Profiles policies
drop policy if exists "Public can read profiles" on public.profiles;
create policy "Public can read profiles"
  on public.profiles for select
  using (true);

drop policy if exists "Users update own profile" on public.profiles;
create policy "Users update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- No direct inserts: use redeem_invite (security definer) or admin bootstrap SQL
drop policy if exists "No direct profile inserts" on public.profiles;
-- intentional: authenticated users cannot insert profiles directly

-- Works policies
drop policy if exists "Public can read works" on public.works;
create policy "Public can read works"
  on public.works for select
  using (true);

drop policy if exists "Owners manage works" on public.works;
create policy "Owners manage works"
  on public.works for all
  to authenticated
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

-- Experience policies
drop policy if exists "Public can read experience" on public.experience;
create policy "Public can read experience"
  on public.experience for select
  using (true);

drop policy if exists "Owners manage experience" on public.experience;
create policy "Owners manage experience"
  on public.experience for all
  to authenticated
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

-- Invites policies
drop policy if exists "Admins manage invites" on public.invites;
create policy "Admins manage invites"
  on public.invites for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Anyone can read invite by token for redeem UI" on public.invites;
create policy "Anyone can read invite by token for redeem UI"
  on public.invites for select
  using (true);

-- Storage bucket
insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do update set public = true;

drop policy if exists "Public read portfolio media" on storage.objects;
create policy "Public read portfolio media"
  on storage.objects for select
  using (bucket_id = 'portfolio-media');

drop policy if exists "Owners upload portfolio media" on storage.objects;
create policy "Owners upload portfolio media"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'portfolio-media'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Owners update portfolio media" on storage.objects;
create policy "Owners update portfolio media"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'portfolio-media'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'portfolio-media'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Owners delete portfolio media" on storage.objects;
create policy "Owners delete portfolio media"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'portfolio-media'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Bootstrap admin (run AFTER your first Google sign-in, replace the email):
-- insert into public.profiles (id, slug, display_name, headline, bio, contact_email, is_admin)
-- select id, 'admin', coalesce(raw_user_meta_data->>'full_name', 'Admin'),
--        'Portfolio Studio admin', '', email, true
-- from auth.users
-- where email = 'you@example.com'
-- on conflict (id) do update set is_admin = true;
