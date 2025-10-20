import { test, describe, expect } from '@jest/globals'
import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import genDiff from '../src/index.js'

const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)

const getFixturePath = fileName =>
  path.join(__dirname, '..', '__fixtures__', fileName)

describe('gendiff', () => {
  test('stylish format', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.json')
    const expectedPath = getFixturePath('expectedStylish.txt')

    const expected = fs.readFileSync(expectedPath, 'utf-8').trim()
    const result = genDiff(file1, file2, 'stylish')

    expect(result).toEqual(expected)
  })
})
