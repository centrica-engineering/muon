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
  <input type="${args.inputtype}" placeholder="${args.placeholder}">
  ${args.tip ? tipDetailsTemplate(args) : ''}
`;

export const Text = (args) => details.template(args, innerText);
Text.args = {
  inputtype: 'text',
  label: 'Text',
  value: '',
  helper: 'Useful information to help populate this field.',
  validation: ['isRequired'],
  placeholder: 'e.g. Placeholder'
};

const innerEmail = (args) => `
  ${args.label ? labelTemplate(args) : ''}
  <input type="${args.inputtype}" placeholder="${args.placeholder}" autocomplete="${args.autocomplete}">
  ${args.tip ? tipDetailsTemplate(args) : ''}
`;

export const Email = (args) => details.template(args, innerEmail);
Email.args = {
  inputtype: 'email',
  label: 'Email',
  value: '',
  helper: 'How can we help you?',
  tip: 'By providing clarification on why this information is necessary.',
  validation: ['isRequired', 'isEmail'],
  placeholder: 'e.g. my@email.com',
  autocomplete: 'email'
};

const innerTel = (args) => `
  ${args.label ? labelTemplate(args) : ''}
  <input type="${args.inputtype}" placeholder="${args.placeholder}" autocomplete="${args.autocomplete}">
  ${args.tip ? tipDetailsTemplate(args) : ''}
`;

export const Tel = (args) => details.template(args, innerTel);
Tel.args = {
  inputtype: 'tel',
  label: 'Tel',
  value: '',
  helper: 'How can we help you?',
  tip: 'By providing clarification on why this information is necessary.',
  validation: ['isRequired'],
  placeholder: 'e.g. 07770888444',
  autocomplete: 'tel'
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

const innerDisabled = (args) => `
  ${args.label ? labelTemplate(args) : ''}
  <input type="${args.inputtype}" placeholder="${args.placeholder}" disabled>
  ${args.tip ? tipDetailsTemplate(args) : ''}
`;

export const Disabled = (args) => details.template(args, innerDisabled);
Disabled.args = {
  inputtype: 'text',
  label: 'Disabled',
  value: '',
  validation: ['isRequired'],
  placeholder: 'e.g. Placeholder'
};

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
  placeholder: '',
  validation: ['isRequired', 'minDate(\'01/01/2022\')']
};

export const DateMask = (args) => details.template(args, innerText);
DateMask.args = {
  inputtype: 'text',
  label: 'Date Mask',
  value: '',
  placeholder: '',
  mask: 'dd/mm/yyyy',
  separator: '/',
  validation: ['isRequired', 'minDate(\'01/01/2022\')']
};

export const Mask = (args) => details.template(args, innerText);
Mask.args = {
  inputtype: 'text',
  label: 'Mask',
  value: '',
  placeholder: '',
  mask: '000000',
  validation: ['isRequired']
};

export const Separator = (args) => details.template(args, innerText);
Separator.args = {
  inputtype: 'text',
  label: 'Separator',
  value: '',
  placeholder: '',
  mask: '  -  -  ',
  separator: '-'
};

const innerNumber = (args) => `
  ${args.label ? labelTemplate(args) : ''}
  <input type="${args.inputtype}"  min="${args.min}" max="${args.max}">
  ${args.tip ? tipDetailsTemplate(args) : ''}
`;

export const Number = (args) => details.template(args, innerNumber);
Number.args = {
  inputtype: 'number',
  label: 'Number',
  validation: ['isRequired', 'isBetween(5,20)'],
  min: 0,
  max: 10
};

const innerTextarea = (args) => `
  <label slot="label">${args.label}</label>
  <textarea placeholder="${args.placeholder}"></textarea>
`;

export const Textarea = (args) => details.template(args, innerTextarea);
Textarea.args = {
  label: 'Textarea',
  value: '',
  validation: ['isRequired'],
  placeholder: 'e.g. Provide information'
};

const innerCheckbox = (args) => `
  <input type="checkbox" name="checkboxes" value="a" checked id="check-01">
  <label for="check-01">Option A</label>
  <input type="checkbox" name="checkboxes" value="b" id="check-02">
  <label for="check-02">Option B</label>
  <input type="checkbox" name="checkboxes" value="c" id="check-03">
  <label for="check-03">Option C</label>
  <input type="checkbox" name="checkboxes" value="d" disabled id="check-04">
  <label for="check-04">Option D</label>
  ${args.tip ? tipDetailsTemplate(args) : ''}
`;

export const Checkbox = (args) => details.template(args, innerCheckbox);
Checkbox.args = {
  heading: 'What options do you like?',
  helper: 'How can we help you?',
  tip: 'By providing clarification on why this information is necessary.',
  validation: ['isRequired']
};

const innerRadio = (args) => `
  <input type="radio" name="radiobuttons" value="a" checked id="radio-01">
  <label for="radio-01">Choice A</label>
  <input type="radio" name="radiobuttons" value="b" id="radio-02">
  <label for="radio-02">Choice B</label>
  <input type="radio" name="radiobuttons" value="c" id="radio-03">
  <label for="radio-03">Option C</label>
  <input type="radio" name="radiobuttons" value="d" disabled id="radio-04">
  <label for="radio-04">Choice D</label>
  ${args.tip ? tipDetailsTemplate(args) : ''}
`;

export const Radio = (args) => details.template(args, innerRadio);
Radio.args = {
  heading: 'Which choice would you prefer?',
  helper: 'How can we help you?',
  tip: 'By providing clarification on why this information is necessary.',
  validation: ['isRequired']
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
  validation: ['isRequired']
};
