import type { PitchProject } from './pitches'

/** Employment history cards shared by every per-employer pitch page. */
export const TRUCKSAIL: PitchProject = {
  title: 'TruckSail — Software Developer',
  meta: 'Feb 2020 – Jan 2021 · Ancaster, ON · C++, STM32, CAN, JavaScript, SQL',
  summary:
    'Wrote C++ firmware for truck ECU devices (STM32, CAN bus) with defect finding for reliability; built JS/Bootstrap UIs and optimized SQL. Maintained GitHub workflows; cross-browser QA and password-management security support.',
}

export const OUTFUSION: PitchProject = {
  title: 'OutFusion — Game Developer',
  meta: 'Feb 2022 – Dec 2022 · Hamilton, ON · C#',
  summary:
    'Implemented game UI/UX from the design docs; built and tested C# REST API integrations for player data, integrated and tested game UI across mobile and desktop, and partnered on bug verification and release quality.',
}

export const EVENICA: PitchProject = {
  title: 'Evenica — Software Developer & QA Tester',
  meta: 'May 2018 – Sep 2019 · Burlington, ON · T-SQL, C#, Linux, Laravel',
  summary:
    'Built and tested software for clients including Andrew Peller, Young’s Market Company and MM Realty International, using T-SQL, C#, Linux, and Laravel (MySQL, PHP, JavaScript/jQuery, Vue.js).',
}

/** Most recent first, matching the résumés. */
export const WORK_HISTORY: PitchProject[] = [OUTFUSION, TRUCKSAIL, EVENICA]
