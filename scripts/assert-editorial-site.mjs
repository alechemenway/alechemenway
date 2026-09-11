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
assert.equal(
  about('.about-portrait-hero').length,
  1,
  'About uses approved Portrait layout',
)
assert.equal(
  about('.about-portrait-hero a[href="mailto:alec@hemenway.io"]').length,
  1,
)
assert.equal(about('.about-portrait-hero a[download]').length, 1)
assert.equal(
  about('.about-portrait-photo img').attr('alt'),
  'Alec in a gray sweater',
)
assert.ok(about('.about-portrait-photo img').attr('sizes'))
assert.equal(
  about('.about-portrait-lead').text().replace(/\s+/g, ' ').trim(),
  'My background is in enterprise sales, including roles at Jamf and Staffbase. My AI work now includes a client engagement with a wealth-management firm and product projects in sales and caregiver workflows.',
)
assert.equal(
  about('.about-portrait-bio p').text().replace(/\s+/g, ' ').trim(),
  'I’m interested in the decisions that connect a sale to a working implementation: what to solve, what to buy or build, and what the customer needs to see before trusting it. Outside work, you’ll find me on a golf course or a trail.',
)
assert.equal(
  about('.about-portrait-opportunity a[href="mailto:alec@hemenway.io"]').length,
  1,
)
const resume = about('a[download]')
assert.equal(resume.attr('href'), '/Alec_Hemenway_Resume_2026_v14.pdf')
const resumeResponse = await fetch(new URL(resume.attr('href'), base))
assert.equal(resumeResponse.status, 200)
assert.match(resumeResponse.headers.get('content-type'), /application\/pdf/)
for (const slug of ['acceptance-criteria', 'workflow']) {
  const $ = pages.get(`/writing/${slug}`)
  assert.doesNotMatch(
    $('meta[name="robots"]').attr('content') || '',
    /noindex|nofollow/,
  )
  assert.match($('.section-label').first().text(), /Essay/)
  assert.doesNotMatch($('main').text(), /Essay draft/)
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
  'PASS: 9 routes; homepage hierarchy, local links, evidence limits, exact essay text, publication robots, résumé, and legacy pages.',
)
