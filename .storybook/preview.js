import { setCustomElementsManifest } from '@storybook/web-components';
import '@webcomponents/scoped-custom-element-registry';
import cem from '../dist/custom-elements.json';

// import '../dist/muon.min.css';

setCustomElementsManifest(cem);

export const parameters = {
  axe: {
    disabledRules: [
      "html-has-lang"
    ],
  },
};