import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { load } from 'cheerio'

const base = process.env.SITE_URL || 'http://127.0.0.1:4318'
const routes = [
  '/',
  '/about',
  '/work/ria',
  '/work/rep-coaching',
  '/work/dailyok',
  '/writing/acceptance-criteria',
  '/writing/workflow',
  '/projects',
  '/work-with-me',
]
const pages = new Map()
for (const route of routes) {
  const response = await fetch(new URL(route, base))
  assert.equal(response.status, 200, `${route} must render`)
  const $ = load(await response.text())
  pages.set(route, $)
  assert.equal($('h1').length, 1, `${route}: one h1`)
  const ids = $('[id]')
    .map((_, el) => $(el).attr('id'))
    .get()
  assert.equal(ids.length, new Set(ids).size, `${route}: unique IDs`)
  if (!['/projects', '/work-with-me'].includes(route)) {
    assert.equal($('header nav[aria-label="Main navigation"]').length, 1)
    assert.equal($('main').length, 1)
    assert.ok(!$('body').text().includes('Compare directions'))
    $('a[target="_blank"]').each((_, el) => {
      assert.match($(el).attr('rel') || '', /noopener/)
      assert.match($(el).attr('rel') || '', /noreferrer/)
    })
  }
}
const home = pages.get('/')
assert.deepEqual(
  home('main > section')
    .map((_, el) => home(el).attr('id'))
    .get(),
  ['introduction', 'perspective', 'work', 'thinking', 'about', 'connect'],
)
assert.equal(home('#work article').length, 3)
assert.match(
  home('.hero-description').text(),
  /founders and customer-facing leaders at AI companies/,
)
assert.match(home('.case-result').text(), /one advisor’s single session/)
assert.match(home('.case-result').text(), /checking questionable details/)
assert.ok(
  !home('main').text().includes('Open to the right full-time opportunity'),
)
for (const route of ['/', '/work/ria']) {
  const $ = pages.get(route)
  assert.equal($('.ria-example').length, 1)
  assert.match(
    $('.sample-disclaimer').text(),
    /Not actual client output or evaluation results/,
  )
  assert.equal($('details.sample-source #sample-source').length, 1)
  assert.equal($('a[href="#sample-source"]').length, 1)
}
const about = pages.get('/about')
assert.match(about('main').text(), /Open to the right full-time opportunity/)
const resume = about('a[download]')
assert.equal(resume.attr('href'), '/Alec_Hemenway_Resume_2026_v14.pdf')
const resumeResponse = await fetch(new URL(resume.attr('href'), base))
assert.equal(resumeResponse.status, 200)
assert.match(resumeResponse.headers.get('content-type'), /application\/pdf/)
for (const slug of ['acceptance-criteria', 'workflow']) {
  const $ = pages.get(`/writing/${slug}`)
  assert.match($('meta[name="robots"]').attr('content'), /noindex/)
  assert.match($('.section-label').first().text(), /Essay draft/)
  const expected = JSON.parse(
    readFileSync(new URL(`../tests/content/${slug}.json`, import.meta.url)),
  )
  assert.deepEqual(
    $('.reading-body p, .reading-body li')
      .map((_, el) => $(el).text().trim())
      .get(),
    expected,
  )
}
for (const [route, $] of pages) {
  if (['/projects', '/work-with-me'].includes(route)) continue
  for (const el of $('a[href]').toArray()) {
    const url = new URL($(el).attr('href'), new URL(route, base))
    if (url.origin !== new URL(base).origin || !pages.has(url.pathname))
      continue
    if (url.hash)
      assert.ok(
        pages.get(url.pathname)(`[id="${url.hash.slice(1)}"]`).length,
        `${route}: broken ${url.href}`,
      )
  }
}
console.log(
  'PASS: 9 routes; homepage hierarchy, local links, evidence limits, exact essay text, draft robots, résumé, and legacy pages.',
)
