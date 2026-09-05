# Portfolio Studio

Invite-only, multi-tenant media-resume sites. Each person signs in with Google (via an invite link), creates a public portfolio at `/u/{slug}`, and uploads their own media.

## Stack

- Vite + React 19 + TypeScript
- React Router
- Supabase (Auth, Postgres, Storage, RLS)
- Free host: Cloudflare Pages or Vercel

## Local development

Dev server is pinned to **http://127.0.0.1:5280** (`vite.config.ts`) so this app doesn’t collide with other Cursor projects that also use Vite’s default `5173`.

```bash
npm install
cp .env.example .env
# fill VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
npm run dev
```

Without env vars, `/` shows a config warning and `/u/demo` serves the static sample portfolio.

### Ports across multiple Cursor projects

Give each repo its own fixed port in `vite.config.ts` (`server.port` + `strictPort: true`). That is more reliable than letting Vite auto-bump when `5173` is busy — OAuth redirect allow-lists need a stable origin.

## Supabase setup

1. Create a free project at [supabase.com](https://supabase.com).
2. **Authentication → Providers → Google**: enable and add your Google OAuth Client ID/Secret ([Google Cloud Console](https://console.cloud.google.com/apis/credentials)).
3. Add redirect URLs in both Google and Supabase:
   - `http://127.0.0.1:5280/**` and `http://localhost:5280/**` (dev)
   - `https://YOUR_DOMAIN/**` (production)
   - Supabase Site URL (local): `http://127.0.0.1:5280`
4. In **SQL Editor**, run [`supabase/migrations/20260905120000_init.sql`](supabase/migrations/20260905120000_init.sql).
5. Sign in once with Google on the app (creates `auth.users`).
6. Run [`supabase/seed_admin.sql`](supabase/seed_admin.sql) after replacing `you@example.com` with your Google email. That creates your admin profile (`/u/admin` by default) and unlocks **Studio → Invites**.
7. Create invite links and share them. Invitees redeem at `/invite/{token}`.

### Google OAuth checklist

| Place | Setting |
|-------|---------|
| Google Cloud OAuth client | Authorized JS origins: app origin |
| Google Cloud OAuth client | Authorized redirect URIs: `https://YOUR_PROJECT.supabase.co/auth/v1/callback` |
| Supabase Auth URL config | Site URL = production URL |
| Supabase Auth URL config | Redirect URLs include localhost + production |

## App routes

| Path | Purpose |
|------|---------|
| `/` | Landing + Sign in with Google |
| `/invite/:token` | Redeem invite → create slug/profile |
| `/u/:slug` | Public portfolio |
| `/studio` | Owner editor + uploads |
| `/studio/invites` | Admin invite create/copy |

## Deploy (free)

### Cloudflare Pages

1. Connect the GitHub repo.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add env vars `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
5. SPA fallback is provided by [`public/_redirects`](public/_redirects).

### Vercel

1. Import the repo.
2. Framework preset: Vite (or other; build `npm run build`, output `dist`).
3. Add the same env vars.
4. [`vercel.json`](vercel.json) rewrites all routes to `index.html`.

After deploy, add the production URL to Supabase redirect allow-list and Google OAuth settings.

## Customize sample media

Static placeholders live in `public/media/` and `src/data.ts` for offline/demo viewing only. Live portfolios use Supabase Storage under `portfolio-media/{user_id}/…`.

## Cost note

Supabase free tier includes Auth, a small database, and limited storage/bandwidth. Fine for invite-only photo portfolios; large video libraries may need a paid plan later.
