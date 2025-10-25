import { test, expect } from '@jest/globals'
import fs from 'fs'
import _ from 'lodash'
import { fileURLToPath } from 'url'
import path from 'path'
import genDiff from '../src/index.js'

const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)

const testTypes = [
  ['json', 'stylish'],
  ['yaml', 'stylish'],
  ['yml', 'stylish'],
  ['json', 'plain'],
  ['yaml', 'plain'],
  ['yml', 'plain'],
  ['json', 'json'],
  ['yaml', 'json'],
  ['yml', 'json'],
  ['json-yaml', 'stylish'],
  ['yaml-json', 'stylish'],
]

const getFixturePath = filename =>
  path.join(__dirname, '..', '__fixtures__', filename)

const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

test('non-existent file', () => {
  expect(() => genDiff('nonExistent.json', 'file2.json')).toThrow(
    `file not found`,
  )
})

test.each(testTypes)('compare files with format', (fileExt, outputFormat) => {
  let filePath1, filePath2

  if (fileExt.includes('-')) {
    const [ext1, ext2] = fileExt.split('-')
    filePath1 = getFixturePath(`file1.${ext1}`)
    filePath2 = getFixturePath(`file2.${ext2}`)
  } else {
    filePath1 = getFixturePath(`file1.${fileExt}`)
    filePath2 = getFixturePath(`file2.${fileExt}`)
  }
  const expectedFile = `expected${_.upperFirst(outputFormat)}.txt`
  const expected = readFile(expectedFile).trim()
  const result = genDiff(filePath1, filePath2, outputFormat)

  expect(result).toEqual(expected)
})
