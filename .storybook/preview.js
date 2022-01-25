import { setCustomElements } from '@web/storybook-prebuilt/web-components';

const customElements = await (
  await fetch(new URL('../dist/custom-elements.json', import.meta.url))
).json();

setCustomElements(customElements);

export const parameters = {
  percy: {
    additionalSnapshots: [{
      suffix: 'test'
    }]
  }
};