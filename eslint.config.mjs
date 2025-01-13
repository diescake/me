import nextPlugin from '@next/eslint-plugin-next'
import { FlatCompat } from '@eslint/eslintrc'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'dist/**'],
  },
  ...compat.extends(
    'plugin:@next/next/recommended',
    'plugin:@next/next/core-web-vitals'
  ),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': (await import('@typescript-eslint/eslint-plugin'))
        .default,
    },
    languageOptions: {
      parser: (await import('@typescript-eslint/parser')).default,
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
    },
  },
]
