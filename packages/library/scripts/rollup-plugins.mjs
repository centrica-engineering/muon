import { fromRollup } from '@web/dev-server-rollup';
import stylesPlugin from 'rollup-plugin-styles';
import replacePlugin from '@rollup/plugin-replace';
import autoprefixer from 'autoprefixer';
import postcssPreset from 'postcss-preset-env';
import postcssImport from 'postcss-import';
import postcssCustomProperties from 'postcss-custom-properties';

const styles = fromRollup(stylesPlugin);
const replace = fromRollup(replacePlugin);

export default [
  replace({
    'process.env.MUON_PREFIX': JSON.stringify('muon')
  }),
  styles({
    plugins: [
      postcssImport(),
      postcssCustomProperties({ /*preserve: false*/ }),
      postcssPreset({ stage: 0 }),
      autoprefixer({ grid: true, overrideBrowserslist: ['last 2 versions'] })
    ]
  })
];
