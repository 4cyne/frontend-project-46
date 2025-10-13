#!/usr/bin/env node

import { program } from 'commander'
import gendiff from '../src/index.js'

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .version('1.0.0', '-v, --version', 'output the version number')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const diff = gendiff(filepath1, filepath2, program.format)
    console.log(diff)
  })

program.parse(process.argv)
