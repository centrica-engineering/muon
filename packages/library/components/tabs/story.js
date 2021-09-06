import { Tabs } from '@muon/library/components/tabs';
import setup from '@muon/library/storybook/stories';

const prefix = process.env.MUON_PREFIX;

customElements.define(`${prefix}-tabs`, Tabs);

const details = setup(`${prefix}-tabs`, 'tabs');

export default details.defaultValues;

const inner = () => {
  return `
    hello world
  `;
};

export const Standard = (args) => details.template(args, inner);
Standard.args = {};
