import { Panel } from '@muon/library/components/panel';
import setup from '@muon/library/storybook/stories';

const prefix = process.env.MUON_PREFIX;

customElements.define(`${prefix}-panel`, Panel);

const details = setup(`${prefix}-panel`, 'panel');

export default details.defaultValues;

const inner = () => {
  return `
    hello world
  `;
};

export const Standard = (args) => details.template(args, inner);
Standard.args = { };
