-- Owner-controlled portfolio copy, download policy, and viewable assets

alter table public.profiles
  add column if not exists work_section_title text not null default '',
  add column if not exists work_section_blurb text not null default '',
  add column if not exists resume_section_title text not null default '',
  add column if not exists resume_section_blurb text not null default '',
  add column if not exists contact_section_title text not null default '',
  add column if not exists contact_section_blurb text not null default '',
  add column if not exists cta_primary_label text not null default '',
  add column if not exists cta_secondary_label text not null default '',
  add column if not exists allow_downloads boolean not null default false,
  add column if not exists resume_file_path text;

alter table public.works
  add column if not exists link_url text,
  add column if not exists file_path text;
