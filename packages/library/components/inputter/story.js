import { Inputter } from '@muons/library/components/inputter';
import setup from '@muons/library/storybook/stories';

const details = setup('inputter', Inputter);

export default details.defaultValues;

const labelTemplate = (args) => `
  <label slot="label">${args.label}</label>
`;

const tipDetailsTemplate = (args) => `
  <div slot="tip-details">${args.tip}</div>
`;

const innerText = (args) => `
  ${args.label ? labelTemplate(args) : ''}
  <input type="${args.inputtype}" value="${args.value}" placeholder="${args.placeholder}">
  ${args.tip ? tipDetailsTemplate(args) : ''}
`;

export const Text = (args) => details.template(args, innerText);
Text.args = {
  inputtype: 'text',
  label: 'Text',
  value: '',
  helper: 'Supporting information to help',
  validation: '[&quot;isRequired&quot;]',
  placeholder: 'Placeholder'
};

const innerEmail = (args) => `
  ${args.label ? labelTemplate(args) : ''}
  <input type="${args.inputtype}" value="${args.value}" placeholder="${args.placeholder}">
  ${args.tip ? tipDetailsTemplate(args) : ''}
`;

export const Email = (args) => details.template(args, innerEmail);
Email.args = {
  inputtype: 'email',
  label: 'Email',
  value: '',
  helper: 'How can we help you?',
  tip: 'By providing clarification on why this information is necessary.',
  validation: '[&quot;isRequired&quot;,&quot;isEmail&quot;]',
  placeholder: 'email@address.com'
};

const innerTel = (args) => `
  ${args.label ? labelTemplate(args) : ''}
  <input type="${args.inputtype}" value="${args.value}" placeholder="${args.placeholder}">
  ${args.tip ? tipDetailsTemplate(args) : ''}
`;

export const Tel = (args) => details.template(args, innerTel);
Tel.args = {
  inputtype: 'tel',
  label: 'Tel',
  value: '',
  helper: 'How can we help you?',
  tip: 'By providing clarification on why this information is necessary.',
  validation: '[&quot;isRequired&quot;]',
  placeholder: '01234888777'
};

const innerSearch = (args) => `
  ${args.label ? labelTemplate(args) : ''}
  <input type="${args.inputtype}">
  ${args.tip ? tipDetailsTemplate(args) : ''}
`;

export const Search = (args) => details.template(args, innerSearch);
Search.args = {
  inputtype: 'search',
  label: 'Search'
};

const innerPassword = (args) => `
  ${args.label ? labelTemplate(args) : ''}
  <input type="${args.inputtype}">
  ${args.tip ? tipDetailsTemplate(args) : ''}
`;

export const Password = (args) => details.template(args, innerPassword);
Password.args = {
  inputtype: 'password',
  label: 'Password'
};

export const Disabled = (args) => details.template(args, innerDisabled);
Disabled.args = {
  inputtype: 'text',
  label: 'Disabled',
  value: '',
  validation: '[&quot;isRequired&quot;]',
  placeholder: 'Placeholder'
};

const innerDisabled = (args) => `
  ${args.label ? labelTemplate(args) : ''}
  <input type="${args.inputtype}" value="${args.value}" placeholder="${args.placeholder}" disabled>
  ${args.tip ? tipDetailsTemplate(args) : ''}
`;

const innerDate = (args) => `
  ${args.label ? labelTemplate(args) : ''}
  <input type="${args.inputtype}">
  ${args.tip ? tipDetailsTemplate(args) : ''}
`;
export const Date = (args) => details.template(args, innerDate);
Date.args = {
  inputtype: 'date',
  label: 'Date',
  value: '',
  validation: '[&quot;isRequired&quot;,&quot;minDate(\'01/01/2022\')&quot;]'
};

const innerNumber = (args) => `
  ${args.label ? labelTemplate(args) : ''}
  <input type="${args.inputtype}">
  ${args.tip ? tipDetailsTemplate(args) : ''}
`;

export const Number = (args) => details.template(args, innerNumber);
Number.args = {
  inputtype: 'number',
  label: 'Number'
};

const innerTextarea = (args) => `
  <label slot="label">${args.label}</label>
  <textarea placeholder="${args.placeholder}">${args.value}</textarea>
`;

export const Textarea = (args) => details.template(args, innerTextarea);
Textarea.args = {
  label: 'Textarea',
  value: '',
  validation: '[&quot;isRequired&quot;]',
  placeholder: 'Provide information'
};

const innerCheckbox = (args) => `
  <input type="checkbox" name="checkboxes" value="a" id="check-01"></input>
  <label for="check-01">Option A</label>
  <input type="checkbox" name="checkboxes" value="b" id="check-02"></input>
  <label for="check-02">Option B</label>
  <input type="checkbox" name="checkboxes" value="c" id="check-03"></input>
  <label for="check-03">Option C</label>
  ${args.tip ? tipDetailsTemplate(args) : ''}
`;

export const Checkbox = (args) => details.template(args, innerCheckbox);
Checkbox.args = {
  heading: 'What options do you like?',
  helper: 'How can we help you?',
  tip: 'By providing clarification on why this information is necessary.',
  validation: '[&quot;isRequired&quot;]'
};

const innerRadio = (args) => `
  <input type="radio" name="radiobuttons" value="a" id="radio-01"></input>
  <label for="radio-01">Choice A</label>
  <input type="radio" name="radiobuttons" value="b" id="radio-02"></input>
  <label for="radio-02">Choice B</label>
  <input type="radio" name="radiobuttons" value="c" id="radio-03"></input>
  <label for="radio-03">Choice C</label>
  ${args.tip ? tipDetailsTemplate(args) : ''}
`;

export const Radio = (args) => details.template(args, innerRadio);
Radio.args = {
  heading: 'Which choice would you prefer?',
  helper: 'How can we help you?',
  tip: 'By providing clarification on why this information is necessary.',
  validation: '[&quot;isRequired&quot;]'
};

const innerSelect = (args) => `
  <label slot="label">${args.label}</label>
  <select name="select">
    <option value="">Please select</option>
    <option value="value-01">Value one</option>
    <option value="value-02">Value two</option>
    <option value="value-03">Value three</option>
    <option value="value-04">Value four</option>
  </select>
`;

export const Select = (args) => details.template(args, innerSelect);
Select.args = {
  label: 'Select',
  value: '',
  validation: '[&quot;isRequired&quot;]'
};
