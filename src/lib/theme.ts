import type { CSSProperties } from 'react'

export const DISPLAY_FONTS = {
  syne: {
    label: 'Syne (default)',
    family: "'Syne', sans-serif",
  },
  instrument: {
    label: 'Instrument Serif',
    family: "'Instrument Serif', Georgia, serif",
  },
  space: {
    label: 'Space Grotesk',
    family: "'Space Grotesk', system-ui, sans-serif",
  },
} as const

export type DisplayFontKey = keyof typeof DISPLAY_FONTS

export function isDisplayFontKey(value: string | null | undefined): value is DisplayFontKey {
  return Boolean(value && value in DISPLAY_FONTS)
}

function mixTowardWhite(hex: string, amount: number): string {
  const raw = hex.replace('#', '')
  const r = Number.parseInt(raw.slice(0, 2), 16)
  const g = Number.parseInt(raw.slice(2, 4), 16)
  const b = Number.parseInt(raw.slice(4, 6), 16)
  const mix = (channel: number) => Math.round(channel + (255 - channel) * amount)
  const toHex = (channel: number) => mix(channel).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export function isAccentHex(value: string | null | undefined): value is string {
  return Boolean(value && /^#[0-9A-Fa-f]{6}$/.test(value))
}

export function portfolioThemeStyle(profile: {
  accent_color?: string | null
  display_font?: string | null
}): CSSProperties {
  const style: Record<string, string> = {}

  if (isAccentHex(profile.accent_color)) {
    style['--accent'] = profile.accent_color
    style['--accent-strong'] = mixTowardWhite(profile.accent_color, 0.28)
  }

  if (isDisplayFontKey(profile.display_font)) {
    style['--font-display'] = DISPLAY_FONTS[profile.display_font].family
  }

  return style as CSSProperties
}
