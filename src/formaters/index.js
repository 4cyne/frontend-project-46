import stylish from './stylish.js'
import plain from './plain.js'

const formatters = { json: JSON.stringify, stylish, plain }

export default (diff, formatname) => formatters[formatname](diff)
