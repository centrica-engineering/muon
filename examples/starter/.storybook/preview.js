import { setCustomElementsManifest } from '@web/storybook-prebuilt/web-components';
// import '../dist/muon.min.css';

import '@webcomponents/scoped-custom-element-registry';
import customElements from '../dist/custom-elements.json';

setCustomElementsManifest(customElements);
