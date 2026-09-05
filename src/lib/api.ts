import type { Experience, PortfolioBundle, Profile, Work } from './types'
import { mediaUrl, requireSupabase } from './supabase'

export async function fetchPortfolioBySlug(slug: string): Promise<PortfolioBundle | null> {
  const client = requireSupabase()
  const { data: profile, error } = await client
    .from('profiles')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (error) throw error
  if (!profile) return null

  const [{ data: works, error: worksError }, { data: experience, error: expError }] =
    await Promise.all([
      client
        .from('works')
        .select('*')
        .eq('owner_id', profile.id)
        .order('sort_order', { ascending: true }),
      client
        .from('experience')
        .select('*')
        .eq('owner_id', profile.id)
        .order('sort_order', { ascending: true }),
    ])

  if (worksError) throw worksError
  if (expError) throw expError

  return {
    profile: profile as Profile,
    works: (works ?? []) as Work[],
    experience: (experience ?? []) as Experience[],
  }
}

export async function fetchOwnProfile(userId: string): Promise<Profile | null> {
  const client = requireSupabase()
  const { data, error } = await client
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle()
  if (error) throw error
  return (data as Profile | null) ?? null
}

export async function uploadMedia(
  userId: string,
  folder: 'hero' | 'works' | 'resume' | 'files',
  file: File,
): Promise<string> {
  const client = requireSupabase()
  const ext = file.name.split('.').pop()?.toLowerCase() || 'bin'
  const path = `${userId}/${folder}/${crypto.randomUUID()}.${ext}`
  const { error } = await client.storage.from('portfolio-media').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type || undefined,
  })
  if (error) throw error
  return path
}

export async function deleteMedia(path: string | null | undefined): Promise<void> {
  if (!path || path.startsWith('/') || path.startsWith('http')) return
  const client = requireSupabase()
  await client.storage.from('portfolio-media').remove([path])
}

export { mediaUrl }
