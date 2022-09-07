import { setCustomElementsManifest } from '@web/storybook-prebuilt/web-components.js';
import '@webcomponents/scoped-custom-element-registry';
import cem from '../dist/custom-elements.json';

setCustomElementsManifest(cem);