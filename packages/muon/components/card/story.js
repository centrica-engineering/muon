import { staticHTML, unsafeStatic } from '@muonic/muon';
import setup from '@muonic/muon/storybook/stories';
import { Card } from '@muon/components/card';
import { StandardLink as CTALink } from '@muon/components/cta/story';

const details = setup('card', Card);

export default {
  component: details.component,
  ...details.defaultValues,
  parameters: {
    controls: {
      exclude: ['standardTemplate']
    }
  }
};

const innerDetail = (args) => staticHTML`
  <h2 slot="header">${unsafeStatic(args.header)}</h2>
  ${unsafeStatic(args.content)}
  <div slot="footer">${unsafeStatic(args.footer)}</div>
`;

const StandardTemplate = (args) => details.template(args, innerDetail);
export const Standard = StandardTemplate.bind({});
Standard.args = {
  header: 'Where can I buy an ice cream?',
  content: `<p>We have the most wonderful shop just in town, that sells a whole variety of different ice creams. Just pop on in and we can get you sorted with your favourite flavour!</p>`,
  footer: `We've even got a free <a href='#!'>smartphone app</a>.`
};

export const StandardWithImage = StandardTemplate.bind({});
StandardWithImage.args = {
  image: 'https://blog.nucleus.design/vanilla-first/vanilla-ice-cream-cone.jpg',
  alt: '',
  background: false,
  header: 'Where can I buy an ice cream?',
  content: `<p>We have the most wonderful shop just in town, that sells a whole variety of different ice creams. Just pop on in and we can get you sorted with your favourite flavour!</p>
            <p>We have the most wonderful shop just in town, that sells a whole variety of different ice creams. Just pop on in and we can get you sorted with your favourite flavour!</p>`,
  footer: `We've even got a free <a href='#!'>smartphone app</a>.`
};

const innerDetailWithCTA = (args) => staticHTML`
  <h2 slot="header">${unsafeStatic(args.header)}</h2>
  ${unsafeStatic(args.content)}
  <div slot="footer">${CTALink(args.cta)}</div>
`;
export const StandardWithCTA = (args) => details.template(args, innerDetailWithCTA);
StandardWithCTA.args = {
  header: 'Where can I buy an ice cream?',
  content: `<p>We have the most wonderful shop just in town, that sells a whole variety of different ice creams. Just pop on in and we can get you sorted with your favourite flavour!</p>`,
  cta: { ...CTALink.args, text: 'Click Here', href: '#!' }
};
