import plugins from '@muon/library/scripts/rollup-plugins.mjs';

// process.env.MUON_PREFIX = 'testing';

export default {
  nodeResolve: true,
  mimeTypes: {
    '**/*.css': 'js'
  },
  plugins: [
    ...plugins
  ]
};
