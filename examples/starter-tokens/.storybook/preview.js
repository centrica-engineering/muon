import { setCustomElementsManifest } from '@web/storybook-prebuilt/web-components';
import '@muonic/muon/js/scoped-custom-element-registry.min.js';
// import '../dist/muon.min.css';

const cem= await (
  await fetch(new URL('../dist/custom-elements.json', import.meta.url))
).json();

setCustomElementsManifest(cem);
