import { browserstackLauncher } from '@web/test-runner-browserstack';

import plugins from '@muon/library/scripts/rollup-plugins.mjs';

// options shared between all browsers
const sharedCapabilities = {
  // your username and key for browserstack, you can get this from your browserstack account
  // it's recommended to store these as environment variables
  'browserstack.user': process.env.BROWSER_STACK_USERNAME,
  'browserstack.key': process.env.BROWSER_STACK_ACCESS_KEY,

  project: 'Muon',
  name: 'CI tests',
  // if you are running tests in a CI, the build id might be available as an
  // environment variable. this is useful for identifying test runs
  // this is for example the name for github actions
  build: `Muon ${process.env.GITHUB_RUN_NUMBER || 'unknown'}`,
};

export default {
  nodeResolve: true,
  mimeTypes: {
    '**/*.css': 'js'
  },
  plugins: [
    ...plugins
  ],
  // how many browsers to run concurrently in browserstack. increasing this significantly
  // reduces testing time, but your subscription might limit concurrent connections
  concurrentBrowsers: 2,
  // amount of test files to execute concurrently in a browser. the default value is based
  // on amount of available CPUs locally which is irrelevant when testing remotely
  concurrency: 6,
  browsers: [
    // create a browser launcher per browser you want to test
    // you can get the browser capabilities from the browserstack website
    browserstackLauncher({
      capabilities: {
        ...sharedCapabilities,
        browserName: 'Chrome',
        os: 'Windows',
        os_version: '10',
      },
    }),
    browserstackLauncher({
      capabilities: {
        ...sharedCapabilities,
        browserName: 'Firefox',
        os: 'Windows',
        os_version: '10',
      },
    }),
    browserstackLauncher({
      capabilities: {
        ...sharedCapabilities,
        browserName: 'Edge',
        os: 'Windows',
        os_version: '10',
      },
    }),
    browserstackLauncher({
      capabilities: {
        ...sharedCapabilities,
        realMobile: true,
        device: 'Google Pixel 5',
        os_version: '12.0',
        browserName: 'Android',
      },
    }),
    browserstackLauncher({
      capabilities: {
        ...sharedCapabilities,
        realMobile: true,
        device: 'Samsung Galaxy A11',
        os_version: '10.0',
        browserName: 'Android',
      },
    }),
    browserstackLauncher({
      capabilities: {
        ...sharedCapabilities,
        realMobile: true,
        device: 'iPhone XS',
        os_version: '15',
        browserName: 'iPhone',
      },
    }),
    browserstackLauncher({
      capabilities: {
        ...sharedCapabilities,
        realMobile: true,
        device: 'iPhone SE 2020',
        os_version: '13',
        browserName: 'iPhone',
      },
    }),
  ],
  browserStartTimeout: 30000, // default 30000
  testsStartTimeout: 20000, // default 10000
  testsFinishTimeout: 60000, // default 20000
};
