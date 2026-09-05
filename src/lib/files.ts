import type { ViewerAsset } from './types'

export function detectKind(pathOrUrl: string | null | undefined): ViewerAsset['kind'] {
  if (!pathOrUrl) return 'unknown'
  const clean = pathOrUrl.split('?')[0].toLowerCase()
  if (/\.(png|jpe?g|gif|webp|avif|svg)$/.test(clean)) return 'image'
  if (/\.pdf$/.test(clean)) return 'pdf'
  if (/\.(mp4|webm|ogg|mov)$/.test(clean)) return 'video'
  if (getEmbedSrc(pathOrUrl)) return 'embed'
  if (/^https?:\/\//.test(pathOrUrl)) return 'link'
  return 'unknown'
}

export function isDownloadableKind(kind: ViewerAsset['kind']): boolean {
  return kind === 'image' || kind === 'pdf' || kind === 'video'
}

/** Turn common share URLs into iframe-friendly embed URLs (YouTube, Vimeo, etc.). */
export function getEmbedSrc(url: string | null | undefined): string | null {
  if (!url) return null
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') {
      const id = parsed.pathname.replace(/^\//, '')
      return id ? `https://www.youtube.com/embed/${id}` : null
    }

    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') {
      if (parsed.pathname.startsWith('/embed/')) return parsed.toString()
      const id = parsed.searchParams.get('v')
      if (id) return `https://www.youtube.com/embed/${id}`
      const shorts = parsed.pathname.match(/^\/shorts\/([^/]+)/)
      if (shorts?.[1]) return `https://www.youtube.com/embed/${shorts[1]}`
    }

    if (host === 'vimeo.com') {
      const id = parsed.pathname.split('/').filter(Boolean)[0]
      return id && /^\d+$/.test(id) ? `https://player.vimeo.com/video/${id}` : null
    }

    if (host === 'player.vimeo.com' && parsed.pathname.startsWith('/video/')) {
      return parsed.toString()
    }

    // Already an embeddable path on some hosts
    if (parsed.pathname.includes('/embed/') || parsed.pathname.includes('/player/')) {
      return parsed.toString()
    }
  } catch {
    return null
  }
  return null
}
