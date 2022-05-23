import { Detail } from '@muonic/muon/components/detail';
import setup from '@muonic/muon/storybook/stories';

const details = setup('detail', Detail);

export default details.defaultValues;

const innerDetail = (args) => `
  <div slot="heading">${args.heading}</div>
  ${args.content}
`;

export const Standard = (args) => details.template(args, innerDetail);
Standard.args = {
  heading: 'Where can I buy an ice cream?',
  content: 'We have the most wonderful shop just in town, that sells a whole variety of different ice creams. Just pop on in and we can get you sorted with your favourite flavour!'
};

export const WithIcon = (args) => details.template(args, innerDetail);
WithIcon.args = {
  icon: 'dot-circle',
  heading: 'Where can I buy an ice cream?',
  content: 'We have the most wonderful shop just in town, that sells a whole variety of different ice creams. Just pop on in and we can get you sorted with your favourite flavour!'
};
