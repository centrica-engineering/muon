import { playwrightLauncher } from '@web/test-runner-playwright';
import { puppeteerLauncher } from '@web/test-runner-puppeteer';

import plugins from '@muon/library/scripts/rollup-plugins.mjs';

// process.env.MUON_PREFIX = 'testing';

export default {
  nodeResolve: true,
  mimeTypes: {
    '**/*.css': 'js'
  },
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    playwrightLauncher({ product: 'webkit' }),
    // Playwright Firefox does not currently work with service workers, see
    // https://github.com/microsoft/playwright/issues/7288.
    //
    // Also note we can't use Puppeteer for both Chromium and Firefox, because
    // only one or the other can be installed at once (see our "postinstall" NPM
    // script). See
    // https://modern-web.dev/docs/test-runner/browser-launchers/puppeteer/.
    puppeteerLauncher({ launchOptions: { product: 'firefox' } }),
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
