export type Profile = {
  id: string
  slug: string
  display_name: string
  headline: string
  bio: string
  contact_email: string
  hero_path: string | null
  work_section_title: string
  work_section_blurb: string
  resume_section_title: string
  resume_section_blurb: string
  contact_section_title: string
  contact_section_blurb: string
  cta_primary_label: string
  cta_secondary_label: string
  allow_downloads: boolean
  resume_file_path: string | null
  accent_color: string
  display_font: string
  is_admin: boolean
  created_at: string
  updated_at: string
}

export type Work = {
  id: string
  owner_id: string
  title: string
  role: string
  year: string
  image_path: string | null
  file_path: string | null
  link_url: string | null
  alt: string
  sort_order: number
  created_at: string
  updated_at: string
}

export type Experience = {
  id: string
  owner_id: string
  role: string
  org: string
  period: string
  detail: string
  sort_order: number
  created_at: string
  updated_at: string
}

export type Invite = {
  id: string
  token: string
  created_by: string
  expires_at: string
  redeemed_by: string | null
  redeemed_at: string | null
  created_at: string
}

export type PortfolioBundle = {
  profile: Profile
  works: Work[]
  experience: Experience[]
}

export type ViewerAsset = {
  title: string
  subtitle?: string
  imageUrl?: string | null
  fileUrl?: string | null
  linkUrl?: string | null
  embedUrl?: string | null
  kind: 'image' | 'pdf' | 'video' | 'link' | 'embed' | 'unknown'
}

/** Opportunity type for Iteration 0 filters. */
export type JobKind = 'job' | 'gig' | 'project'

/** Craft buckets for creatives / entrepreneurs. */
export type JobCraft =
  | 'design'
  | 'photo'
  | 'film'
  | 'writing'
  | 'illustration'
  | 'product'
  | 'founding'

/** Normalized opening for the Iteration 0 swipe loop (mocks only). */
export type JobListing = {
  id: string
  title: string
  company: string
  location: string
  remote: 'remote' | 'hybrid' | 'onsite'
  kind: JobKind
  craft: JobCraft
  blurb: string
  source: string
  applyUrl: string
  tags?: string[]
}

export type JobFilters = {
  kinds: JobKind[]
  crafts: JobCraft[]
  remotes: Array<JobListing['remote']>
}

/** Iteration 0 pace knobs — keep in sync with docs/ITERATION-0.md */
export const ITERATION_0 = {
  deckSize: 10,
  dailyBudget: 15,
  cooldownMs: 4000,
  unlockEvery: 5,
} as const
