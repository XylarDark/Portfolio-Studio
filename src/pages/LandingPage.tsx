import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './LandingPage.css'
import { absoluteAppUrl } from '../lib/urls'

export function LandingPage() {
  const { configured, loading, user, profile, signInWithGoogle, signOut } = useAuth()

  async function handleSignIn() {
    try {
      await signInWithGoogle(absoluteAppUrl('/studio'))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Sign-in failed')
    }
  }

  return (
    <div className="landing">
      <header className="landing-nav">
        <span className="landing-brand">Portfolio Studio</span>
        <div className="landing-actions">
          {user ? (
            <>
              {profile ? <Link to={`/u/${profile.slug}`}>My portfolio</Link> : null}
              <Link to="/studio">Studio</Link>
              {profile?.is_admin ? <Link to="/studio/invites">Invites</Link> : null}
              <button type="button" className="text-btn" onClick={() => void signOut()}>
                Sign out
              </button>
            </>
          ) : (
            <button
              type="button"
              className="cta primary"
              onClick={() => void handleSignIn()}
              disabled={!configured || loading}
            >
              Sign in with Google
            </button>
          )}
        </div>
      </header>

      <main className="landing-hero">
        <p className="landing-kicker">Invite-only media resumes</p>
        <h1>Your portfolio. Their portfolio. One studio.</h1>
        <p className="landing-lede">
          Host personal media-resume sites with Google sign-in, invite links, and
          per-user uploads — without paying for a custom backend.
        </p>
        {!configured ? (
          <p className="landing-warn">
            Supabase is not configured yet. Add <code>VITE_SUPABASE_URL</code> and{' '}
            <code>VITE_SUPABASE_ANON_KEY</code> (see README), then restart the dev
            server.
          </p>
        ) : null}
        <div className="landing-cta-row">
          {user && profile ? (
            <Link className="cta primary" to="/studio">
              Open studio
            </Link>
          ) : (
            <button
              type="button"
              className="cta primary"
              onClick={() => void handleSignIn()}
              disabled={!configured || loading}
            >
              Sign in with Google
            </button>
          )}
          <a className="cta ghost" href="#how">
            How invites work
          </a>
        </div>
      </main>

      <section className="landing-section" id="how">
        <h2>How it works</h2>
        <ol className="landing-steps">
          <li>Admin creates a single-use invite link.</li>
          <li>Invitee signs in with Google and chooses a public slug.</li>
          <li>They upload their own media and publish at /u/their-slug.</li>
        </ol>
      </section>
    </div>
  )
}
