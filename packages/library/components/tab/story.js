import { Tab } from '@muon/library/components/tab';
import setup from '@muon/library/storybook/stories';

const prefix = process.env.MUON_PREFIX;

customElements.define(`${prefix}-tab`, Tab);

const details = setup(`${prefix}-tab`, 'tab');

export default details.defaultValues;

const inner = () => {
  return `
    hello world
  `;
};

export const Standard = (args) => details.template(args, inner);
Standard.args = { icon: ' arrow-right' };
