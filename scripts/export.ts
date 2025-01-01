import { writeFileSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import { globSync } from 'fast-glob'

const comment = '// This file is automatically generated, please do not edit it manually.\n'

function exportIsModule() {
  const dir = resolve(__dirname, '../src/is')
  const files = globSync('**/*.ts', { cwd: dir, ignore: ['index.ts'] })

  let code = comment
  files.forEach((file) => {
    code += `export * from './${basename(file, '.ts')}'\n`
  })
  writeFileSync(resolve(dir, 'index.ts'), code)
}

function exportModules() {
  const dir = resolve(__dirname, '../src')
  const modules = globSync('*', { cwd: dir, onlyDirectories: true })

  let code = comment
  modules.forEach((module) => {
    code += `export * from './${module}'\n`
  })
  writeFileSync(resolve(dir, 'index.ts'), code)
}

function main() {
  exportIsModule()

  exportModules()
}

main()
