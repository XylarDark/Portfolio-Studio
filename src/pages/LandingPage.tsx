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
        <span className="landing-brand-nav">Studio</span>
        <div className="landing-actions">
          <Link to="/swipe">Find work</Link>
          {user ? (
            <>
              {profile ? <Link to={`/u/${profile.slug}`}>My portfolio</Link> : null}
              <Link to="/studio">Open studio</Link>
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

      <main className="landing-hero-plane" aria-label="Portfolio Studio">
        <div className="landing-hero-visual" aria-hidden="true">
          <div className="landing-mock">
            <div className="landing-mock-nav">
              <span>Alex Rivera</span>
              <span>Work · Resume · Contact</span>
            </div>
            <div className="landing-mock-hero">
              <p className="landing-mock-brand">Alex Rivera</p>
              <p className="landing-mock-line">Director of photography</p>
            </div>
            <div className="landing-mock-grid">
              <figure />
              <figure className="offset" />
              <figure />
              <figure className="offset" />
            </div>
          </div>
          <div className="landing-hero-veil" />
        </div>

        <div className="landing-hero-copy">
          <p className="landing-brand">Portfolio Studio</p>
          <p className="landing-fpbp">For People, By People</p>
          <h1>Invite-only media resumes</h1>
          <p className="landing-lede">
            Host personal media-resume sites with Google sign-in, invite links, and
            per-user uploads — then swipe curated job openings when you&apos;re ready
            to find work.
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
            <Link className="cta ghost" to="/swipe">
              Swipe jobs
            </Link>
            <a className="cta ghost" href="#how">
              How invites work
            </a>
          </div>
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
