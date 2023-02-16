import { Form } from '@muonic/muon/components/form';
import setup from '@muonic/muon/storybook/stories';
import * as InputterStories from '../inputter/story';
import { Standard as SubmitCTA } from '../cta/story';
import { staticHTML } from '@muonic/muon';

const details = setup('form', Form);

export default {
  component: details.component,
  ...details.defaultValues,
  parameters: {
    controls: {
      exclude: ['standardTemplate', 'submit']
    }
  }
};

const innerDetail = (args) => staticHTML`
  <form>
    ${InputterStories.Select(args.Title)}
    ${InputterStories.Text(args.Text)}
    ${InputterStories.Email(args.Email)}

    <label for="user-id">User ID</label>
    <input type="text" id="user-id" name="user-id" required/>

    ${InputterStories.DateMask(args.DOB)}

    ${InputterStories.Checkbox(args.Checkbox)}

    <input type="reset" />
    ${SubmitCTA(args.Submit)}
  <form>`;

export const Standard = (args) => details.template(args, innerDetail);
Standard.args = {
  Title: {
    ...InputterStories.Select.args,
    name: 'title',
    label: 'Title'
  },
  Text: {
    ...InputterStories.Text.args,
    name: 'username',
    label: 'Name',
    value: 'text'
  },
  Email: {
    ...InputterStories.Email.args,
    name: 'useremail'
  },
  Checkbox: {
    ...InputterStories.Checkbox.args,
    value: 'b',
    options: [
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b' }
    ]
  },
  DOB: {
    ...InputterStories.DateMask.args,
    name: 'dob',
    label: 'Date of birth',
    validation: ['maxDate(\'031/12/2022\')']
  },
  Submit: {
    ...SubmitCTA.args,
    type: 'submit',
    text: 'Submit'
  }
};
