-- After you sign in once with Google (creating auth.users), promote yourself to admin.
-- Replace the email below with your Google account email, then run in SQL Editor.
-- Keep headline/bio empty so the public page only shows your own client-facing copy.

insert into public.profiles (
  id,
  slug,
  display_name,
  headline,
  bio,
  contact_email,
  cta_primary_label,
  cta_secondary_label,
  work_section_title,
  resume_section_title,
  contact_section_title,
  is_admin
)
select
  id,
  'admin',
  coalesce(raw_user_meta_data->>'full_name', coalesce(raw_user_meta_data->>'name', 'Admin')),
  '',
  '',
  email,
  'View work',
  'Contact me',
  'Selected work',
  'Resume',
  'Contact',
  true
from auth.users
where email = 'you@example.com'
on conflict (id) do update
set is_admin = true,
    display_name = excluded.display_name,
    contact_email = excluded.contact_email;
