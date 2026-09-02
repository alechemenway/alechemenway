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

if ($('main h1').length !== 1 || $('main h1').hasClass('sr-only')) {
  throw new Error('About should render one visible H1.')
}

if (
  $('main h1').text().replaceAll(/\s+/g, ' ').trim() !==
  'Enterprise AE with commit history.'
) {
  throw new Error('About H1 should show the approved commit-history headline.')
}

const counters = $('[data-count-up]')
const expectedCounters = [
  { value: '$3M', target: '3', prefix: '$', suffix: 'M' },
  { value: '2023', target: '2023', prefix: '', suffix: '' },
  { value: '60+', target: '60', prefix: '', suffix: '+' },
]

if (counters.length !== expectedCounters.length) {
  throw new Error('About should render exactly three count-up proof points.')
}

expectedCounters.forEach((expected, index) => {
  const counter = counters.eq(index)
  if (
    counter.text().trim() !== expected.value ||
    counter.attr('data-count-up') !== expected.target ||
    (counter.attr('data-prefix') ?? '') !== expected.prefix ||
    (counter.attr('data-suffix') ?? '') !== expected.suffix
  ) {
    throw new Error(`Count-up proof point ${index + 1} is misconfigured.`)
  }
})

const highlightedStats = $('[data-highlight-stat]')
  .toArray()
  .map((element) => $(element).text().trim())
const expectedHighlightedStats = [
  '$1.6M',
  '$112K',
  '#2 of 22',
  '97%',
  '$1.4M',
  '75%',
]

if (
  highlightedStats.length !== expectedHighlightedStats.length ||
  expectedHighlightedStats.some((stat) => !highlightedStats.includes(stat))
) {
  throw new Error(
    'About should highlight the six approved recruiter-scan stats.',
  )
}

const dividers = $('[data-motion-divider]')
if (
  dividers.length !== 3 ||
  dividers.toArray().some((divider) => {
    const dots = $(divider).children()
    return (
      dots.length !== 3 || dots.toArray().some((dot) => $(dot).text() !== '.')
    )
  })
) {
  throw new Error('About should render three literal "..." section dividers.')
}

if ($('[data-portrait-motion]').length !== 1) {
  throw new Error('About should expose one portrait motion target.')
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
    href: '/Alec_Hemenway_Resume_2026_1pg_v5.1.pdf',
  },
  {
    provenance: 'Self-reported context',
    label: 'Résumé — sourcing outcomes',
    href: '/Alec_Hemenway_Resume_2026_1pg_v5.1.pdf',
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

if (
  !pageText.includes(
    'Published artifacts you can install today. No adoption numbers claimed.',
  )
) {
  throw new Error('The 60+ artifact count needs its approved qualifier.')
}

const expectedCopy = [
  '$3M self-sourced pipeline·Pinnacle Club 2023 (top 5%)·60+ Claude Code skills',
  'The number came first, and I carried it for 7 years before wiring in any AI.',
  "I've spent the last 7 years selling enterprise software, SDR through Senior AE. The record: 100%+ at Jamf in 2021 and 2022 (#3 of ~30), 112% of $460K in 2023 (Pinnacle Club, top 5% globally).",
  '100%+ in 2021 and 2022 (#3 of ~30); 97% of $690K at Staffbase, #2 of 22; Pinnacle Club 2023 (top 5% globally).',
  'The change was the operating model: how I find and reach the right accounts.',
  'closed $112K net-new ARR across 4 wins by wiring Claude into every step that used to eat my week: buyer-signal research,',
  'The result is infrastructure: skills, MCPs, and eval harnesses I run in production against real accounts.',
  'Every AI claim links to something you can read or run.',
  "I've published 60+ open-source Claude Code skills",
  'I sell the category I build in, and I can talk to a CRO and an engineer in the same meeting.',
  'Open-source skills and eval infrastructure. The 60+ counts published artifacts.',
  '112% at Jamf in 2023; 100%+ in 2021 and 2022; 97% at Staffbase, #2 of 22; Pinnacle Club 2023 (top 5% globally).',
  'the next high-stakes enterprise AE seat, ideally at a company building or selling AI.',
  'Tell me about the seat and the number.',
]

expectedCopy.forEach((copy) => {
  if (!pageText.includes(copy)) {
    throw new Error(`About is missing approved copy: ${copy}`)
  }
})

const attainmentLabel = $('main div').filter(
  (_, element) =>
    $(element).text().trim() === 'of $460K quota, Jamf 2023',
)

if (
  attainmentLabel.length !== 1 ||
  attainmentLabel.prev('div').text().trim() !== '112%'
) {
  throw new Error('The Jamf 2023 attainment stat block is misconfigured.')
}

const contactActions = $('[data-contact-action]')
const expectedContactActions = [
  ['Email', 'mailto:alec@hemenway.io'],
  ['LinkedIn', 'https://www.linkedin.com/in/alec-hemenway/'],
  ['GitHub', 'https://github.com/alechemenway'],
  ['Résumé', '/Alec_Hemenway_Resume_2026_1pg_v5.1.pdf'],
]

if (contactActions.length !== expectedContactActions.length) {
  throw new Error('About should render exactly four closing contact actions.')
}

expectedContactActions.forEach(([label, href], index) => {
  const action = contactActions.eq(index)
  if (action.text().trim() !== label || action.attr('href') !== href) {
    throw new Error(`Closing contact action ${index + 1} is misconfigured.`)
  }
})

if ($('[data-primary-action="true"]').length !== 0) {
  throw new Error(
    'The four-link closing CTA should not retain a competing action.',
  )
}

console.log('Rendered About page matches the approved Field Notes contract.')
