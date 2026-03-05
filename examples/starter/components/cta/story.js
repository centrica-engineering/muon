import { TestCta } from './cta-component';
import setup from '@muonic/muon/storybook/stories';

const details = setup('testcta', TestCta);

export default {
  ...details.defaultValues,
  title: 'Components/CTA'
};

export const Standard = (args) => details.template(args, (args) => args.text);
Standard.args = { text: 'Highpoint', type: 'text' };

export const Disabled = (args) => details.template(args, (args) => args.text);
Disabled.args = { text: 'Highpoint', disabled: true, type: 'text' };
