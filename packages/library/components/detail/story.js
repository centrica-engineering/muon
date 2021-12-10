import { Detail } from '@muons/library/components/detail';
import setup from '@muons/library/storybook/stories';

const details = setup('detail', Detail);
export default details.defaultValues;

const innerDetail = (args) => `
<div slot="heading">${args.heading}</div>
${args.content}
`;
export const Standard = (args) => details.template(args, innerDetail);
Standard.args = { icon: '', heading: 'Can I manage my account online?', content: 'Yes, with an online account you can arrange a service visit, find out whatʼs happening with your appointment, submit a meter reading and book an engineer. Weʼve even got a free smartphone app.' };

export const WithIcon = (args) => details.template(args, innerDetail);
WithIcon.args = { icon: 'compass', heading: 'Can I manage my account online?', content: 'Yes, with an online account you can arrange a service visit, find out whatʼs happening with your appointment, submit a meter reading and book an engineer. Weʼve even got a free smartphone app.' };
