import { Panel } from '@muon/library/components/panel';
import setup from '@muon/library/storybook/stories';

const details = setup('panel', Panel);

export default details.defaultValues;

const inner = () => {
  return `
    hello world
  `;
};

export const Standard = (args) => details.template(args, inner);
Standard.args = { };
