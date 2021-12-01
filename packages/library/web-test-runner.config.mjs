import { playwrightLauncher } from '@web/test-runner-playwright';
import plugins from '@muons/library/scripts/rollup-plugins.mjs';

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
  plugins: [
    ...plugins
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
