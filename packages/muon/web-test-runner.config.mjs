import { playwrightLauncher } from '@web/test-runner-playwright';
import { visualRegressionPlugin } from '@web/test-runner-visual-regression/plugin';
import { serverPlugins } from '@muonic/muon/scripts/rollup-plugins.mjs';
import { checkRunSnapshots } from './tests/runner/commands.mjs';

export default {
  testRunnerHtml: (testFramework) =>
    `<html>
      <head>
        <script type="module">
          import '@muonic/muon/js/scoped-custom-element-registry.min.js';
        </script>
      </head>
      <body>
        <script>window.process = { env: { NODE_ENV: "development" } }</script>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>`,
  nodeResolve: true,
  mimeTypes: {
    '**/*.css': 'js'
  },
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    playwrightLauncher({ product: 'firefox' }),
    playwrightLauncher({ product: 'webkit' })
  ],
  browserStartTimeout: 30000, // default 30000
  testsStartTimeout: 20000, // default 10000
  testsFinishTimeout: 60000, // default 20000
  concurrentBrowsers: 2,
  concurrency: 2,
  plugins: [
    ...serverPlugins,
    checkRunSnapshots(),
    visualRegressionPlugin({
      baseDir: 'tests/visual-baseline',
      diffDir: 'tests/visual-diff',
      failureThreshold: 0.001,
      failureThresholdType: 'percent',
      update: process.argv.includes('--update-visual-baseline')
    })
  ],
  coverageConfig: {
    threshold: {
      statements: 99,
      branches: 99,
      functions: 99,
      lines: 99
    },
    exclude: [
      '**/node_modules/**',
      '**/js/*.min.js'
    ]
  }
};
