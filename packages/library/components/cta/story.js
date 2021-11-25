import { Cta } from '@muon/library/components/cta';
import setup from '@muon/library/storybook/stories';

const details = setup('cta', Cta);

export default details.defaultValues;

export const Standard = (args) => details.template(args, (args) => args.text);
Standard.args = { text: 'Highpoint' };

export const Disabled = (args) => details.template(args, (args) => args.text);
Disabled.args = { text: 'Highpoint', disabled: true };

export const Hidden = (args) => details.template(args, (args) => args.text);
Hidden.args = { text: 'Highpoint', hidden: true };

export const Loading = (args) => details.template(args, (args) => args.text);
Loading.args = { text: 'Highpoint', loading: true };
