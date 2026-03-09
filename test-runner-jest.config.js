const { getJestConfig } = require('@storybook/test-runner');
const stories = require('@muonic/muon/storybook/find-stories');

const testRunnerConfig = getJestConfig();
const findStories = stories(__dirname);

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  // The default configuration comes from @storybook/test-runner
  ...testRunnerConfig,
  testMatch: ['**/?(*.)story.js?(x)'],
  setupFiles: [...(testRunnerConfig.setupFiles || []), '<rootDir>/test-runner.setup.js'],
  moduleNameMapper: {
    ...(testRunnerConfig.moduleNameMapper || {}),
    '\\.(css)$': '<rootDir>/test-runner.style.mock.js',
    '^@muon/tokens$': '<rootDir>/node_modules/@muonic/muon/build/tokens/es6/muon-tokens.js',
    '^@muon/tokens/(.*)$': '<rootDir>/node_modules/@muonic/muon/build/tokens/es6/$1',
    '^@muon/components/(.*)$': '<rootDir>/packages/muon/components/$1',
    '^@muon/(.*)$': '<rootDir>/packages/muon/$1',
  },
  transformIgnorePatterns: [
    '/packages/muon/node_modules/(?!(lit))/',
    '/packages/muon/build/tokens/es6/(?!(muon-tokens))/',
    '<rootDir>/node_modules/@babel/',
    '<rootDir>/node_modules/@jest/',
    'imurmurhash',
    'signal-exit'
  ],
};
