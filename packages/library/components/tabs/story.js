import { Tabs } from '@muon/library/components/tabs';
import setup from '@muon/library/storybook/stories';

const details = setup('tabs', Tabs);

export default details.defaultValues;

const inner = () => {
  return `
    hello world
  `;
};

export const Standard = (args) => details.template(args, inner);
Standard.args = {};
