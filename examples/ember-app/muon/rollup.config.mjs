import config from '@muonic/muon/rollup.config.mjs';

export default {
  ...config,
  output: {
    ...config.output,
    file: '../vendor/muon/index.js',
  },
};
