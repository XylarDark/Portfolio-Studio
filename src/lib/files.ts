import type { ViewerAsset } from './types'

export function detectKind(pathOrUrl: string | null | undefined): ViewerAsset['kind'] {
  if (!pathOrUrl) return 'unknown'
  const clean = pathOrUrl.split('?')[0].toLowerCase()
  if (/\.(png|jpe?g|gif|webp|avif|svg)$/.test(clean)) return 'image'
  if (/\.pdf$/.test(clean)) return 'pdf'
  if (/\.(mp4|webm|ogg|mov)$/.test(clean)) return 'video'
  if (/^https?:\/\//.test(pathOrUrl)) return 'link'
  return 'unknown'
}

export function isDownloadableKind(kind: ViewerAsset['kind']): boolean {
  return kind === 'image' || kind === 'pdf' || kind === 'video'
}
