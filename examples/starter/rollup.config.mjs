import merge from 'deepmerge';
import config from '@muonic/muon/rollup.config.mjs';

export default merge(config, {
  ...config
});
