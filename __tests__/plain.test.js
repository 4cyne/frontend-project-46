import plain from '../src/formaters/plain.js'
import { test, expect } from '@jest/globals'

test('unknown type node', () => {
  const withUnknown = [
    {
      key: 'test',
      type: 'unknown_type',
      value: 'test',
    },
  ]
  expect(plain(withUnknown)).toBe('')
})

test('not array', () => {
  const withNotArray = {
    key: 'test',
    type: 'unknown_type',
    value: 'test',
  }
  expect(plain(withNotArray)).toBe('')
})
test('nested properties without initial path', () => {
  const test = [
    {
      key: 'nested',
      type: 'nested',
      children: [{ key: 'property', type: 'added', value: 'value' }],
    },
  ]

  expect(plain(test)).toContain('nested.property')
})
