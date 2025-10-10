#!/usr/bin/env node

import { program } from 'commander'
import gendiff from '../src/index.js'

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .version('1.0.0', '-v, --version', 'output the version number')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    console.log('filepath1', filepath1)
    console.log('filepath2', filepath2)
    const diff = gendiff(filepath1, filepath2, program.options.format)
    console.log(diff)
  })

program.parse()
