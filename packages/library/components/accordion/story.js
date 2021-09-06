import { Accordion } from '@muon/library/components/accordion';
import setup from '@muon/library/storybook/stories';

const prefix = process.env.MUON_PREFIX;

customElements.define(`${prefix}-accordion`, Accordion);

const details = setup(`${prefix}-accordion`, 'accordion');

export default details.defaultValues;

const inner = (args) => {
  return `
    <h1 slot="heading">${args.heading}</h1>
    <muon-accordion-details>
      <h2 slot="heading">this is the heading</h2>
      <p>This is a paragraph</p>
    </muon-accordion-details>
  `;
};

export const Standard = (args) => details.template(args, inner);
Standard.args = { heading: 'heading' };
