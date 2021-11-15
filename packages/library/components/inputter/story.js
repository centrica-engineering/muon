import { Inputter } from '@muon/library/components/inputter';
import setup from '@muon/library/storybook/stories';

const prefix = process.env.MUON_PREFIX;

customElements.define(`${prefix}-inputter`, Inputter);

const details = setup(`${prefix}-inputter`, 'inputter');

export default details.defaultValues;

const innerInputText = (args) => `
  <label slot="label">${args.label}</label>
  <input type="text" value="${args.value}" />
  <p slot="tip-details">more about this</p>
`;

export const Standard = (args) => details.template(args, innerInputText);
Standard.args = { label: 'A label', value: 'this is a test', validation: '[&quot;isRequired&quot;,&quot;isFirstName&quot;]', showError: 'true', helper: 'What does it mean?', isHelperOpen: 'true' };

const choiceInputText = (args) => `
  <h4 slot="heading">What is your heating source?</h4>
  <p slot="tip-details">more about this</p>
  <input type="${args.type}" name="question" value="gas" />
  <label for="gas">Gas</label>
  <input type="${args.type}" name="question" value="electricity" />
  <label for="electricity">Electriicity</label>
`;
export const Radio = (args) => details.template(args, choiceInputText);
Radio.args = { type: 'radio', label: 'A label', value: 'gas', validation: '[&quot;isRequired&quot;]', showError: 'true', helper: 'What does it mean?', isHelperOpen: 'true' };

export const Checkbox = (args) => details.template(args, choiceInputText);
Checkbox.args = { type: 'checkbox', label: 'A label', value: 'gas', validation: '[&quot;isRequired&quot;]', showError: 'true', helper: 'What does it mean?', isHelperOpen: 'true' };
