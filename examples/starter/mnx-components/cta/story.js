import { MnxTestCta } from './testcta-component';
import setup from '@muonic/muon/storybook/stories';

const details = setup('testcta', MnxTestCta, 'mnx');

export default details.defaultValues;

export const Standard = (args) => details.template(args, (args) => args.text);
Standard.args = { text: 'Highpoint', type: 'text' };

export const Disabled = (args) => details.template(args, (args) => args.text);
Disabled.args = { text: 'Highpoint', disabled: true, type: 'text' };
