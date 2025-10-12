import stylish from './stylish.js'
import plain from './plain.js'
import json from './json.js'

const formatters = { json, stylish, plain }

export default (diff, formatname) => formatters[formatname](diff)
