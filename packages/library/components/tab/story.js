import { Tab } from '@muon/library/components/tab';
import setup from '@muon/library/storybook/stories';

const details = setup('tab', Tab);

export default details.defaultValues;

const inner = () => {
  return `
    hello world
  `;
};

export const Standard = (args) => details.template(args, inner);
Standard.args = { icon: ' arrow-right' };
