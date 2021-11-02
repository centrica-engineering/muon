import { Card } from '@muon/library/components/card';
import setup from '@muon/library/storybook/stories';

const details = setup('card', Card);

export default details.defaultValues;

const inner = (args) => `
  <h1 slot="heading">${args.heading}</h1>
  <p slot="content">${args.content}</p>
  <div slot="action">${args.action}</div>
`;

export const Standard = (args) => details.template(args, inner);
Standard.args = { heading: 'hello', content: 'test', action: 'new' };

export const Image = (args) => details.template(args, inner);
Image.args = { heading: 'hello', content: 'test', action: 'new', image: 'https://www.britishgas.co.uk/aem6/content/dam/britishgas/images/ns/homepage/engineer-van-homepage.jpg' };
