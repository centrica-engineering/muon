import { Inputter } from '@muon/library/components/inputter';
import setup from '@muon/library/storybook/stories';

const details = setup('inputter', Inputter);

export default details.defaultValues;

const innerInputText = (args) => `
  <label slot="label">${args.label}</label>
  <input type="text" value="${args.value}" />
`;

export const Standard = (args) => details.template(args, innerInputText);
Standard.args = { label: 'A label', value: 'this is a test' };
