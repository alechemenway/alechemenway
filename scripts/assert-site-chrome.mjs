import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const __dirname = dirname(fileURLToPath(import.meta.url))

function parse(relativePath) {
  const path = resolve(__dirname, relativePath)
  const source = readFileSync(path, 'utf8')
  return {
    sourceFile: ts.createSourceFile(
      path,
      source,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    ),
  }
}

function getStringProperty(object, name) {
  const property = object.properties.find(
    (candidate) =>
      ts.isPropertyAssignment(candidate) &&
      candidate.name.getText().replaceAll(/['"]/g, '') === name,
  )

  return property &&
    ts.isPropertyAssignment(property) &&
    ts.isStringLiteral(property.initializer)
    ? property.initializer.text
    : undefined
}

function getStringAttribute(element, name) {
  const attribute = element.attributes.properties.find(
    (candidate) =>
      ts.isJsxAttribute(candidate) && candidate.name.getText() === name,
  )

  return attribute &&
    ts.isJsxAttribute(attribute) &&
    attribute.initializer &&
    ts.isStringLiteral(attribute.initializer)
    ? attribute.initializer.text
    : undefined
}

const header = parse('../src/components/Header.tsx')
let navLinks

function visitHeader(node) {
  if (
    ts.isVariableDeclaration(node) &&
    node.name.getText(header.sourceFile) === 'navLinks' &&
    node.initializer &&
    ts.isArrayLiteralExpression(node.initializer)
  ) {
    navLinks = node.initializer.elements
      .filter(ts.isObjectLiteralExpression)
      .map((element) => ({
        href: getStringProperty(element, 'href'),
        label: getStringProperty(element, 'label'),
      }))
  }

  ts.forEachChild(node, visitHeader)
}
visitHeader(header.sourceFile)

const expectedNavLinks = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
]

if (JSON.stringify(navLinks) !== JSON.stringify(expectedNavLinks)) {
  throw new Error('Top-level navigation should contain only About and Projects.')
}

const hero = parse('../src/components/home/Hero.tsx')
const requiredNewTabLinks = new Set([
  'https://github.com/alechemenway',
  'https://www.linkedin.com/in/alec-hemenway/',
])
const foundNewTabLinks = new Set()
let foundEmailLink = false

function visitHero(node) {
  if (
    ts.isJsxElement(node) &&
    node.openingElement.tagName.getText(hero.sourceFile) === 'a'
  ) {
    const href = getStringAttribute(node.openingElement, 'href')
    if (href && requiredNewTabLinks.has(href)) {
      if (getStringAttribute(node.openingElement, 'target') !== '_blank') {
        throw new Error(`${href} should open in a new tab.`)
      }
      if (
        getStringAttribute(node.openingElement, 'rel') !== 'noopener noreferrer'
      ) {
        throw new Error(`${href} should protect the new-tab opener context.`)
      }
      foundNewTabLinks.add(href)
    }

    if (href === 'mailto:alec@hemenway.io') {
      if (getStringAttribute(node.openingElement, 'target') !== undefined) {
        throw new Error('Email should retain its normal mailto behavior.')
      }
      foundEmailLink = true
    }
  }

  ts.forEachChild(node, visitHero)
}
visitHero(hero.sourceFile)

if (foundNewTabLinks.size !== requiredNewTabLinks.size) {
  throw new Error('Could not find every requested homepage social link.')
}

if (!foundEmailLink) {
  throw new Error('Could not find the homepage Email link.')
}

const footer = parse('../src/components/Footer.tsx')
let footerElement

function findFooter(node) {
  if (
    ts.isJsxElement(node) &&
    node.openingElement.tagName.getText(footer.sourceFile) === 'footer'
  ) {
    footerElement = node
    return
  }

  ts.forEachChild(node, findFooter)
}
findFooter(footer.sourceFile)

if (!footerElement) {
  throw new Error('Could not find the site footer.')
}

const footerText = []
let footerHasLink = false

function inspectFooter(node) {
  if (ts.isJsxText(node) && node.text.trim()) {
    footerText.push(node.text.trim())
  }

  if (
    (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) &&
    ['a', 'Link'].includes(
      ts.isJsxElement(node)
        ? node.openingElement.tagName.getText(footer.sourceFile)
        : node.tagName.getText(footer.sourceFile),
    )
  ) {
    footerHasLink = true
  }

  ts.forEachChild(node, inspectFooter)
}
inspectFooter(footerElement)

if (footerHasLink) {
  throw new Error('The footer should not contain links.')
}

if (footerText.join(' ') !== '© 2026 Alec Hemenway') {
  throw new Error('The footer should contain only the requested copyright.')
}

console.log('Navigation, homepage new-tab links, and footer are correct.')
