import globals from 'globals'
import pluginJs from '@eslint/js'

export default [
  pluginJs.configs.recommended,
  {
    files: ['**/*.{js,ts,tsx}'],
  },
  {
    ignores: ['dist/'],
  },
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    rules: {
      // Правила, которые использует Hexlet
      'arrow-parens': ['error', 'always'],
      'brace-style': ['error', 'stroustrup'],
    },
  },
]
