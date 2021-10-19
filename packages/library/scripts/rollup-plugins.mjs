import { fromRollup } from '@web/dev-server-rollup';
import stylesPlugin from 'rollup-plugin-styles';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import autoprefixer from 'autoprefixer';
import postcssPreset from 'postcss-preset-env';
import postcssImport from 'postcss-import';
import postcssCustomProperties from 'postcss-custom-properties';

const styles = fromRollup(stylesPlugin);
const processEnv = fromRollup(injectProcessEnv);

export default [
  processEnv(
    {
      MUON_PREFIX: 'muon'
    },
    {
      exclude: '**/*.css'
    }
  ),
  styles({
    plugins: [
      postcssImport(),
      postcssCustomProperties({ /*preserve: false*/ }),
      postcssPreset({ stage: 0 }),
      autoprefixer({ grid: true, overrideBrowserslist: ['last 2 versions'] })
    ]
  })
];
