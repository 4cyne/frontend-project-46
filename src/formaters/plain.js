import _ from 'lodash'

const toString = (value) => {
  if (_.isString(value)) {
    return `'${value}'`
  }
  if (_.isObject(value)) {
    return '[complex value]'
  }
  return value
}

const plain = (tree, path = '') => {
  if (!Array.isArray(tree)) {
    return ''
  }

  const lines = tree.flatMap((node) => {
    const currentPath = path ? `${path}.${node.key}` : node.key
    switch (node.type) {
      case 'added':
        return `Property '${currentPath}' was added with value: ${toString(
          node.value,
        )}`
      case 'removed':
        return `Property '${currentPath}' was removed`

      case 'changed':
        return `Property '${currentPath}' was updated. From ${toString(
          node.oldValue,
        )} to ${toString(node.newValue)}`

      case 'nested':
        return plain(node.children, currentPath)

      case 'unchanged':
        return []
      default:
        return []
    }
  })

  return lines.join('\n')
}

export default tree => plain(tree)
