import { Form } from '@muonic/muon/components/form';
import setup from '@muonic/muon/storybook/stories';
import * as InputterStories from '../inputter/story';
import { Standard as SubmitCTA } from '../cta/story';

const details = setup('form', Form);

export default details.defaultValues;

const innerDetail = () => `
<form class="layout-row">
  ${InputterStories.Text({
    ...InputterStories.Text.args
  })}

  ${InputterStories.Email({
    ...InputterStories.Email.args
  })}

  <div>
    <label for="user-id">User ID</label>
    <input type="text" id="user-id" name="user-id" required>
  </div>

  ${InputterStories.Checkbox({
    ...InputterStories.Checkbox.args,
    value: 'b',
    options: [
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b' }
    ]
  })}

  <div>
    <input type="reset">
  </div>

  ${SubmitCTA({ ...SubmitCTA.args,
    type: 'submit',
    text: 'Submit'
  })}

<form>`;

export const Standard = (args) => details.template(args, innerDetail);
