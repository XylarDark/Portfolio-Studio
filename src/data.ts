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
    image: '/media/work-1.jpg',
    alt: 'Film crew operating a RED cinema camera on a city street',
  },
  {
    id: 'harbor',
    title: 'Harbor Still',
    role: 'Photography',
    year: '2024',
    image: '/media/work-2.jpg',
    alt: 'Misty forest hills under soft light',
  },
  {
    id: 'atelier',
    title: 'Atelier Notes',
    role: 'Brand film',
    year: '2024',
    image: '/media/work-3.jpg',
    alt: 'Vintage camera on a wooden table',
  },
  {
    id: 'signal',
    title: 'Signal Room',
    role: 'Motion design',
    year: '2023',
    image: '/media/work-4.jpg',
    alt: 'Lush green foliage lit for a motion still',
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
