module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['eslint:recommended'],
  plugins: ['jsdoc'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    eqeqeq: 'error',
    'no-extra-parens': ['error', 'all', {
      nestedBinaryExpressions: false
    }],
    'no-inner-declarations': ['error', 'both'],
    'valid-jsdoc': 'error',
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
    'no-multi-spaces': 'warn',
    'no-new': 'warn',
    'no-new-func': 'warn',
    'no-new-wrappers': 'warn',
    'no-self-compare': 'warn',
    'no-unused-expressions': 'warn',
    'no-useless-call': 'warn',
    'no-useless-concat': 'warn',
    'object-curly-spacing': ['error', 'always'],
    'vars-on-top': 'warn',
    'no-use-before-define': ['warn', {
      functions: false
    }],
    'array-bracket-spacing': 'warn',
    'block-spacing': ['warn', 'never'],
    'brace-style': 'warn',
    camelcase: 'warn',
    'comma-dangle': 'warn',
    'comma-spacing': 'warn',
    'comma-style': 'warn',
    'computed-property-spacing': 'warn',
    'eol-last': 'warn',
    indent: ['warn', 2, {
      SwitchCase: 1
    }],
    'key-spacing': 'warn',
    'keyword-spacing': 'warn',
    'linebreak-style': 'warn',
    'max-len': ['warn', 120, {
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
    'no-multiple-empty-lines': ['warn', {
      max: 1,
      maxEOF: 1
    }],
    'no-plusplus': ['warn', {
      allowForLoopAfterthoughts: true
    }],
    'func-call-spacing': 'error',
    'no-trailing-spaces': 'warn',
    'no-unneeded-ternary': 'warn',
    'no-nested-ternary': 'error',
    'no-whitespace-before-property': 'warn',
    'one-var': ['warn', 'never'],
    'one-var-declaration-per-line': 'warn',
    'operator-linebreak': ['warn', 'after'],
    'quote-props': ['warn', 'as-needed'],
    quotes: ['error', 'single', {
      avoidEscape: true,
      allowTemplateLiterals: true
    }],
    'semi-spacing': 'warn',
    semi: 'warn',
    'space-before-blocks': 'warn',
    'space-in-parens': 'warn',
    'space-infix-ops': 'warn',
    'arrow-parens': 'warn',
    'arrow-spacing': 'warn',
    'no-duplicate-imports': 'warn',
    'template-curly-spacing': 'warn',
    curly: 'error',
    'no-var': 'warn',
    'prefer-const': 'warn',
    'space-before-function-paren': ['warn', {
      named: 'never'
    }],
    'jsdoc/check-alignment': 1,
    'jsdoc/check-indentation': 1,
    'jsdoc/check-param-names': 1,
    'jsdoc/check-syntax': 1,
    'jsdoc/check-types': 1,
    'jsdoc/implements-on-classes': 1,
    'jsdoc/match-description': 1,
    'jsdoc/newline-after-description': 'off',
    'jsdoc/no-types': ['error' | 'warn', { contexts: ['any'] }],
    'jsdoc/no-undefined-types': 1,
    'jsdoc/require-description': 1,
    'jsdoc/require-description-complete-sentence': 1,
    'jsdoc/require-hyphen-before-param-description': 1,
    'jsdoc/require-jsdoc': 1,
    'jsdoc/require-param': 1,
    'jsdoc/require-param-description': 1,
    'jsdoc/require-param-name': 1,
    'jsdoc/require-param-type': 1,
    'jsdoc/require-returns': 1,
    'jsdoc/require-returns-check': 1,
    'jsdoc/require-returns-description': 1,
    'jsdoc/require-returns-type': 1,
    'jsdoc/valid-types': 1
  }
};
