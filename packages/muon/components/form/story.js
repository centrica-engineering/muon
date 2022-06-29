import { Form } from '@muonic/muon/components/form';
import setup from '@muonic/muon/storybook/stories';
import * as InputterStories from '../inputter/story';
import { Standard as SubmitCTA } from '../cta/story';
import { staticHTML } from '@muonic/muon';

const details = setup('form', Form);

export default {
  ...details.defaultValues,
  parameters: {
    controls: {
      exclude: ['standardTemplate', 'submit']
    }
  },
  argTypes: {
    ...details.defaultValues.argTypes,
    formElementCount: {
      control: {
        type: 'range',
        min: 1,
        max: 10,
        step: 1
      },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 3 }
      }
    }
    children: {
      formElements: {
        control: 'object'
      }
    }
  }
};

const innerDetail = (args) => staticHTML`
  <form>
    ${InputterStories.Text(args.Text)}
    ${InputterStories.Email(args.Email)}

    <label for="user-id">User ID<label>
    <input type="text" id="user-id" name="user-id" required/>

    ${InputterStories.Checkbox(args.Checkbox)}

    <input type="reset" />
    ${SubmitCTA(args.Submit)}
  <form>`;

export const Standard = (args) => details.template(args, innerDetail);
Standard.args = {
  children: {
    Text: {
      ...InputterStories.Text.args,
      children: {
        ...InputterStories.Text.args.children,
        name: 'username',
        label: 'Name'
      }
    },
    Email: {
      ...InputterStories.Email.args,
      children: {
        ...InputterStories.Email.args.children,
        name: 'useremail'
      }
    },
    Checkbox: {
      ...InputterStories.Checkbox.args,
      children: {
        ...InputterStories.Checkbox.args.children,
        value: 'b',
        options: [
          { label: 'Option A', value: 'a' },
          { label: 'Option B', value: 'b' }
        ]
      }
    },
    Submit: {
      ...SubmitCTA.args,
      type: 'submit',
      text: 'Submit'
    }
  }
};

const dynamicInnerDetail = (args) => staticHTML`
  <form>
  ${args.formElements.map((formElement) => {
    return InputterStories[formElement.type](formElement.formElement);
  })}
  </form>
`;

const constructDynamicFormElements = (args) => {
  let i = args.children.formElements?.length ?? 0;
  for (; i < args.formElementCount; i++) {
    args.children.formElements.push({
      type: 'Text',
      formElement: {
        ...InputterStories.Text.args,
        children: {
          ...InputterStories.Text.args.children,
          options: {
            ...InputterStories.Text.args.children.options
          }
        },
        name: `name0${i}`
      }
    });
  }
  return dynamicInnerDetail;
};
export const DynamicForm = (args) => details.template(args, constructDynamicFormElements(args));
DynamicForm.args = {
  formElementCount: 2,
  children: {
    formElements: []
  }
};
