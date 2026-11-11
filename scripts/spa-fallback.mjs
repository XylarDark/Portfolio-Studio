// Runs after `npm run build` (postbuild). GitHub Pages has no rewrites: unknown paths get 404.html with HTTP 404.
// Copy index.html into each known route so shared links return 200 (link
// checkers, ATS previews and search engines treat a 404 as a broken link).
import { copyFileSync, mkdirSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const dist = 'dist'
const index = join(dist, 'index.html')
copyFileSync(index, join(dist, '404.html'))

const routes = new Set(['u/admin', 'u/admin/portfolio'])
for (const file of readdirSync('src/lib').filter((f) => /^pitch.*\.ts$/.test(f))) {
  const src = readFileSync(join('src/lib', file), 'utf8')
  for (const m of src.matchAll(/["']?key["']?\s*:\s*["']([a-z0-9-]+)["']/g)) routes.add(`u/admin/${m[1]}`)
}
for (const route of routes) {
  mkdirSync(join(dist, route), { recursive: true })
  copyFileSync(index, join(dist, route, 'index.html'))
}
console.log(`SPA fallback: 404.html + ${routes.size} routes: ${[...routes].join(', ')}`)
