import globals from 'globals'
import pluginJs from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'

export default [
  pluginJs.configs.recommended,
  stylistic.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'arrow-parens': 'off',
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
    },
  },
]
