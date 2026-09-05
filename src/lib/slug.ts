const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function normalizeSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48)
}

export function isValidSlug(value: string): boolean {
  return value.length >= 2 && value.length <= 48 && SLUG_RE.test(value)
}

export function randomInviteToken(): string {
  const bytes = new Uint8Array(24)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
}
