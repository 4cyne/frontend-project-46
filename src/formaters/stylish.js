import _ from 'lodash'
const toString = (value, depth) => {
  if (_.isString(value)) {
    return value
  }

  if (!_.isPlainObject(value) || value === null) {
    return String(value)
  }

  const indentSize = depth * 4
  const currentIndent = ' '.repeat(indentSize)
  const bracketIndent = ' '.repeat(indentSize - 4)

  const lines = Object.entries(value).map(([key, val]) => {
    return `${currentIndent}${key}: ${toString(val, depth + 1)}`
  })

  return ['{', ...lines, `${bracketIndent}}`].join('\n')
}

const stylish = (tree, depth = 1) => {
  const indentSize = depth * 4 - 4
  const curenIndent = ' '.repeat(indentSize)

  const lines = tree.map(node => {
    const { key, type } = node

    switch (type) {
      case 'added':
        return `${curenIndent} + ${key}: ${toString(node.value, depth + 1)}`

      case 'removed':
        return `${curenIndent} - ${key}: ${toString(node.value, depth + 1)}`

      case 'unchanged':
        return `${curenIndent}   ${key}: ${toString(node.value, depth + 1)}`

      case 'changed':
        return [
          `${curenIndent} - ${key}: ${toString(node.oldValue, depth + 1)}`,
          `${curenIndent} + ${key}: ${toString(node.newValue, depth + 1)}`,
        ]

      case 'nested':
        return `${curenIndent}   ${key}: ${stylish(node.children, depth + 1)}`

      default:
        return ''
    }
  })

  const flatLines = lines.flat().join('\n')
  return `{\n${flatLines}\n${curenIndent}}`
}

export default tree => stylish(tree)
