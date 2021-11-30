import { fromRollup } from '@web/dev-server-rollup';
import stylesPlugin from 'rollup-plugin-styles';
import replacePlugin from '@rollup/plugin-replace';
import autoprefixer from 'autoprefixer';
import postcssPreset from 'postcss-preset-env';
import postcssImport from 'postcss-import';
import postcssVariables from 'postcss-simple-vars';
import * as variables from '../build/tokens/es6/muon-tokens.mjs';

const styles = fromRollup(stylesPlugin);
const replace = fromRollup(replacePlugin);

export default [
  replace({
    preventAssignment: true,
    values: {
      'process.env.MUON_PREFIX': JSON.stringify('muon')
    }
  }),
  styles({
    plugins: [
      postcssVariables({
        variables,
        unknown(node) {
          node.remove(); // removing unknown or unset tokens
        }
      }),
      postcssImport(),
      postcssPreset({
        stage: 0,
        features: {
          'logical-properties-and-values': false /* allowing start end values */
        }
      }),
      autoprefixer({ grid: true })
    ]
  })
];
