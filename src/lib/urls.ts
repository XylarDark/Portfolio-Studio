/** App paths that respect Vite `base` (needed for GitHub Pages project sites). */
export function withBase(path: string): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${base}${normalized}` || '/'
}

export function absoluteAppUrl(path: string): string {
  if (typeof window === 'undefined') return withBase(path)
  return `${window.location.origin}${withBase(path)}`
}

export function routerBasename(): string | undefined {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  return base || undefined
}
