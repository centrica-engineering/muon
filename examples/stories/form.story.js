import { staticHTML } from '@muonic/muon';
import setup from '@muonic/muon/storybook/stories';
import { Form } from '@muon/components/form';
import * as InputterStories from '@muon/components/inputter/story';
import { Standard as FormCTA } from '@muon/components/cta/story';

const details = setup('form', Form);

export default {
  ...details.defaultValues,
  title: 'Examples / Form'
};

const innerWebComponents = () => staticHTML`
<form class="layout-row">
  ${InputterStories.Text({
    ...InputterStories.Text.args
  })}

  ${InputterStories.Radio({
    ...InputterStories.Radio.args
  })}

  ${InputterStories.Email({
    ...InputterStories.Email.args
  })}

  ${InputterStories.Tel({
    ...InputterStories.Tel.args
  })}

  ${InputterStories.Search({
    ...InputterStories.Search.args
  })}

  ${InputterStories.Password({
    ...InputterStories.Password.args
  })}

  ${InputterStories.Number({
    ...InputterStories.Number.args
  })}

  ${InputterStories.Checkbox({
    ...InputterStories.Checkbox.args
  })}

  <div>
  ${FormCTA({
    type: 'reset',
    text: 'Reset',
    icon: ''
  })}

  ${FormCTA({
    type: 'submit',
    text: 'Submit'
  })}
  </div>
<form>`;

export const webComponents = (args) => details.template(args, innerWebComponents);

const innerWebNative = () => staticHTML`
<form class="layout-row">
  <div>
    <label for="input-text">Text</label>
    <input id="input-text" type="text" placeholder="e.g. Placeholder">
  </div>

  <div>
    <input id="radio1" name="radio" type="radio" checked="checked">
    <label for="radio1">Option A</label>
    <input id="radio2" name="radio" type="radio">
    <label for="radio2">Option B</label>
    <input id="radio3" name="radio" type="radio">
    <label for="radio3">Option C</label>
    <input id="radio4" name="radio" type="radio" disabled>
    <label for="radio4">Option D</label>
  </div>

  <div>
    <label for="input-email">Email</label>
    <input id="input-email" type="email" placeholder="e.g. my@email.com">
  </div>

  <div>
    <label for="input-tel">Tel</label>
    <input id="input-tel" type="tel" placeholder="07770888444">
  </div>

  <div>
    <label for="input-search">Search</label>
    <input id="input-search" type="search">
  </div>

  <div>
    <label for="input-password">Password</label>
    <input id="input-password" type="password">
  </div>

  <div>
    <label for="input-number">Number</label>
    <input id="input-number" type="number">
  </div>

  <div>
    <input id="checkbox1" name="checkbox" type="checkbox" checked="checked">
    <label for="checkbox1">Choice A</label>
    <input id="checkbox2" name="checkbox" type="checkbox">
    <label for="checkbox2">Choice B</label>
    <input id="checkbox3" name="checkbox" type="checkbox">
    <label for="checkbox3">Choice C</label>
    <input id="checkbox4" name="checkbox" type="checkbox" disabled>
    <label for="checkbox4">Choice D</label>
  </div>

  <div>
  <button type="reset">Reset</button>
    <button type="submit">Highpoint</button>
  </div>
<form>`;

export const nativeWeb = (args) => details.template(args, innerWebNative);

const innerMixed = () => staticHTML`
<form class="layout-row">
  ${InputterStories.Text({
    ...InputterStories.Text.args
  })}

  <div>
    <input id="radio1" name="radio" type="radio" checked="checked">
    <label for="radio1">Option A</label>
    <input id="radio2" name="radio" type="radio">
    <label for="radio2">Option B</label>
    <input id="radio3" name="radio" type="radio">
    <label for="radio3">Option C</label>
    <input id="radio4" name="radio" type="radio" disabled>
    <label for="radio4">Option D</label>
  </div>

  <div>
    <label for="input-email">Email</label>
    <input id="input-email" type="email" placeholder="e.g. my@email.com">
  </div>

  <div>
    <label for="input-tel">Tel</label>
    <input id="input-tel" type="tel" placeholder="07770888444">
  </div>

  ${InputterStories.Search({
    ...InputterStories.Search.args
  })}

  ${InputterStories.Password({
    ...InputterStories.Password.args
  })}

  <div>
    <label for="input-number">Number</label>
    <input id="input-number" type="number">
  </div>

  ${InputterStories.Checkbox({
    ...InputterStories.Checkbox.args
  })}

  ${FormCTA({
    ...FormCTA.args
  })}
<form>`;

export const Mixed = (args) => details.template(args, innerMixed);
