import { useState, type FormEvent } from 'react'
import { requireSupabase } from '../lib/supabase'
import './ContactForm.css'

type Props = {
  ownerId: string
  ownerName: string
  variant?: 'panel' | 'modal'
  onClose?: () => void
}

export function ContactForm({
  ownerId,
  ownerName,
  variant = 'panel',
  onClose,
}: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    setError(null)
    try {
      const trimmedName = name.trim()
      const trimmedEmail = email.trim()
      const trimmedMessage = message.trim()
      const { error: insertError } = await requireSupabase()
        .from('contact_messages')
        .insert({
          owner_id: ownerId,
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
        })
      if (insertError) throw insertError

      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim()
      if (accessKey) {
        const notifyResponse = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: trimmedName,
            email: trimmedEmail,
            message: trimmedMessage,
            subject: `Portfolio contact from ${trimmedName}`,
          }),
        })
        const notifyResult = (await notifyResponse.json().catch(() => null)) as {
          success?: boolean
          message?: string
        } | null
        if (!notifyResponse.ok || !notifyResult?.success) {
          throw new Error(notifyResult?.message || 'Could not send email notification')
        }
      }

      setSent(true)
      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send message')
    } finally {
      setBusy(false)
    }
  }

  const body = (
    <div className={`contact-form contact-form-${variant}`}>
      {onClose ? (
        <header className="contact-form-header">
          <h2>Contact {ownerName}</h2>
          <button type="button" className="cta ghost" onClick={onClose}>
            Close
          </button>
        </header>
      ) : null}

      {sent ? (
        <p className="contact-form-ok">Thanks — your message was sent.</p>
      ) : (
        <form className="form-grid" onSubmit={(e) => void onSubmit(e)}>
          {!onClose ? <h3 className="contact-form-title">Contact {ownerName}</h3> : null}
          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} required maxLength={120} />
          </label>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={254}
            />
          </label>
          <label>
            Message
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              maxLength={5000}
            />
          </label>
          {error ? <p className="form-error">{error}</p> : null}
          <button type="submit" className="cta primary" disabled={busy}>
            {busy ? 'Sending…' : 'Send message'}
          </button>
        </form>
      )}
    </div>
  )

  if (variant === 'modal') {
    return (
      <div className="contact-modal">
        <button
          type="button"
          className="contact-modal-scrim"
          aria-label="Close contact form"
          onClick={onClose}
        />
        <div className="contact-modal-panel">{body}</div>
      </div>
    )
  }

  return body
}
