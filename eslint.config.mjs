import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import jsdoc from 'eslint-plugin-jsdoc';
import globals from 'globals';

export default [
  {
    ignores: [
      'node_modules/**',
      'docs/**',
      'examples/**',
      '**/build/**',
      '**/dist/**',
      '**/__snapshots__/**',
      '**/coverage/**',
      '**/js/*.min.js',
      'muon.config.json',
      'rollup.config.js'
    ]
  },
  js.configs.recommended,
  {
    files: ['packages/**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node
      }
    },
    plugins: {
      '@stylistic': stylistic,
      jsdoc
    },
    rules: {
      eqeqeq: 'error',
      '@stylistic/no-extra-parens': ['error', 'all', {
        nestedBinaryExpressions: false
      }],
      'no-inner-declarations': ['error', 'both'],
      'block-scoped-var': 'error',
      'consistent-return': 'error',
      'default-case': 'error',
      'dot-notation': 'error',
      'no-alert': 'error',
      'no-case-declarations': 'error',
      'no-eq-null': 'warn',
      'no-eval': 'warn',
      'no-extra-bind': 'warn',
      'no-floating-decimal': 'warn',
      'no-implicit-globals': 'warn',
      'no-lone-blocks': 'warn',
      'no-loop-func': 'warn',
      '@stylistic/no-multi-spaces': 'warn',
      'no-new': 'warn',
      'no-new-func': 'warn',
      'no-new-wrappers': 'warn',
      'no-self-compare': 'warn',
      'no-unused-expressions': 'warn',
      'no-useless-call': 'warn',
      'no-useless-concat': 'warn',
      '@stylistic/object-curly-spacing': ['error', 'always'],
      'vars-on-top': 'warn',
      'no-use-before-define': ['warn', {
        functions: false
      }],
      '@stylistic/array-bracket-spacing': 'warn',
      '@stylistic/block-spacing': ['warn', 'never'],
      '@stylistic/brace-style': 'warn',
      '@stylistic/comma-dangle': 'warn',
      '@stylistic/comma-spacing': 'warn',
      '@stylistic/comma-style': 'warn',
      '@stylistic/computed-property-spacing': 'warn',
      '@stylistic/eol-last': 'warn',
      '@stylistic/indent': ['warn', 2, {
        SwitchCase: 1
      }],
      '@stylistic/key-spacing': 'warn',
      '@stylistic/keyword-spacing': 'warn',
      '@stylistic/linebreak-style': 'warn',
      '@stylistic/max-len': ['warn', 120, {
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      }],
      'new-cap': ['warn', {
        capIsNew: false
      }],
      'no-lonely-if': 'warn',
      '@stylistic/no-multiple-empty-lines': ['warn', {
        max: 1,
        maxEOF: 1
      }],
      'no-plusplus': ['warn', {
        allowForLoopAfterthoughts: true
      }],
      '@stylistic/function-call-spacing': 'error',
      '@stylistic/no-trailing-spaces': 'warn',
      'no-unneeded-ternary': 'warn',
      'no-nested-ternary': 'error',
      '@stylistic/no-whitespace-before-property': 'warn',
      'one-var': ['warn', 'never'],
      '@stylistic/one-var-declaration-per-line': 'warn',
      '@stylistic/operator-linebreak': ['warn', 'after'],
      '@stylistic/quote-props': ['warn', 'as-needed'],
      '@stylistic/quotes': ['error', 'single', {
        avoidEscape: true,
        allowTemplateLiterals: 'always'
      }],
      '@stylistic/semi-spacing': 'warn',
      '@stylistic/semi': 'warn',
      '@stylistic/space-before-blocks': 'warn',
      '@stylistic/space-in-parens': 'warn',
      '@stylistic/space-infix-ops': 'warn',
      '@stylistic/arrow-parens': 'warn',
      '@stylistic/arrow-spacing': 'warn',
      'no-duplicate-imports': 'warn',
      '@stylistic/template-curly-spacing': 'warn',
      curly: 'error',
      'no-var': 'warn',
      'prefer-const': 'warn',
      '@stylistic/space-before-function-paren': ['warn', {
        named: 'never'
      }],
      'jsdoc/check-alignment': 'warn',
      'jsdoc/check-indentation': 'warn',
      'jsdoc/check-param-names': 'warn',
      'jsdoc/check-syntax': 'warn',
      'jsdoc/check-types': 'warn',
      'jsdoc/implements-on-classes': 'warn',
      'jsdoc/match-description': 'warn',
      'jsdoc/no-undefined-types': 'warn',
      'jsdoc/require-description': 'warn',
      'jsdoc/require-description-complete-sentence': 'warn',
      'jsdoc/require-hyphen-before-param-description': 'warn',
      'jsdoc/require-jsdoc': 'warn',
      'jsdoc/require-param': 'warn',
      'jsdoc/require-param-description': 'warn',
      'jsdoc/require-param-name': 'warn',
      'jsdoc/require-param-type': 'warn',
      'jsdoc/require-returns': 'warn',
      'jsdoc/require-returns-check': 'warn',
      'jsdoc/require-returns-description': 'warn',
      'jsdoc/require-returns-type': 'warn',
      'jsdoc/valid-types': 'warn'
    }
  }
];