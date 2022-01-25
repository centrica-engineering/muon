import { Inputter } from '@muons/library/components/inputter';
import setup from '@muons/library/storybook/stories';

const details = setup('inputter', Inputter);

export default details.defaultValues;

const innerInputText = (args) => `
  <label slot="label">${args.label}</label>
  <input type="text" value="${args.value}" />
  <p slot="tip-details">More details about the input element</p>
`;

export const Standard = (args) => details.template(args, innerInputText);
Standard.args = { label: 'A label', value: 'this is a test', helper: 'what does this mean? ', validation: '[&quot;isRequired&quot;,&quot;minLength(6)&quot;]' };

const choiceInputText = (args) => `
  <input type="${args.inputtype}" name="question" value="gas"></input>
  <label for="gas">Gas</label>
  <input type="${args.inputtype}" name="question" value="electricity"></input>
  <label for="electricity">Electricity</label>
  <p slot="tip-details">more about this</p>
`;
export const Radio = (args) => details.template(args, choiceInputText);
Radio.args = { inputtype: 'radio', value: '', heading: 'What is your heating source?', helper: 'what does this mean? ', validation: '[&quot;isRequired&quot;]' };

export const Checkbox = (args) => details.template(args, choiceInputText);
Checkbox.args = { inputtype: 'checkbox', value: '', heading: 'What is your heating source?', helper: 'what does this mean? ', validation: '[&quot;isRequired&quot;]' };

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

export const Mask = (args) => details.template(args, innerInputText);
Mask.args = { label: 'A label', value: '', mask: '000000' };

export const Separator = (args) => details.template(args, innerInputText);
Separator.args = { label: 'A label', value: '', separator: '-', mask: '  -  -  ' };

const innerInputDate = (args) => `
  <label slot="label">${args.label}</label>
  <input type="text" value="${args.value}" />
`;
export const Date = (args) => details.template(args, innerInputDate);
Date.args = { label: 'A label', value: '', validation: '[&quot;isRequired&quot;,&quot;minDate(\'11/11/2021\')&quot;]' };

export const DateMask = (args) => details.template(args, innerInputDate);
DateMask.args = { label: 'A label', value: '', mask: 'dd/mm/yyyy', separator: '/', validation: '[&quot;isRequired&quot;,&quot;minDate(\'11/11/2021\')&quot;]' };

const innerInputTel = (args) => `
  <label slot="label">${args.label}</label>
  <input type="tel" value="${args.value}" pattern="[0-9]{3}" title="match the pattern"/>
`;

export const Tel = (args) => details.template(args, innerInputTel);
Tel.args = { label: 'A label', value: '', validation: '[&quot;isRequired&quot;]', mask: '000-000-0000', separator: '-' };

const innerInputNumber = (args) => `
  <label slot="label">${args.label}</label>
  <input type="number" value="${args.value}" />
`;
export const Number = (args) => details.template(args, innerInputNumber);
Number.args = { label: 'A label', value: '', validation: '[&quot;isRequired&quot;]' };
