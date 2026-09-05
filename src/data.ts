export type WorkItem = {
  id: string
  title: string
  role: string
  year: string
  image: string
  alt: string
}

export type ExperienceItem = {
  id: string
  role: string
  org: string
  period: string
  detail: string
}

export const works: WorkItem[] = [
  {
    id: 'northline',
    title: 'Northline Frames',
    role: 'Direction & edit',
    year: '2025',
    image:
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1600&q=80',
    alt: 'Camera lens catching golden light against a dark backdrop',
  },
  {
    id: 'harbor',
    title: 'Harbor Still',
    role: 'Photography',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    alt: 'Misty coastline at dawn with soft layered hills',
  },
  {
    id: 'atelier',
    title: 'Atelier Notes',
    role: 'Brand film',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b824cc32?auto=format&fit=crop&w=1600&q=80',
    alt: 'Vintage camera resting on a wooden surface',
  },
  {
    id: 'signal',
    title: 'Signal Room',
    role: 'Motion design',
    year: '2023',
    image:
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1600&q=80',
    alt: 'Film projector casting light in a dark screening room',
  },
]

export const experience: ExperienceItem[] = [
  {
    id: 'lead',
    role: 'Creative Director',
    org: 'Portfolio Studio',
    period: '2022 — Present',
    detail:
      'Lead concept, shoot direction, and editorial finishing for brand films and still campaigns.',
  },
  {
    id: 'editor',
    role: 'Senior Editor',
    org: 'Frame & Field',
    period: '2019 — 2022',
    detail:
      'Cut long-form documentary and commercial spots; established a shared finishing pipeline.',
  },
  {
    id: 'photo',
    role: 'Photographer',
    org: 'Independent',
    period: '2016 — 2019',
    detail:
      'Location and portrait work for magazines, musicians, and small product brands.',
  },
]
