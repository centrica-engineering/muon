import { setCustomElementsManifest } from '@web/storybook-prebuilt/web-components';
// import '../dist/muon.min.css';

import '@muonic/muon/js/scoped-custom-element-registry.min.js';
import customElements from '../dist/custom-elements.json';

setCustomElementsManifest(customElements);
