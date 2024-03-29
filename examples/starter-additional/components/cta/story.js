import { FancyCta } from './component';
import setup from '@muonic/muon/storybook/stories';

const details = setup(`fancy-cta`, FancyCta);

export default details.defaultValues;

export const Standard = (args) => details.template(args, (args) => args.text);
Standard.args = { text: 'hello' };
