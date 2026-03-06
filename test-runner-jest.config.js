const { getJestConfig } = require('@storybook/test-runner');

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  // The default configuration comes from @storybook/test-runner
  ...getJestConfig(),
  transformIgnorePatterns: [
    '/packages/muon/node_modules/(?!(lit))/',
    '<rootDir>/node_modules/@babel/',
    '<rootDir>/node_modules/@jest/',
    'imurmurhash',
    'signal-exit'
  ],
};
