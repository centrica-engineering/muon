import { Lockup } from '@muon/library/components/lockup';
import setup from '@muon/library/storybook/stories';

const prefix = process.env.MUON_PREFIX;

customElements.define(`${prefix}-lockup`, Lockup);

const details = setup(`${prefix}-lockup`, 'lockup');

export default details.defaultValues;

const inner = (args) => `
  <muon-image slot="media" src="${args.image}"></muon-image>
  <h2 slot="heading">${args.heading}</h2>
  <p slot="content">${args.content}</p>
  <a slot="action" href="${args.actionLink}">${args.actionText}</a>
`;

export const Standard = (args) => details.template(args, inner);
Standard.args = {
  image: 'https://www.britishgas.co.uk/aem6/content/dam/britishgas/images/ns/homepage/engineer-van-homepage.jpg',
  heading: 'A heading',
  content: 'some content',
  actionText: 'Action text',
  actionLink: '!#'
};
