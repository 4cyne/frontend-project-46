import _ from 'lodash'

const toString = value => {
  if (_.isString(value)) {
    return `'${value}`
  }
  if (_.isObject(value)) {
    return `[conplex value]`
  }
  return value
}

const plain = (diff) => {
  
}
