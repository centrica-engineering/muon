import { Inputter } from '@muonic/muon/components/inputter';
import setup from '@muonic/muon/storybook/stories';
import customValidation from '@muon/utils/validation/index.js';
import { staticHTML, unsafeStatic } from '@muonic/muon';

const details = setup('inputter', Inputter);

export default {
  ...details.defaultValues,
  parameters: {
    controls: {
      exclude: ['standardTemplate']
    }
  },
  argTypes: {
    ...details.defaultValues.argTypes,
    validation: {
      control: {
        type: 'multi-select',
        options: [...Object.keys(customValidation)]
      }
    }
  }
};

const autoCompleteTemplate = (args) => args.autocomplete ? unsafeStatic(`autocomplete="${args.autocomplete}"`) : '';

const placeHolderTemplate = (args) => args.placeholder ? unsafeStatic(`placeholder="${args.placeholder}"`) : '';

const disabledTemplate = (args) => args.disabled ? unsafeStatic(`disabled`) : '';

const labelTemplate = (args) => staticHTML`
  <label slot="label">${args.label}</label>`;

const tipDetailsTemplate = (args) => staticHTML`
  <div slot="tip-details">${args.tip}</div>`;

const inputTemplate = (args) => staticHTML`
<input type="${args.inputtype}" ${placeHolderTemplate(args)} ${autoCompleteTemplate(args)} ${disabledTemplate(args)}>`;

const singleTemplate = (args) => staticHTML`
  ${args.label ? labelTemplate(args) : ''}
  ${args.inputtype ? inputTemplate(args) : ''}
  ${args.tip ? tipDetailsTemplate(args) : ''}`;

const InputterStandardTemplate = (args) => details.template(args, singleTemplate);
export const Text = InputterStandardTemplate.bind({});
Text.args = {
  inputtype: 'text',
  label: 'Text',
  value: '',
  helper: 'Useful information to help populate this field.',
  tip: '',
  validation: ['isRequired'],
  placeholder: 'e.g. Placeholder'
};

export const Email = InputterStandardTemplate.bind({});
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

export const Tel = InputterStandardTemplate.bind({});
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

export const Search = InputterStandardTemplate.bind({});
Search.args = {
  inputtype: 'search',
  label: 'Search'
};

export const Password = InputterStandardTemplate.bind({});
Password.args = {
  inputtype: 'password',
  label: 'Password'
};

export const Disabled = InputterStandardTemplate.bind({});
Disabled.args = {
  inputtype: 'text',
  label: 'Disabled',
  value: '',
  validation: ['isRequired'],
  placeholder: 'e.g. Placeholder',
  disabled: true
};

export const Date = InputterStandardTemplate.bind({});
Date.args = {
  inputtype: 'date',
  label: 'Date',
  value: '',
  placeholder: '',
  validation: ['isRequired', 'minDate(\'01/01/2022\')']
};

export const DateMask = InputterStandardTemplate.bind({});
DateMask.args = {
  inputtype: 'text',
  label: 'Date Mask',
  value: '',
  placeholder: '',
  mask: 'dd/mm/yyyy',
  separator: '/',
  validation: ['isRequired', 'minDate(\'01/01/2022\')']
};

export const Mask = InputterStandardTemplate.bind({});
Mask.args = {
  inputtype: 'text',
  label: 'Mask',
  value: '',
  placeholder: '',
  mask: '000000',
  validation: ['isRequired']
};

export const Separator = InputterStandardTemplate.bind({});
Separator.args = {
  inputtype: 'text',
  label: 'Separator',
  value: '',
  placeholder: '',
  mask: '  -  -  ',
  separator: '-'
};

const innerNumber = (args) => staticHTML`
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

const innerTextarea = (args) => staticHTML`
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

const innerMultiple = (args) => staticHTML`
  <input type="${args.inputtype}" name="${args.name}" value="${args.value}" ${unsafeStatic(args.states?.join(' ') ?? '')} id="${args.id}">
  <label for="${args.id}">${unsafeStatic(args.label)}</label>`;

const multiTemplate = (args) => staticHTML`
  ${args.options?.map((option, i) => {
    const id = `${args.inputtype}-0${i + 1}`;
    return staticHTML`${innerMultiple({
      ...args,
      value: option.value,
      label: option.label,
      id,
      states: option.states
    })}`;
  })}
  ${args.tip ? tipDetailsTemplate(args) : ''}
`;

const InputterMultipleTemplate = (args) => details.template(args, multiTemplate);
export const Checkbox = InputterMultipleTemplate.bind({});
Checkbox.args = {
  inputtype: 'checkbox',
  heading: 'What options do you like?',
  helper: 'How can we help you?',
  tip: 'By providing clarification on why this information is necessary.',
  validation: ['isRequired'],
  name: 'checkboxes',
  options: [
    { label: 'Option A', value: 'a', states: ['checked'] },
    { label: 'Option B', value: 'b' },
    { label: 'Option C', value: 'c' },
    { label: 'Option D', value: 'd', states: ['disabled'] }
  ]
};

export const Radio = InputterMultipleTemplate.bind({});
Radio.args = {
  inputtype: 'radio',
  heading: 'Which choice would you prefer?',
  helper: 'How can we help you?',
  tip: 'By providing clarification on why this information is necessary.',
  validation: ['isRequired'],
  name: 'radiobuttons',
  options: [
    { label: 'Choice A', value: 'a', states: ['checked'] },
    { label: 'Choice B', value: 'b' },
    { label: 'Choice C', value: 'c' },
    { label: 'Choice D', value: 'd', states: ['disabled'] }
  ]
};

const selectTemplate = (args) => staticHTML`
  <label slot="label">${args.label}</label>
  <select name="${args.name}">
  ${args.options?.map((option) => staticHTML`<option value="${option.value}" ${unsafeStatic(option.states?.join(' ') ?? '')}>${option.label}</option>`)}
  </select>
`;

export const Select = (args) => details.template(args, selectTemplate);
Select.args = {
  label: 'Select',
  value: '',
  validation: ['isRequired'],
  name: 'select',
  options: [
    { label: 'Please select', value: '' },
    { label: 'Value one', value: 'value-01' },
    { label: 'Value two', value: 'value-02', states: ['selected'] },
    { label: 'Value three', value: 'value-03' },
    { label: 'Value four', value: 'value-04' }
  ]
};
