import _ from 'lodash'

export const genDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  const sortedkeys = _.sortBy(_.union(keys1, keys2))

  const result = sortedkeys.map((key) => {
    const hasKey1 = _.has(obj1, key)
    const hasKey2 = _.has(obj2, key)
    const isObject = _.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])

    if (isObject) {
      return {
        name: key,
        type: 'nested',
        children: genDiff(obj1[key], obj2[key]),
      }
    }

    if (!hasKey1 && hasKey2) {
      return {
        key,
        type: 'added',
        value: obj2[key],
      }
    }

    if (hasKey1 && !hasKey2) {
      return {
        key,
        type: 'removed',
        value: obj1[key],
      }
    }

    if (obj1[key] !== obj2[key]) {
      return {
        key,
        type: 'changed',
        oldValue: obj1[key],
        newValue: obj2[key],
      }
    }
    return {
      key,
      type: 'unchanged',
      value: obj1[key],
    }
  })

  return result
}
