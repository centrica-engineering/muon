import plugins from '@muon/library/scripts/rollup-plugins.mjs';

// process.env.MUON_PREFIX = 'testing';

export default {
  nodeResolve: true,
  mimeTypes: {
    '**/*.css': 'js'
  },
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
