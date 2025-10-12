import fs from 'fs'
import path from 'path'
import parsers from './parsers.js'
import { genDiff } from './genDiff.js'
import format from './formaters/index.js'

const gendiff = (filePath1, filePath2, formatName = 'plain') => {
  const getFileFormat = (filePath) => path.extname(filePath).slice(1)

  const data = (filePath) => {
    const absolutePath = path.resolve(process.cwd(), filePath)
    return fs.readFileSync(absolutePath, 'utf-8')
  }

  const obj1 = parsers(data(filePath1), getFileFormat(filePath1))
  const obj2 = parsers(data(filePath2), getFileFormat(filePath2))

  const diff = genDiff(obj1, obj2)

  return format(diff, formatName)
}

export default gendiff
