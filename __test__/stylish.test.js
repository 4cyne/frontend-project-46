import stylish from '../src/formaters/stylish'
import { test, expect } from '@jest/globals'

test('unknown type', () => {
  const unknown = [
    {
      key: 'test',
      type: 'unknown',
      value: 'test',
    },
  ]
  expect(stylish(unknown)).toBe('{\n\n}')
})
