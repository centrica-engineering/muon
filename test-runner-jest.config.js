const { getJestConfig } = require('@storybook/test-runner');
const path = require('path');

const testRunnerConfig = getJestConfig();

// The default story transform only matches *.story.js / *.stories.js but this
// project's component stories are named just "story.js".  We need to add a
// pattern that matches bare story.js files and ensure it appears before the
// catch-all SWC transform (Jest uses first-match-wins on transform keys).
const sbTransformPath = path.resolve(
  __dirname,
  'node_modules/@storybook/test-runner/playwright/transform.js'
);

const { transform: defaultTransform = {}, ...restConfig } = testRunnerConfig;

// Rebuild transform with correct ordering: specific patterns first
const transform = {};
for (const [pattern, transformer] of Object.entries(defaultTransform)) {
  transform[pattern] = transformer;
  // Insert our bare-story pattern right after the existing story pattern and
  // before the generic .js catch-all so it takes precedence.
  if (pattern.includes('story|stories')) {
    transform['(^|/)story\\.[jt]sx?$'] = sbTransformPath;
  }
}

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  ...restConfig,
  transform,
};
