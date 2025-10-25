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
  const indentSize = depth * 4 - 2
  const curentIndent = ' '.repeat(indentSize)

  const lines = tree.map(node => {
    const { key, type } = node

    switch (type) {
      case 'added':
        return `${curentIndent}+ ${key}: ${toString(node.value, depth + 1)}`

      case 'removed':
        return `${curentIndent}- ${key}: ${toString(node.value, depth + 1)}`

      case 'unchanged':
        return `${curentIndent}  ${key}: ${toString(node.value, depth + 1)}`

      case 'changed':
        return [
          `${curentIndent}- ${key}: ${toString(node.oldValue, depth + 1)}`,
          `${curentIndent}+ ${key}: ${toString(node.newValue, depth + 1)}`,
        ]

      case 'nested':
        return `${curentIndent}  ${key}: ${stylish(node.children, depth + 1)}`

      default:
        return ''
    }
  })

  const flatLines = lines.flat().join('\n')
  const bracketIndent = ' '.repeat(depth * 4 - 4)
  return `{\n${flatLines}\n${bracketIndent}}`
}

export default tree => stylish(tree)
