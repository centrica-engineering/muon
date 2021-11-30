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

const choiceInputText = (args) => `
  <h4 slot="heading">What is your heating source?</h4>
  <p slot="tip-details">more about this</p>
  <input type="${args.inputtype}" name="question" value="gas" checked></input>
  <label for="gas">Gas</label>
  <input type="${args.inputtype}" name="question" value="electricity"></input>
  <label for="electricity">Electricity</label>
`;
export const Radio = (args) => details.template(args, choiceInputText);
Radio.args = { inputtype: 'radio', label: 'A label', value: 'gas' };

export const Checkbox = (args) => details.template(args, choiceInputText);
Checkbox.args = { inputtype: 'checkbox', label: 'A label', value: 'gas' };

const selectInputText = (args) => `
<label slot="label" for="select-input">${args.label}</label>
  <select name="select" id="select-input">
    <option value="">Please Select</option>
    <option value="value-01">One</option>
    <option value="value-02">Two</option>
    <option value="value-03">Three</option>
    <option value="value-04">Four</option>
  </select>
`;

export const Select = (args) => details.template(args, selectInputText);
Select.args = { label: 'A label', value: 'gas' };

const textareaInputText = (args) => `
  <label slot="label" for="textarea-input">${args.label}</label>
  <textarea id="textarea-input">${args.value}</textarea>
`;

export const Textarea = (args) => details.template(args, textareaInputText);
Textarea.args = { label: 'A label', value: 'gas' };
