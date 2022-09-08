import { setCustomElementsManifest } from '@web/storybook-prebuilt/web-components';
import '@webcomponents/scoped-custom-element-registry';
// import '../dist/muon.min.css';

const cem= await (
  await fetch(new URL('../dist/custom-elements.json', import.meta.url))
).json();

setCustomElementsManifest(cem);
