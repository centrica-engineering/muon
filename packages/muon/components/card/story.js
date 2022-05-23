import { Card } from '@muonic/muon/components/card';
import setup from '@muonic/muon/storybook/stories';

const details = setup('card', Card);

export default details.defaultValues;

const innerDetail = (args) => `
  <h2 slot="header">${args.header}</h2>
  ${args.content}
  <div slot="footer">${args.footer}</div>
`;

export const Standard = (args) => details.template(args, innerDetail);
Standard.args = {
  header: 'Where can I buy an ice cream?',
  content: `<p>We have the most wonderful shop just in town, that sells a whole variety of different ice creams. Just pop on in and we can get you sorted with your favourite flavour!</p>`,
  footer: ` We've even got a free <a href='#!'>smartphone app</a>.`
};

export const StandardWithImage = (args) => details.template(args, innerDetail);
StandardWithImage.args = {
  image: 'https://blog.nucleus.design/vanilla-first/vanilla-ice-cream-cone.jpg',
  alt: '',
  background: false,
  header: 'Where can I buy an ice cream?',
  content: `<p>We have the most wonderful shop just in town, that sells a whole variety of different ice creams. Just pop on in and we can get you sorted with your favourite flavour!</p>
            <p>We have the most wonderful shop just in town, that sells a whole variety of different ice creams. Just pop on in and we can get you sorted with your favourite flavour!</p>`,
  footer: ` We've even got a free <a href='#!'>smartphone app</a>.`
};
