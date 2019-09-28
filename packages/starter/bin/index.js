#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const cp = require('child_process')

const paths = {
  project: process.cwd()
}

cp.spawnSync('cp', [
  require.resolve('@ocd-ui/config/git/gitignore'),
  path.resolve(paths.project, '.gitignore')
])
console.log('Updated .gitignore')

// cp.spawnSync('cp', [
//   require.resolve('@ocd-ui/config/typescript/tslint.json'),
//   paths.project
// ])

// remove react from tslint
const tslint = require('@ocd-ui/config/typescript/tslint.json')
tslint.extends = tslint.extends.filter((d) => d !== 'tslint-react')
cp.spawnSync('cp', [
  require.resolve('@ocd-ui/config/typescript/tsconfig.json'),
  paths.project
])
fs.writeFileSync(path.resolve(paths.project, 'tslint.json'), JSON.stringify(tslint, null, 2))
console.log('Updated typescript files')

cp.spawnSync('cp', [
  require.resolve('@ocd-ui/config/prettier/prettierrc.js'),
  path.resolve(paths.project, '.prettierrc.js')
])
console.log('Updated .prettierrc')
