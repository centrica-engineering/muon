import { Form } from '@muonic/muon/components/form';
import setup from '@muonic/muon/storybook/stories';
import * as InputterStories from '../components/inputter/story';
import { Standard as FormCTA } from '../components/cta/story';

const details = setup('form', Form);
details.defaultValues.title = 'Examples / Form';
export default details.defaultValues;

const innerDetail = () => `
<form>
  ${InputterStories.Text({
    ...InputterStories.Text.args,
    name: 'username',
    label: 'Name'
  })}

  ${InputterStories.Password({
    ...InputterStories.Password.args,
    name: 'userpassword'
  })}

  ${FormCTA({ ...FormCTA.args,
    type: 'reset',
    text: 'Clear',
    icon: ''
  })}

  ${FormCTA({ ...FormCTA.args,
    type: 'submit',
    text: 'Submit'
  })}
<form>`;

export const LoginForm = (args) => details.template(args, innerDetail);
