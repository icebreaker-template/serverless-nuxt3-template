const path = require('path')
const fs = require('fs')

const cwd = process.cwd()

fs.copyFileSync(path.resolve(cwd, 'package.json'), path.resolve(cwd, '.output', 'package.json'))