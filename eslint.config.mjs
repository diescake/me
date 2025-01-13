import nextPlugin from '@next/eslint-plugin-next'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'dist/**'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/no-explicit-any': ['error'],
      '@typescript-eslint/explicit-function-return-type': ['error'],
      '@typescript-eslint/no-floating-promises': ['error'],
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      'prefer-const': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      ...nextPlugin.configs['recommended'].rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
]
