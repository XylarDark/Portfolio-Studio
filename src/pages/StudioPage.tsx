import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { deleteMedia, mediaUrl, uploadMedia } from '../lib/api'
import { requireSupabase } from '../lib/supabase'
import { isValidSlug, normalizeSlug } from '../lib/slug'
import type { Experience, Profile, Work } from '../lib/types'
import './Studio.css'

function emptyProfileFields(profile: Profile): Profile {
  return {
    ...profile,
    work_section_title: profile.work_section_title ?? '',
    work_section_blurb: profile.work_section_blurb ?? '',
    resume_section_title: profile.resume_section_title ?? '',
    resume_section_blurb: profile.resume_section_blurb ?? '',
    contact_section_title: profile.contact_section_title ?? '',
    contact_section_blurb: profile.contact_section_blurb ?? '',
    cta_primary_label: profile.cta_primary_label ?? '',
    cta_secondary_label: profile.cta_secondary_label ?? '',
    allow_downloads: Boolean(profile.allow_downloads),
    resume_file_path: profile.resume_file_path ?? null,
  }
}

export function StudioPage() {
  const { user, profile, refreshProfile, signOut } = useAuth()
  const [draft, setDraft] = useState<Profile | null>(
    profile ? emptyProfileFields(profile) : null,
  )
  const [works, setWorks] = useState<Work[]>([])
  const [experience, setExperience] = useState<Experience[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const loadContent = useCallback(async () => {
    if (!user) return
    const client = requireSupabase()
    const [{ data: workRows }, { data: expRows }] = await Promise.all([
      client
        .from('works')
        .select('*')
        .eq('owner_id', user.id)
        .order('sort_order', { ascending: true }),
      client
        .from('experience')
        .select('*')
        .eq('owner_id', user.id)
        .order('sort_order', { ascending: true }),
    ])
    setWorks((workRows as Work[]) ?? [])
    setExperience((expRows as Experience[]) ?? [])
  }, [user])

  useEffect(() => {
    setDraft(profile ? emptyProfileFields(profile) : null)
  }, [profile])

  useEffect(() => {
    void loadContent().catch((err) =>
      setError(err instanceof Error ? err.message : 'Failed to load studio data'),
    )
  }, [loadContent])

  async function saveProfile(event: FormEvent) {
    event.preventDefault()
    if (!draft || !user) return
    setBusy(true)
    setError(null)
    setMessage(null)
    try {
      const cleanSlug = normalizeSlug(draft.slug)
      if (!isValidSlug(cleanSlug)) {
        throw new Error('Slug must be 2–48 characters: lowercase letters, numbers, hyphens.')
      }
      const { error: updateError } = await requireSupabase()
        .from('profiles')
        .update({
          slug: cleanSlug,
          display_name: draft.display_name.trim(),
          headline: draft.headline,
          bio: draft.bio,
          contact_email: draft.contact_email,
          work_section_title: draft.work_section_title,
          work_section_blurb: draft.work_section_blurb,
          resume_section_title: draft.resume_section_title,
          resume_section_blurb: draft.resume_section_blurb,
          contact_section_title: draft.contact_section_title,
          contact_section_blurb: draft.contact_section_blurb,
          cta_primary_label: draft.cta_primary_label,
          cta_secondary_label: draft.cta_secondary_label,
          allow_downloads: draft.allow_downloads,
        })
        .eq('id', user.id)
      if (updateError) throw updateError
      await refreshProfile()
      setMessage('Profile saved.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setBusy(false)
    }
  }

  async function onHeroUpload(file: File | null) {
    if (!file || !user || !draft) return
    setBusy(true)
    setError(null)
    try {
      const path = await uploadMedia(user.id, 'hero', file)
      await deleteMedia(draft.hero_path)
      const { error: updateError } = await requireSupabase()
        .from('profiles')
        .update({ hero_path: path })
        .eq('id', user.id)
      if (updateError) throw updateError
      await refreshProfile()
      setMessage('Hero image updated.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setBusy(false)
    }
  }

  async function onResumeUpload(file: File | null) {
    if (!file || !user || !draft) return
    setBusy(true)
    setError(null)
    try {
      const path = await uploadMedia(user.id, 'resume', file)
      await deleteMedia(draft.resume_file_path)
      const { error: updateError } = await requireSupabase()
        .from('profiles')
        .update({ resume_file_path: path })
        .eq('id', user.id)
      if (updateError) throw updateError
      await refreshProfile()
      setMessage('Resume file updated.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setBusy(false)
    }
  }

  async function addWork() {
    if (!user) return
    setBusy(true)
    setError(null)
    try {
      const { error: insertError } = await requireSupabase().from('works').insert({
        owner_id: user.id,
        title: 'New work',
        role: '',
        year: String(new Date().getFullYear()),
        alt: '',
        link_url: '',
        sort_order: works.length,
      })
      if (insertError) throw insertError
      await loadContent()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not add work')
    } finally {
      setBusy(false)
    }
  }

  async function saveWork(work: Work) {
    setBusy(true)
    setError(null)
    try {
      const { error: updateError } = await requireSupabase()
        .from('works')
        .update({
          title: work.title,
          role: work.role,
          year: work.year,
          alt: work.alt,
          link_url: work.link_url?.trim() || null,
        })
        .eq('id', work.id)
      if (updateError) throw updateError
      setMessage('Work saved.')
      await loadContent()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save work')
    } finally {
      setBusy(false)
    }
  }

  async function uploadWorkImage(work: Work, file: File | null) {
    if (!file || !user) return
    setBusy(true)
    setError(null)
    try {
      const path = await uploadMedia(user.id, 'works', file)
      await deleteMedia(work.image_path)
      const { error: updateError } = await requireSupabase()
        .from('works')
        .update({ image_path: path })
        .eq('id', work.id)
      if (updateError) throw updateError
      await loadContent()
      setMessage('Work image updated.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setBusy(false)
    }
  }

  async function uploadWorkFile(work: Work, file: File | null) {
    if (!file || !user) return
    setBusy(true)
    setError(null)
    try {
      const path = await uploadMedia(user.id, 'files', file)
      await deleteMedia(work.file_path)
      const { error: updateError } = await requireSupabase()
        .from('works')
        .update({ file_path: path })
        .eq('id', work.id)
      if (updateError) throw updateError
      await loadContent()
      setMessage('Work file updated. Visitors can open it in the in-browser viewer.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setBusy(false)
    }
  }

  async function deleteWork(work: Work) {
    if (!confirm(`Delete “${work.title}”?`)) return
    setBusy(true)
    try {
      await deleteMedia(work.image_path)
      await deleteMedia(work.file_path)
      const { error: deleteError } = await requireSupabase()
        .from('works')
        .delete()
        .eq('id', work.id)
      if (deleteError) throw deleteError
      await loadContent()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed')
    } finally {
      setBusy(false)
    }
  }

  async function addExperience() {
    if (!user) return
    setBusy(true)
    try {
      const { error: insertError } = await requireSupabase().from('experience').insert({
        owner_id: user.id,
        role: 'New role',
        org: '',
        period: '',
        detail: '',
        sort_order: experience.length,
      })
      if (insertError) throw insertError
      await loadContent()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not add experience')
    } finally {
      setBusy(false)
    }
  }

  async function saveExperience(item: Experience) {
    setBusy(true)
    try {
      const { error: updateError } = await requireSupabase()
        .from('experience')
        .update({
          role: item.role,
          org: item.org,
          period: item.period,
          detail: item.detail,
        })
        .eq('id', item.id)
      if (updateError) throw updateError
      setMessage('Experience saved.')
      await loadContent()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save experience')
    } finally {
      setBusy(false)
    }
  }

  async function deleteExperience(item: Experience) {
    if (!confirm(`Delete “${item.role}”?`)) return
    setBusy(true)
    try {
      const { error: deleteError } = await requireSupabase()
        .from('experience')
        .delete()
        .eq('id', item.id)
      if (deleteError) throw deleteError
      await loadContent()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed')
    } finally {
      setBusy(false)
    }
  }

  if (!draft) {
    return (
      <div className="shell-status">
        <p>Loading studio…</p>
      </div>
    )
  }

  const heroPreview = mediaUrl(draft.hero_path)
  const resumePreview = mediaUrl(draft.resume_file_path)

  return (
    <div className="studio-shell">
      <header className="studio-header">
        <Link to="/" className="studio-brand">
          Portfolio Studio
        </Link>
        <nav className="studio-nav">
          <Link to={`/u/${draft.slug}`}>View public page</Link>
          {draft.is_admin ? <Link to="/studio/invites">Invites</Link> : null}
          <button type="button" className="text-btn" onClick={() => void signOut()}>
            Sign out
          </button>
        </nav>
      </header>

      <h1>Studio</h1>
      <p className="muted">
        Your public page only shows the copy and media you set here — no Portfolio Studio
        branding.
      </p>

      {message ? <p className="form-ok">{message}</p> : null}
      {error ? <p className="form-error">{error}</p> : null}

      <form className="studio-card form-grid" onSubmit={(e) => void saveProfile(e)}>
        <h2>Profile</h2>
        <label>
          Display name
          <input
            value={draft.display_name}
            onChange={(e) => setDraft({ ...draft, display_name: e.target.value })}
            required
          />
        </label>
        <label>
          Slug
          <input
            value={draft.slug}
            onChange={(e) => setDraft({ ...draft, slug: normalizeSlug(e.target.value) })}
            required
          />
          <span className="field-hint">/u/{draft.slug}</span>
        </label>
        <label>
          Headline
          <input
            value={draft.headline}
            onChange={(e) => setDraft({ ...draft, headline: e.target.value })}
          />
        </label>
        <label>
          Bio
          <textarea
            rows={4}
            value={draft.bio}
            onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
          />
        </label>
        <label>
          Contact email
          <input
            type="email"
            value={draft.contact_email}
            onChange={(e) => setDraft({ ...draft, contact_email: e.target.value })}
          />
        </label>
        <label>
          Primary CTA label
          <input
            value={draft.cta_primary_label}
            onChange={(e) => setDraft({ ...draft, cta_primary_label: e.target.value })}
            placeholder="e.g. View work"
          />
        </label>
        <label>
          Secondary CTA label
          <input
            value={draft.cta_secondary_label}
            onChange={(e) => setDraft({ ...draft, cta_secondary_label: e.target.value })}
            placeholder="e.g. Contact me"
          />
        </label>
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={draft.allow_downloads}
            onChange={(e) => setDraft({ ...draft, allow_downloads: e.target.checked })}
          />
          <span>
            Allow visitors to download media and resume files (viewing in-browser always
            allowed)
          </span>
        </label>
        <label>
          Hero image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => void onHeroUpload(e.target.files?.[0] ?? null)}
          />
        </label>
        {heroPreview ? <img className="studio-thumb" src={heroPreview} alt="" /> : null}
        <button type="submit" className="cta primary" disabled={busy}>
          Save profile
        </button>
      </form>

      <form className="studio-card form-grid" onSubmit={(e) => void saveProfile(e)}>
        <h2>Section copy</h2>
        <p className="muted small">
          Leave a field blank to hide that label or section intro on your public page.
        </p>
        <label>
          Work section title
          <input
            value={draft.work_section_title}
            onChange={(e) => setDraft({ ...draft, work_section_title: e.target.value })}
          />
        </label>
        <label>
          Work section blurb
          <textarea
            rows={2}
            value={draft.work_section_blurb}
            onChange={(e) => setDraft({ ...draft, work_section_blurb: e.target.value })}
          />
        </label>
        <label>
          Resume section title
          <input
            value={draft.resume_section_title}
            onChange={(e) => setDraft({ ...draft, resume_section_title: e.target.value })}
          />
        </label>
        <label>
          Resume section blurb
          <textarea
            rows={2}
            value={draft.resume_section_blurb}
            onChange={(e) => setDraft({ ...draft, resume_section_blurb: e.target.value })}
          />
        </label>
        <label>
          Contact section title
          <input
            value={draft.contact_section_title}
            onChange={(e) => setDraft({ ...draft, contact_section_title: e.target.value })}
          />
        </label>
        <label>
          Contact section blurb
          <textarea
            rows={2}
            value={draft.contact_section_blurb}
            onChange={(e) => setDraft({ ...draft, contact_section_blurb: e.target.value })}
          />
        </label>
        <label>
          Resume file (PDF preferred)
          <input
            type="file"
            accept=".pdf,image/*,video/*"
            onChange={(e) => void onResumeUpload(e.target.files?.[0] ?? null)}
          />
        </label>
        {resumePreview ? (
          <a className="field-hint" href={resumePreview} target="_blank" rel="noreferrer">
            Current resume file
          </a>
        ) : null}
        <button type="submit" className="cta primary" disabled={busy}>
          Save section copy
        </button>
      </form>

      <section className="studio-card">
        <div className="studio-section-head">
          <h2>Work</h2>
          <button type="button" className="cta ghost" onClick={() => void addWork()} disabled={busy}>
            Add work
          </button>
        </div>
        <ul className="studio-list">
          {works.map((work) => (
            <li key={work.id} className="studio-list-item">
              <div className="form-grid">
                <label>
                  Title
                  <input
                    value={work.title}
                    onChange={(e) =>
                      setWorks((rows) =>
                        rows.map((w) =>
                          w.id === work.id ? { ...w, title: e.target.value } : w,
                        ),
                      )
                    }
                  />
                </label>
                <label>
                  Role
                  <input
                    value={work.role}
                    onChange={(e) =>
                      setWorks((rows) =>
                        rows.map((w) =>
                          w.id === work.id ? { ...w, role: e.target.value } : w,
                        ),
                      )
                    }
                  />
                </label>
                <label>
                  Year
                  <input
                    value={work.year}
                    onChange={(e) =>
                      setWorks((rows) =>
                        rows.map((w) =>
                          w.id === work.id ? { ...w, year: e.target.value } : w,
                        ),
                      )
                    }
                  />
                </label>
                <label>
                  Alt text
                  <input
                    value={work.alt}
                    onChange={(e) =>
                      setWorks((rows) =>
                        rows.map((w) =>
                          w.id === work.id ? { ...w, alt: e.target.value } : w,
                        ),
                      )
                    }
                  />
                </label>
                <label>
                  External link (optional)
                  <input
                    value={work.link_url ?? ''}
                    onChange={(e) =>
                      setWorks((rows) =>
                        rows.map((w) =>
                          w.id === work.id ? { ...w, link_url: e.target.value } : w,
                        ),
                      )
                    }
                    placeholder="https://"
                  />
                </label>
                <label>
                  Cover image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      void uploadWorkImage(work, e.target.files?.[0] ?? null)
                    }
                  />
                </label>
                {mediaUrl(work.image_path) ? (
                  <img className="studio-thumb" src={mediaUrl(work.image_path)!} alt="" />
                ) : null}
                <label>
                  Viewable file (PDF, video, etc.)
                  <input
                    type="file"
                    accept=".pdf,image/*,video/*"
                    onChange={(e) =>
                      void uploadWorkFile(work, e.target.files?.[0] ?? null)
                    }
                  />
                </label>
                {mediaUrl(work.file_path) ? (
                  <a
                    className="field-hint"
                    href={mediaUrl(work.file_path)!}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Current file
                  </a>
                ) : null}
                <div className="row-actions">
                  <button
                    type="button"
                    className="cta primary"
                    disabled={busy}
                    onClick={() => void saveWork(work)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="cta ghost danger"
                    disabled={busy}
                    onClick={() => void deleteWork(work)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="studio-card">
        <div className="studio-section-head">
          <h2>Resume entries</h2>
          <button
            type="button"
            className="cta ghost"
            onClick={() => void addExperience()}
            disabled={busy}
          >
            Add experience
          </button>
        </div>
        <ul className="studio-list">
          {experience.map((item) => (
            <li key={item.id} className="studio-list-item">
              <div className="form-grid">
                <label>
                  Role
                  <input
                    value={item.role}
                    onChange={(e) =>
                      setExperience((rows) =>
                        rows.map((r) =>
                          r.id === item.id ? { ...r, role: e.target.value } : r,
                        ),
                      )
                    }
                  />
                </label>
                <label>
                  Organization
                  <input
                    value={item.org}
                    onChange={(e) =>
                      setExperience((rows) =>
                        rows.map((r) =>
                          r.id === item.id ? { ...r, org: e.target.value } : r,
                        ),
                      )
                    }
                  />
                </label>
                <label>
                  Period
                  <input
                    value={item.period}
                    onChange={(e) =>
                      setExperience((rows) =>
                        rows.map((r) =>
                          r.id === item.id ? { ...r, period: e.target.value } : r,
                        ),
                      )
                    }
                  />
                </label>
                <label>
                  Detail
                  <textarea
                    rows={3}
                    value={item.detail}
                    onChange={(e) =>
                      setExperience((rows) =>
                        rows.map((r) =>
                          r.id === item.id ? { ...r, detail: e.target.value } : r,
                        ),
                      )
                    }
                  />
                </label>
                <div className="row-actions">
                  <button
                    type="button"
                    className="cta primary"
                    disabled={busy}
                    onClick={() => void saveExperience(item)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="cta ghost danger"
                    disabled={busy}
                    onClick={() => void deleteExperience(item)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
