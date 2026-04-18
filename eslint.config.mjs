import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import ascii from 'eslint-plugin-ascii'
import jsonc from 'eslint-plugin-jsonc'
import unusedImports from 'eslint-plugin-unused-imports'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tsParser from '@typescript-eslint/parser'
import * as jsoncParser from 'jsonc-eslint-parser'

export default tseslint.config(
  // Base JS rules
  eslint.configs.recommended,

  // JSON / JSONC rules
  ...jsonc.configs['flat/recommended-with-jsonc'],

  // TypeScript rules
  ...tseslint.configs.recommended,

  // Global ignore (ESLint 9)
  {
    ignores: [
      '.vscode/',
      '.idea/',
      '.cloudbees/',
      '.github/',
      '.husky/',
      'dist/',
      '**/node_modules/',
      'allure-results/',
      'test-results/',
      '.prettierrc.json',
      'eslint.config.mjs',
      'tsconfig.json',
      'package.json',
      'package-lock.json',
      '.commitlintrc.cjs',
      'reports/',
    ],
  },

  // TypeScript files
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      ascii,
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'ascii/valid-name': 'error',

      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
          disallowTypeAnnotations: false,
        },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-this-alias': 'off',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/no-unnecessary-type-assertion': [
        'warn',
        {
          typesToIgnore: ['HTMLElement'],
        },
      ],

      // Optional but recommended
      'unused-imports/no-unused-imports': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },

  // JSON / JSONC files
  {
    files: ['**/*.json', '**/*.json5', '**/*.jsonc'],
    languageOptions: {
      parser: jsoncParser,
    },
    rules: {
      'jsonc/auto': 'error',
    },
  },
)
