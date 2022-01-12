import { setCustomElements } from '@web/storybook-prebuilt/web-components';
import isChromatic from "chromatic/isChromatic";

const url = isChromatic() ? 'custom-elements.json' : '../dist/custom-elements.json';
const customElements = await (
  await fetch(url)
).json();

setCustomElements(customElements);
