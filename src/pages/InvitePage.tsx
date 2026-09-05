import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  getPendingInviteToken,
  setPendingInviteToken,
} from '../lib/pendingInvite'
import { useAuth } from '../context/AuthContext'
import { requireSupabase } from '../lib/supabase'
import { isValidSlug, normalizeSlug } from '../lib/slug'
import type { Invite } from '../lib/types'
import './Studio.css'

type InviteStatus = 'loading' | 'valid' | 'invalid' | 'expired' | 'redeemed'

export function InvitePage() {
  const { token = '' } = useParams()
  const navigate = useNavigate()
  const { configured, user, profile, signInWithGoogle, refreshProfile } = useAuth()
  const [status, setStatus] = useState<InviteStatus>('loading')
  const [invite, setInvite] = useState<Invite | null>(null)
  const [slug, setSlug] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [headline, setHeadline] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!configured || !token) {
      setStatus('invalid')
      return
    }

    setPendingInviteToken(token)
    let cancelled = false

    ;(async () => {
      try {
        const { data, error: fetchError } = await requireSupabase()
          .from('invites')
          .select('*')
          .eq('token', token)
          .maybeSingle()

        if (cancelled) return
        if (fetchError) throw fetchError
        if (!data) {
          setStatus('invalid')
          return
        }

        const row = data as Invite
        setInvite(row)
        if (row.redeemed_at) setStatus('redeemed')
        else if (new Date(row.expires_at).getTime() < Date.now()) setStatus('expired')
        else setStatus('valid')
      } catch {
        if (!cancelled) setStatus('invalid')
      }
    })()

    return () => {
      cancelled = true
    }
  }, [configured, token])

  useEffect(() => {
    if (profile) {
      navigate(`/studio`, { replace: true })
    }
  }, [profile, navigate])

  useEffect(() => {
    if (user?.user_metadata?.full_name && !displayName) {
      setDisplayName(String(user.user_metadata.full_name))
    }
    if (user?.user_metadata?.name && !displayName) {
      setDisplayName(String(user.user_metadata.name))
    }
  }, [user, displayName])

  async function handleGoogle() {
    setPendingInviteToken(token)
    try {
      await signInWithGoogle(`${window.location.origin}/invite/${token}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-in failed')
    }
  }

  async function handleRedeem(event: FormEvent) {
    event.preventDefault()
    setError(null)
    const cleanSlug = normalizeSlug(slug)
    if (!isValidSlug(cleanSlug)) {
      setError('Slug must be 2–48 characters: lowercase letters, numbers, hyphens.')
      return
    }
    if (!displayName.trim()) {
      setError('Display name is required.')
      return
    }

    setSubmitting(true)
    try {
      const client = requireSupabase()
      const { data, error: rpcError } = await client.rpc('redeem_invite', {
        invite_token: token,
        new_slug: cleanSlug,
        new_display_name: displayName.trim(),
        new_headline: headline.trim(),
        new_bio: '',
        new_contact_email: user?.email ?? '',
      })
      if (rpcError) throw rpcError
      setPendingInviteToken(null)
      await refreshProfile()
      const createdSlug = (data as { slug?: string } | null)?.slug ?? cleanSlug
      navigate(`/u/${createdSlug}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create portfolio')
    } finally {
      setSubmitting(false)
    }
  }

  if (!configured) {
    return (
      <div className="studio-shell">
        <p className="page-status">Supabase is not configured.</p>
        <p>
          <Link to="/">Back home</Link>
        </p>
      </div>
    )
  }

  if (status === 'loading') {
    return (
      <div className="shell-status">
        <p>Checking invite…</p>
      </div>
    )
  }

  if (status === 'invalid') {
    return (
      <div className="studio-shell">
        <h1>Invite not found</h1>
        <p className="muted">This invite link is invalid.</p>
        <Link to="/">Back home</Link>
      </div>
    )
  }

  if (status === 'expired') {
    return (
      <div className="studio-shell">
        <h1>Invite expired</h1>
        <p className="muted">Ask the admin for a new invite link.</p>
        <Link to="/">Back home</Link>
      </div>
    )
  }

  if (status === 'redeemed') {
    return (
      <div className="studio-shell">
        <h1>Invite already used</h1>
        <p className="muted">This single-use invite has already been redeemed.</p>
        <Link to="/">Back home</Link>
      </div>
    )
  }

  return (
    <div className="studio-shell">
      <header className="studio-header">
        <Link to="/" className="studio-brand">
          Portfolio Studio
        </Link>
      </header>

      <h1>Join with invite</h1>
      <p className="muted">
        Create your personal portfolio. Invites expire{' '}
        {invite ? new Date(invite.expires_at).toLocaleString() : 'soon'}.
      </p>

      {!user ? (
        <div className="studio-card">
          <p>Sign in with Google to continue.</p>
          <button type="button" className="cta primary" onClick={() => void handleGoogle()}>
            Sign in with Google
          </button>
          {error ? <p className="form-error">{error}</p> : null}
        </div>
      ) : (
        <form className="studio-card form-grid" onSubmit={(e) => void handleRedeem(e)}>
          <label>
            Display name
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              maxLength={80}
            />
          </label>
          <label>
            Public slug
            <input
              value={slug}
              onChange={(e) => setSlug(normalizeSlug(e.target.value))}
              placeholder="alex"
              required
              maxLength={48}
            />
            <span className="field-hint">yoursite.com/u/{slug || 'your-slug'}</span>
          </label>
          <label>
            Headline
            <input
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Media made with quiet precision."
              maxLength={160}
            />
          </label>
          {error ? <p className="form-error">{error}</p> : null}
          <button type="submit" className="cta primary" disabled={submitting}>
            {submitting ? 'Creating…' : 'Create portfolio'}
          </button>
        </form>
      )}
    </div>
  )
}

/** Signed-in users without a profile land here if they lost the invite context. */
export function SetupPage() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const pending = getPendingInviteToken()

  useEffect(() => {
    if (profile) navigate('/studio', { replace: true })
    else if (pending) navigate(`/invite/${pending}`, { replace: true })
  }, [profile, pending, navigate])

  return (
    <div className="studio-shell">
      <h1>Invite required</h1>
      <p className="muted">
        {user
          ? 'You’re signed in, but Portfolio Studio is invite-only. Ask an admin for a link.'
          : 'Sign in from a valid invite link to create your portfolio.'}
      </p>
      <Link to="/">Back home</Link>
    </div>
  )
}
