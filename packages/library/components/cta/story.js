import { Cta } from '@muon/library/components/cta';
import setup from '@muon/library/storybook/stories';

const prefix = process.env.MUON_PREFIX;

customElements.define(`${prefix}-cta`, Cta);

const details = setup(`${prefix}-cta`, 'cta');

export default details.defaultValues;

export const Standard = (args) => details.template(args, (args) => args.text);
Standard.args = { text: 'hello' };

export const Text = (args) => details.template(args, (args) => args.text);
Text.args = { text: 'hello', type: 'text' };

export const Loading = (args) => details.template(args, (args) => args.text);
Loading.args = { text: 'hello', loading: true };

export const Hidden = (args) => `${details.template(args, (args) => args.text)}`;
Hidden.args = { text: 'hello', loading: true, hidden: true };
