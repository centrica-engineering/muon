import { setCustomElementsManifest } from '@storybook/web-components';
import '@muonic/muon/js/scoped-custom-element-registry.min.js';
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