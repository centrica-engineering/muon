import { NsContainer } from './container-component';
import setup from '@muonic/muon/storybook/stories';
import { staticHTML } from '@muonic/muon';

const details = setup('container', NsContainer, 'ns-labs');

export default {
  ...details.defaultValues,
  title: 'Labs/ns-labs-container'
};

const innerDetails = () => {
  return staticHTML`
    <h3>The <code>background-color</code> of <code>.container</code> is in the <code>ShadowDOM</code></h3>
    <p>This <code>border-color</code> and the <code>color</code> are in the <code>light-dom</code>.</p>
    <p>The <code>background-color</code> of this is <code>::slotted(p)</code></p>
  `;
};

export const Standard = (args) => details.template(args, innerDetails);
