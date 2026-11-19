# Public vs private content

This repository is **public** and deploys to GitHub Pages from `main`
(https://xylardark.github.io/Portfolio-Studio/). Anything on `main` can
appear on the live site. A private repo cannot use free GitHub Pages, so
the public site’s source stays here.

## What is public

- The studio app, landing page, and invite/studio routes
- The public portfolio at `/u/admin/portfolio`
- Generic resumes: `public/resumes/luke-thompson.pdf` (and `.html`) and
  `public/resumes/luke-thompson-gamedev.pdf`

## What is unlisted but operational

Employer pitch pages at `/u/admin/<company>` and the tailored resume PDFs
they link to (`/resumes/<company>.pdf`) must keep working so employers can
open a direct link. They are **not** linked from the public portfolio nav.
Each pitch page sets `noindex, nofollow`, and `public/robots.txt` disallows
`/u/admin/*` except `/u/admin/portfolio`.

## What must stay out of this repo

Salary asks, application-form answers, application steps, internal notes,
and personal contact details beyond what is already on a résumé (phone or
home address on a pitch page, for example). Those live only in the private
repo [XylarDark/Application-Packs](https://github.com/XylarDark/Application-Packs).
Do not add them here.
