import { AccordionDetails } from '@muon/library/components/accordion-details';
import setup from '@muon/library/storybook/stories';

const details = setup('accordion-details', AccordionDetails);

export default details.defaultValues;

const inner = (args) => {
  return `
    <h2 slot="heading">${args.heading}</h2>
    ${args.content}
  `;
};

export const Standard = (args) => details.template(args, inner);
Standard.args = { heading: 'This is a heading', content: 'this is some content', open: false };
