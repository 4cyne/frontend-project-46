import fs from 'fs'
import path from 'path'
import parsers from './parsers.js'
import { genDiff } from './genDiff.js'

const gendiff = (filePath1, filePath2, format = 'plain') => {
  const fileFormat = filePath => path.extname(filePath).slice(1)

  const data = filePath =>
    fs.readFileSync(path.resolve(process.cwd()), filePath)

  const obj1 = parsers(data(filePath1), fileFormat(filePath1))
  const obj2 = parsers(data(filePath2), fileFormat(filePath2))

  const diff = genDiff(obj1, obj2)

  return format(diff, format)
}

export default gendiff
