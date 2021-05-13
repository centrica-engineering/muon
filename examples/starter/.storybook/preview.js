import { setCustomElements } from '@web/storybook-prebuilt/web-components';
import '../dist/muon.min.css';

const customElements= await (
  await fetch(new URL('../dist/custom-elements.json', import.meta.url))
).json();

setCustomElements(customElements);
