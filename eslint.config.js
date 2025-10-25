import globals from 'globals'
import pluginJs from '@eslint/js'

export default [
  pluginJs.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'arrow-parens': ['error', 'as-needed'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
    },
  },
]