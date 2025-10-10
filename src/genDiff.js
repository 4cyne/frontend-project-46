import _ from 'lodash'

export const genDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  const sortedkeys = _.sortBy(_.union(keys1, keys2))

  const result = sortedkeys.map((key) => {
    const isObject = _.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])

    if (isObject) {
      return {
        name: key,
        type: 'nested',
        children: genDiff(obj1[key], obj2[key]),
      }
    } else if (_.has(obj1, key)) {
      return {
        name: key,
        type: 'added',
        value: obj1[key],
      }
    } else if (_.has(obj2, key)) {
      return {
        name: key,
        type: 'removed',
        value: obj1[key],
      }
    } else if (obj1[key] !== obj2[key]) {
      return {
        name: key,
        type: 'changed',
        oldvalue: obj1[key],
        newValue: obj2[key],
      }
    } else {
      return {
        name: key,
        type: 'unchanged',
        value: obj1[key],
      }
    }
  })

  return result
}
