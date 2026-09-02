import * as cheerio from 'cheerio'

const url = process.env.ABOUT_TEST_URL ?? 'http://127.0.0.1:3010/about'
const response = await fetch(url)

if (!response.ok) {
  throw new Error(`About page returned HTTP ${response.status}.`)
}

const html = await response.text()
const $ = cheerio.load(html)
const pageText = $('main').text().replaceAll(/\s+/g, ' ').trim()
const expectedChapters = [
  ['Field note 01', 'The selling foundation.'],
  ['Field note 02', 'Sourcing becomes a system.'],
  ['Field note 03', 'The system leaves artifacts.'],
]

if ($('main h1').length !== 1 || !$('main h1').hasClass('sr-only')) {
  throw new Error('About should render one screen-reader-only H1.')
}

if ($('main h1').text().trim() !== 'About Alec Hemenway') {
  throw new Error(
    'About H1 should name Alec without restoring the removed headline.',
  )
}

if (
  pageText.includes('I sell enterprise SaaS and self-source pipeline with AI.')
) {
  throw new Error('The removed About headline should not be visible.')
}

if ($('main [style*="opacity:0"]').length > 0) {
  throw new Error('About content should remain visible without JavaScript.')
}

const chapters = $('[data-field-note]')
if (chapters.length !== expectedChapters.length) {
  throw new Error('About should render exactly three field-note chapters.')
}

expectedChapters.forEach(([kicker, heading], index) => {
  const chapter = chapters.eq(index)
  if (
    !chapter.text().includes(kicker) ||
    chapter.find('h2').text().trim() !== heading
  ) {
    throw new Error(
      `Field-note chapter ${index + 1} is missing or out of order.`,
    )
  }
})

const receipts = $('[data-receipt]')
const expectedReceipts = [
  {
    provenance: 'Self-reported context',
    label: 'Résumé — role and quota history',
    href: '/Alec_Hemenway_Resume_2026_1pg_v4.pdf',
  },
  {
    provenance: 'Self-reported context',
    label: 'Résumé — sourcing outcomes',
    href: '/Alec_Hemenway_Resume_2026_1pg_v4.pdf',
  },
  {
    provenance: 'Public artifact',
    label: 'GitHub — open-source work',
    href: 'https://github.com/alechemenway',
  },
]

if (receipts.length !== expectedReceipts.length) {
  throw new Error('About should render exactly three receipt links.')
}

expectedReceipts.forEach((expected, index) => {
  const actual = receipts.eq(index)
  const rel = new Set((actual.attr('rel') ?? '').split(/\s+/))
  const visibleText = actual.text().replaceAll(/\s+/g, ' ').trim()

  if (
    actual.attr('data-provenance') !== expected.provenance ||
    actual.attr('href') !== expected.href ||
    !visibleText.includes(expected.provenance) ||
    !visibleText.includes(expected.label) ||
    actual.attr('target') !== '_blank' ||
    !rel.has('noopener') ||
    !rel.has('noreferrer')
  ) {
    throw new Error(
      `Receipt ${index + 1} does not match its approved contract.`,
    )
  }
})

if (!pageText.includes('not customer adoption or commercial usage')) {
  throw new Error('The 60+ artifact count needs its approved qualifier.')
}

const primaryActions = $('[data-primary-action="true"]')
if (
  primaryActions.length !== 1 ||
  primaryActions.attr('href') !== '/work-with-me'
) {
  throw new Error('About should expose one primary action to Work with me.')
}

if ($('a[href="mailto:alec@hemenway.io"]').length !== 1) {
  throw new Error('About should retain one restrained email link.')
}

console.log('Rendered About page matches the approved Field Notes contract.')
