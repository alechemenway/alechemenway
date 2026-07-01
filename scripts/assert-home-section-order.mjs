import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const homePage = readFileSync(resolve(__dirname, '../src/app/page.tsx'), 'utf8')
const hero = readFileSync(
  resolve(__dirname, '../src/components/home/Hero.tsx'),
  'utf8',
)
const closingBand = readFileSync(
  resolve(__dirname, '../src/components/ClosingBand.tsx'),
  'utf8',
)

const soldSectionIndex = homePage.indexOf(
  'Where I&rsquo;ve <Accent>sold.</Accent>',
)
const shippedSectionIndex = homePage.indexOf(
  'AI systems I&rsquo;ve <Accent>shipped.</Accent>',
)

if (soldSectionIndex === -1) {
  throw new Error('Could not find the "Where I’ve sold" section heading.')
}

if (shippedSectionIndex === -1) {
  throw new Error(
    'Could not find the "AI systems I’ve shipped" section heading.',
  )
}

if (soldSectionIndex > shippedSectionIndex) {
  throw new Error(
    '"Where I’ve sold" should appear before "AI systems I’ve shipped" on the home page.',
  )
}

const requiredSnippets = [
  {
    description: 'metric band has equal vertical spacing above and below',
    snippet: 'my-16 border-y border-line bg-bg-2 max-[880px]:my-10',
  },
  {
    description: 'metric grid keeps every metric box the same height',
    snippet: 'auto-rows-fr',
  },
  {
    description:
      'metric boxes center their content horizontally and vertically',
    snippet:
      'flex min-h-[188px] flex-col items-center justify-center px-7 py-10 text-center',
  },
  {
    description:
      'receipts section adds a small top correction to match the visual metric-band gaps',
    snippet: '<section className="pt-4 pb-24 max-[880px]:pb-16">',
  },
]

for (const { description, snippet } of requiredSnippets) {
  if (!homePage.includes(snippet)) {
    throw new Error(`Missing expected homepage layout rule: ${description}.`)
  }
}

if (!hero.includes('min-h-[64svh]')) {
  throw new Error(
    'Hero height should keep the metric band visually centered between hero content and receipts.',
  )
}

if (!hero.includes('pt-20 pb-[50px]')) {
  throw new Error(
    'Hero bottom padding should be 30px tighter than the top padding.',
  )
}

if (!closingBand.includes('py-[100px]')) {
  throw new Error('Closing CTA band top and bottom padding should be 100px.')
}

console.log('Home page section order and metrics layout are correct.')
