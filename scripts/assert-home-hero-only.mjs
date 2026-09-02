import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import ts from 'typescript'

const __dirname = dirname(fileURLToPath(import.meta.url))
const homePagePath = resolve(__dirname, '../src/app/page.tsx')
const homePage = readFileSync(homePagePath, 'utf8')
const sourceFile = ts.createSourceFile(
  homePagePath,
  homePage,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TSX,
)

const importsHero = sourceFile.statements.some(
  (statement) =>
    ts.isImportDeclaration(statement) &&
    ts.isStringLiteral(statement.moduleSpecifier) &&
    statement.moduleSpecifier.text === '@/components/home/Hero' &&
    statement.importClause?.namedBindings &&
    ts.isNamedImports(statement.importClause.namedBindings) &&
    statement.importClause.namedBindings.elements.some(
      (element) => !element.propertyName && element.name.text === 'Hero',
    ),
)

if (!importsHero) {
  throw new Error('Home should import Hero from the homepage Hero component.')
}

const homeFunction = sourceFile.statements.find(
  (statement) =>
    ts.isFunctionDeclaration(statement) &&
    statement.name?.text === 'Home' &&
    statement.modifiers?.some(
      (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
    ) &&
    statement.modifiers.some(
      (modifier) => modifier.kind === ts.SyntaxKind.DefaultKeyword,
    ),
)

if (!homeFunction?.body || homeFunction.body.statements.length !== 1) {
  throw new Error('Home should contain exactly one return statement.')
}

const [statement] = homeFunction.body.statements
if (
  !ts.isReturnStatement(statement) ||
  !statement.expression ||
  !ts.isJsxSelfClosingElement(statement.expression) ||
  statement.expression.tagName.getText(sourceFile) !== 'Hero'
) {
  throw new Error('The home page should render only the Hero component.')
}

console.log('Home page renders the Hero with all lower sections hidden.')
