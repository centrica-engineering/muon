import { Calendar } from '@muon/library/components/calendar';
import setup from '@muon/library/storybook/stories';

const details = setup('calendar', Calendar);

export default details.defaultValues;

const inner = () => {
  return `
    hello world
  `;
};

export const Standard = (args) => details.template(args, inner);
Standard.args = { 'min-date': '2021-08-06', 'disabled-dates': ['13/08/2021'] };
