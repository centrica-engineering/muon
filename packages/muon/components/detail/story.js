import { Detail } from '@muonic/muon/components/detail';
import setup from '@muonic/muon/storybook/stories';
import { staticHTML, unsafeStatic } from '@muonic/muon';

const details = setup('detail', Detail);

export default {
  ...details.defaultValues,
  parameters: {
    controls: {
      exclude: ['standardTemplate']
    }
  }
};

const innerDetail = (args) => staticHTML`
  <div slot="heading">${unsafeStatic(args.heading)}</div>
  ${unsafeStatic(args.content)}
`;

const StandardTemplate = (args) => details.template(args, innerDetail);
export const Standard = StandardTemplate.bind({});
Standard.args = {
  heading: 'Where can I buy an ice cream?',
  content: 'We have the most wonderful shop just in town, that sells a whole variety of different ice creams. Just pop on in and we can get you sorted with your favourite flavour!'
};

export const WithIcon = StandardTemplate.bind({});
WithIcon.args = {
  icon: 'dot-circle',
  heading: 'Where can I buy an ice cream?',
  content: 'We have the most wonderful shop just in town, that sells a whole variety of different ice creams. Just pop on in and we can get you sorted with your favourite flavour!'
};
