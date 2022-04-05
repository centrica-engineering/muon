import { Card } from '@muons/library/components/card';
import setup from '@muons/library/storybook/stories';

const details = setup('card', Card);

export default details.defaultValues;

const innerDetail = (args) => `
  <h2 slot="header">${args.header}</h2>
  ${args.content}
  <div slot="footer">${args.footer}</div>
`;

export const Standard = (args) => details.template(args, innerDetail);
Standard.args = {
  header: 'Can I manage my account online?',
  content: `<p>Yes, with an online account you can arrange a service visit, find out what's happening with your appointment, submit a meter reading and book an engineer. We've even got a free smartphone app.</p>`,
  footer: `<a href='#'> Click here </a>`
};

export const StandardWithImage = (args) => details.template(args, innerDetail);
StandardWithImage.args = {
  image: 'https://www.britishgas.co.uk/aem6/content/dam/britishgas/images/smart-meters/Technology/Lockup%202.png',
  alt: '',
  background: false,
  header: 'Can I manage my account online?',
  content: `<p>Yes, with an online account you can arrange a service visit, find out what's happening with your appointment, submit a meter reading and book an engineer. We've even got a free smartphone app.</p>
            <p>Yes, with an online account you can arrange a service visit, find out what's happening with your appointment, submit a meter reading and book an engineer. We've even got a free smartphone app.</p>`,
  footer: `<a href='#'> Click here </a>`
};
