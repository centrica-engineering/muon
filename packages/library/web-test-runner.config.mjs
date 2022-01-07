import { playwrightLauncher } from '@web/test-runner-playwright';
import { serverPlugins } from '@muons/library/scripts/rollup-plugins.mjs';
import { checkRunSnapshots } from './tests/runner/commands.mjs';
// process.env.MUON_PREFIX = 'testing';

export default {
  nodeResolve: true,
  mimeTypes: {
    '**/*.css': 'js'
  },
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    playwrightLauncher({ product: 'webkit' }),
    playwrightLauncher({ product: 'firefox' })
  ],
  browserStartTimeout: 30000, // default 30000
  testsStartTimeout: 20000, // default 10000
  testsFinishTimeout: 60000, // default 20000
  concurrentBrowsers: 3,
  concurrency: 3,
  plugins: [
    ...serverPlugins,
    checkRunSnapshots()
  ],
  coverageConfig: {
    threshold: {
      statements: 99,
      branches: 99,
      functions: 99,
      lines: 99
    }
  }
};
