import { Card } from '@muons/library/components/card';
import { Cta } from '@muons/library/components/cta';
import setup from '@muons/library/storybook/stories';

const details = setup('card', Card);

export default details.defaultValues;

const ctaDetails = setup('cta', Cta);

const innerDetail = (args) => `
  <h2 slot="header">${args.heading}</h2>
  <p>${args.content}</p>
  <${ctaDetails.defaultValues.title}>${args.cta}</${ctaDetails.defaultValues.title}>
`;

export const Flat = (args) => details.template(args, innerDetail);
Flat.args = {
  type: 'flat',
  heading: 'Can I manage my account online?',
  content: 'Yes, with an online account you can arrange a service visit, find out whatʼs happening with your appointment, submit a meter reading and book an engineer. Weʼve even got a free smartphone app.',
  cta: 'Click here'
};

export const Support = (args) => details.template(args, innerDetail);
Support.args = {
  type: 'support',
  heading: 'Can I manage my account online?',
  content: 'Yes, with an online account you can arrange a service visit, find out whatʼs happening with your appointment, submit a meter reading and book an engineer. Weʼve even got a free smartphone app.',
  cta: 'Click here'
};

export const SupportWithImage = (args) => details.template(args, innerDetail);
SupportWithImage.args = {
  type: 'support',
  image: 'https://www.britishgas.co.uk/aem6/content/dam/britishgas/images/smart-meters/Technology/Lockup%202.png',
  heading: 'Can I manage my account online?',
  content: 'Yes, with an online account you can arrange a service visit, find out whatʼs happening with your appointment, submit a meter reading and book an engineer. Weʼve even got a free smartphone app.',
  cta: 'Click here'
};
