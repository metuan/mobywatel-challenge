import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from '@eslint-react/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'playwright-report', 'test-results'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    ...react.configs['recommended-typescript'],
  },
  { files: ['src/**/*.{ts,tsx}'], ...reactHooks.configs.flat.recommended },
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
      'no-empty': ['error', { allowEmptyCatch: true }],
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      // eslint-plugin-react-hooks owns the hooks rules; don't report them twice
      '@eslint-react/exhaustive-deps': 'off',
      '@eslint-react/rules-of-hooks': 'off',
      '@eslint-react/set-state-in-effect': 'off',
      '@eslint-react/set-state-in-render': 'off',
      '@eslint-react/purity': 'off',
      '@eslint-react/static-components': 'off',
      '@eslint-react/use-memo': 'off',
      '@eslint-react/error-boundaries': 'off',
      '@eslint-react/unsupported-syntax': 'off',
      // every list in the prototype is fixed demo data that never reorders, so an index is a stable key
      '@eslint-react/no-array-index-key': 'off',
    },
  },
  {
    files: ['tests/**', '*.config.ts', '*.config.js'],
    languageOptions: { globals: { ...globals.node } },
  },
);
