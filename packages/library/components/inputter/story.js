import { Inputter } from '@muons/library/components/inputter';
import setup from '@muons/library/storybook/stories';

const details = setup('inputter', Inputter);

export default details.defaultValues;

const innerInputText = (args) => `
  <label slot="label">${args.label}</label>
  <input type="text" value="${args.value}" placeholder="Placeholder" disabled>
  <div slot="tip-details">By providing clarification on why this information is necessary.</div>
`;

export const Standard = (args) => details.template(args, innerInputText);
Standard.args = { label: 'A label', value: '', helper: 'How can we help you? ', validation: '[&quot;isRequired&quot;,&quot;minLength(6)&quot;]' };

const choiceInputText = (args) => `
  <input type="${args.inputtype}" name="question" value="gas"></input>
  <label for="gas">Gas</label>
  <input type="${args.inputtype}" name="question" value="electricity"></input>
  <label for="electricity">Electricity</label>
  <div slot="tip-details">By providing clarification on why this information is necessary.</div>
`;
export const Radio = (args) => details.template(args, choiceInputText);
Radio.args = { inputtype: 'radio', value: '', heading: 'What is your heating source?', helper: 'How can we help you? ', validation: '[&quot;isRequired&quot;]' };

export const Checkbox = (args) => details.template(args, choiceInputText);
Checkbox.args = { inputtype: 'checkbox', value: '', heading: 'What is your heating source?', helper: 'How can we help you? ', validation: '[&quot;isRequired&quot;]' };

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
Select.args = { label: 'A label', value: 'gas', validation: '[&quot;isRequired&quot;]' };

const textareaInputText = (args) => `
  <label slot="label" for="textarea-input">${args.label}</label>
  <textarea id="textarea-input">${args.value}</textarea>
`;

export const Textarea = (args) => details.template(args, textareaInputText);
Textarea.args = { label: 'A label', value: 'gas', validation: '[&quot;isRequired&quot;]' };

const innerInputDate = (args) => `
  <label slot="label">${args.label}</label>
  <input type="text" value="${args.value}">
`;
export const Date = (args) => details.template(args, innerInputDate);
Date.args = { label: 'A label', value: '', validation: '[&quot;isRequired&quot;,&quot;minDate(\'11/11/2021\')&quot;]' };

const innerInputTel = (args) => `
  <label slot="label">${args.label}</label>
  <input type="tel" value="${args.value}" pattern="[0-9]{3}" title="match the pattern"/>
`;

export const Tel = (args) => details.template(args, innerInputTel);
Tel.args = { label: 'A label', value: '', validation: '[&quot;isRequired&quot;]' };
