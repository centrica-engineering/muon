import { FancyCta } from './component';
import setup from '@muons/library/storybook/stories';

const details = setup(`fancy-cta`, FancyCta);

export default details.defaultValues;

const inner = (args) => `
  <h1 slot="heading">${args.heading}</h1>
  <p slot="content">${args.content}</p>
  <div slot="action">${args.action}</div>
`;

export const Standard = (args) => details.template(args, inner);
Standard.args = { heading: 'hello', content: 'test', action: 'new' };
