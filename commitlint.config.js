module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Allow long URL footers (e.g. `Agent-Logs-Url: ...`) in commit bodies.
    'body-max-line-length': [0, 'always'],
  },
};