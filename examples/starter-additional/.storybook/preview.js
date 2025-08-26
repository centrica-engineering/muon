import { setCustomElementsManifest } from '@web/storybook-prebuilt/web-components.js';
import '@muonic/muon/js/scoped-custom-element-registry.min.js';
import cem from '../dist/custom-elements.json';

setCustomElementsManifest(cem);