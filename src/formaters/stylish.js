import _ from 'lodash'
const toString = (value, deph) => {
  if (_.isPlainObject(value) || value === null) {
    return String(value)
  }

  const indentSize = deph * 4
  const currentIndent = ' '.repeat(indentSize)
  const bracketIndent = ' '.repeat(indentSize - 4)

  const lines = Object.entries(value).map(([key, val]) => {
    if (_.isPlainObject(val) && val !== null) {
      return `${currentIndent}${key}: ${toString(val, deph + 1)}`
    }

    return `${currentIndent}${key}: ${val}`
  })

  return ['{', ...lines, `${bracketIndent}}`].join('\n')
}

const stylish = (tree, deph = 1) => {
  const indentSize = deph * 4 - 4
  const curenIndent = ' '.repeat(indentSize)

  const lines = tree.map((node) => {
    const { key, type } = node

    switch (type) {
      case 'added':
        return `${curenIndent} + ${key}: ${toString(node.value, deph + 1)}`

      case 'removed':
        return `${curenIndent} - ${key}: ${toString(node.value, deph + 1)}`

      case 'unchanged':
        return `${curenIndent}   ${key}: ${toString(node.value, deph + 1)}`

      case 'changegd':
        return [
          `${curenIndent} + ${key}: ${toString(node.value, deph + 1)}`,
          `${curenIndent} - ${key}: ${toString(node.value, deph + 1)}`,
        ]

      case 'nested':
        return `${curenIndent}   ${key}: ${stylish(node.children, deph + 1)}`

      default:
        return ''
    }
  })

  const flatLines = lines.flat().join('\n')
  return `{\n${flatLines}\n${curenIndent}}`
}

export default (tree) => stylish(tree)
