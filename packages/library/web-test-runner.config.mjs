import stylesPlugin from 'rollup-plugin-styles';
import { fromRollup } from '@web/dev-server-rollup';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import autoprefixer from 'autoprefixer';
import postcssPreset from 'postcss-preset-env';
import postcssImport from 'postcss-import';

const styles = fromRollup(stylesPlugin);
const processEnv = fromRollup(injectProcessEnv);

// process.env.MUON_PREFIX = 'testing';

export default {
  nodeResolve: true,
  mimeTypes: {
    '**/*.css': 'js',
  },
  plugins: [
    processEnv(
      {
        MUON_PREFIX: 'muon',
      },
      {
        exclude: '**/*.css'
      }
    ),
    styles({
      plugins: [
        postcssImport(),
        postcssPreset({ stage: 0 }),
        autoprefixer({ grid: true, overrideBrowserslist: ['last 2 versions'] })
      ]
    })
  ],
};
