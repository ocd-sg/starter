#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const cp = require('child_process')

const paths = {
  project: process.cwd(),
  package: path.resolve(process.cwd(), 'package.json'),
  templates: {
    git: path.resolve(__dirname, '../templates/git'),
    typescript: path.resolve(__dirname, '../templates/typescript'),
    prettier: path.resolve(__dirname, '../templates/prettier')

  }
}

copy(
  path.resolve(paths.templates.git, 'gitignore'),
  path.resolve(paths.project, '.gitignore')
)
console.log('Updated .gitignore')

copy(
  path.resolve(paths.templates.typescript, 'tsconfig.json'),
  path.resolve(paths.project, 'tsconfig.json')
)
copy(
  path.resolve(paths.templates.typescript, 'tslint.json'),
  path.resolve(paths.project, 'tslint.json')
)
console.log('Updated typescript files')

copy(
  path.resolve(paths.templates.prettier, 'prettierrc.js'),
  path.resolve(paths.project, '.prettierrc.js')
)
console.log('Updated .prettierrc')

// package.json
const package = require(paths.package)

// add watch:dev to package.json
if (!package.scripts['watch:dev']) {
  package.scripts = {
    ...package.scripts,
    'start:dev': 'ts-node index.ts'
  }
  fs.writeFileSync(paths.package, JSON.stringify(package, null, 2))
  console.log('Add script `start:dev`')
}

// add watch:dev to package.json
if (!package.scripts['watch:dev']) {
  package.scripts = {
    ...package.scripts,
    'watch:dev': 'nodemon --watch . -e ts --exec npm run start:dev'
  }
  fs.writeFileSync(paths.package, JSON.stringify(package, null, 2))
  console.log('Add script `watch:dev`')
}

function copy (source, destination) {
  return fs.writeFileSync(destination, fs.readFileSync(source))
}
