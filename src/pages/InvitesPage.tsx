import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { randomInviteToken } from '../lib/slug'
import { requireSupabase } from '../lib/supabase'
import type { Invite } from '../lib/types'
import { absoluteAppUrl } from '../lib/urls'
import './Studio.css'

const INVITE_DAYS = 7

export function InvitesPage() {
  const { profile, signOut } = useAuth()
  const [invites, setInvites] = useState<Invite[]>([])
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [loadedAt] = useState(() => Date.now())

  const load = useCallback(async () => {
    const { data, error: fetchError } = await requireSupabase()
      .from('invites')
      .select('*')
      .order('created_at', { ascending: false })
    if (fetchError) throw fetchError
    setInvites((data as Invite[]) ?? [])
  }, [])

  useEffect(() => {
    void load().catch((err) =>
      setError(err instanceof Error ? err.message : 'Failed to load invites'),
    )
  }, [load])

  async function createInvite() {
    if (!profile) return
    setBusy(true)
    setError(null)
    setMessage(null)
    try {
      const token = randomInviteToken()
      const expires = new Date()
      expires.setDate(expires.getDate() + INVITE_DAYS)
      const { error: insertError } = await requireSupabase().from('invites').insert({
        token,
        created_by: profile.id,
        expires_at: expires.toISOString(),
      })
      if (insertError) throw insertError
      await load()
      setMessage('Invite created. Copy the link and send it privately.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create invite')
    } finally {
      setBusy(false)
    }
  }

  function inviteUrl(token: string) {
    return absoluteAppUrl(`/invite/${token}`)
  }

  async function copyLink(invite: Invite) {
    try {
      await navigator.clipboard.writeText(inviteUrl(invite.token))
      setCopiedId(invite.id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      setError('Could not copy to clipboard')
    }
  }

  function isOpen(invite: Invite) {
    return !invite.redeemed_at && Date.parse(invite.expires_at) >= loadedAt
  }

  function statusLabel(invite: Invite) {
    if (invite.redeemed_at) return 'Redeemed'
    if (Date.parse(invite.expires_at) < loadedAt) return 'Expired'
    return 'Open'
  }

  return (
    <div className="studio-shell">
      <header className="studio-header">
        <Link to="/" className="studio-brand">
          Portfolio Studio
        </Link>
        <nav className="studio-nav">
          <Link to="/studio">Studio</Link>
          <button type="button" className="text-btn" onClick={() => void signOut()}>
            Sign out
          </button>
        </nav>
      </header>

      <h1>Invites</h1>
      <p className="muted">
        Single-use links expire after {INVITE_DAYS} days. Anyone with a valid link can
        create their own portfolio after Google sign-in.
      </p>

      {message ? <p className="form-ok">{message}</p> : null}
      {error ? <p className="form-error">{error}</p> : null}

      <div className="studio-card">
        <button
          type="button"
          className="cta primary"
          disabled={busy}
          onClick={() => void createInvite()}
        >
          {busy ? 'Creating…' : 'Create invite link'}
        </button>
      </div>

      <ul className="studio-list">
        {invites.map((invite) => (
          <li key={invite.id} className="studio-card studio-list-item">
            <div className="invite-row">
              <div>
                <p className="invite-status">{statusLabel(invite)}</p>
                <p className="muted small">
                  Expires {new Date(invite.expires_at).toLocaleString()}
                </p>
                {invite.redeemed_at ? (
                  <p className="muted small">
                    Redeemed {new Date(invite.redeemed_at).toLocaleString()}
                  </p>
                ) : null}
                <code className="invite-url">{inviteUrl(invite.token)}</code>
              </div>
              {isOpen(invite) ? (
                <button
                  type="button"
                  className="cta ghost"
                  onClick={() => void copyLink(invite)}
                >
                  {copiedId === invite.id ? 'Copied' : 'Copy link'}
                </button>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
