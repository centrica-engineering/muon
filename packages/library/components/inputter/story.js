import { Inputter } from '@muon/library/components/inputter';
import setup from '@muon/library/storybook/stories';

const prefix = process.env.MUON_PREFIX;

customElements.define(`${prefix}-inputter`, Inputter);

const details = setup(`${prefix}-inputter`, 'inputter');

export default details.defaultValues;

const innerInputText = (args) => `
  <label slot="label">${args.label}</label>
  <input type="text" value="${args.value}" />
`;

export const Standard = (args) => details.template(args, innerInputText);
Standard.args = { label: 'A label', value: 'this is a test' };
