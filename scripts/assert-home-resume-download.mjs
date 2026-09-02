import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import ts from 'typescript'

const __dirname = dirname(fileURLToPath(import.meta.url))
const resumeFileName = 'Alec_Hemenway_Resume_2026_1pg_v5.1.pdf'

const heroPath = resolve(__dirname, '../src/components/home/Hero.tsx')
const hero = readFileSync(heroPath, 'utf8')
const sourceFile = ts.createSourceFile(
  heroPath,
  hero,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TSX,
)

let resumeButton
function visit(node) {
  if (
    ts.isJsxElement(node) &&
    node.openingElement.tagName.getText(sourceFile) === 'Button' &&
    node.children.some((child) => child.getText(sourceFile).includes('Résumé'))
  ) {
    resumeButton = node.openingElement
    return
  }
  ts.forEachChild(node, visit)
}
visit(sourceFile)

if (!resumeButton) {
  throw new Error('Could not find the homepage Résumé button.')
}

function getStringAttribute(name) {
  const attribute = resumeButton.attributes.properties.find(
    (property) => ts.isJsxAttribute(property) && property.name.text === name,
  )
  return attribute &&
    ts.isJsxAttribute(attribute) &&
    attribute.initializer &&
    ts.isStringLiteral(attribute.initializer)
    ? attribute.initializer.text
    : undefined
}

if (getStringAttribute('href') !== `/${resumeFileName}`) {
  throw new Error('The homepage Résumé button points to the wrong file.')
}

if (getStringAttribute('download') !== resumeFileName) {
  throw new Error(
    'The homepage Résumé button should explicitly download the current PDF.',
  )
}

if (getStringAttribute('target') !== '_blank') {
  throw new Error('The homepage Résumé button should open in a new tab.')
}

if (getStringAttribute('rel') !== 'noopener noreferrer') {
  throw new Error(
    'The homepage Résumé button should protect the new-tab opener context.',
  )
}

console.log('Homepage Résumé button targets the current PDF.')
