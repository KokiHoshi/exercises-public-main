import js from '@eslint/js';
import globals from 'globals';
import { FlatCompat } from '@eslint/eslintrc';
import { fixupConfigRules } from '@eslint/compat';

const compat = new FlatCompat();

export default [
  {
    ignores: ['node_modules/**', 'ex01/format_sample.js'],
  },

  js.configs.recommended,

  ...fixupConfigRules(compat.extends('google', 'prettier')),

  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      'require-jsdoc': 'off',
      'valid-jsdoc': 'off',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-with': 'error',
    },
  },
];
