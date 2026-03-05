import { setCustomElementsManifest } from '@storybook/web-components';
import '@muonic/muon/js/scoped-custom-element-registry.min.js';

const cem= await (
  await fetch(new URL('../dist/custom-elements.json', import.meta.url))
).json();

setCustomElementsManifest(cem);
