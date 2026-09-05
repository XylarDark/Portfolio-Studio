-- Per-portfolio accent color and display font tokens

alter table public.profiles
  add column if not exists accent_color text not null default '',
  add column if not exists display_font text not null default 'syne';

alter table public.profiles
  drop constraint if exists profiles_display_font_allowed;

alter table public.profiles
  add constraint profiles_display_font_allowed
  check (display_font in ('syne', 'instrument', 'space'));

alter table public.profiles
  drop constraint if exists profiles_accent_color_format;

alter table public.profiles
  add constraint profiles_accent_color_format
  check (accent_color = '' or accent_color ~ '^#[0-9A-Fa-f]{6}$');
