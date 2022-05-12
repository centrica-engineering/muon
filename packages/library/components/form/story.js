import { Form } from '@muons/library/components/form';
import setup from '@muons/library/storybook/stories';

const details = setup('form', Form);

export default details.defaultValues;

const innerDetail = () => `
<form>
  <muon-inputter value="" helper="Useful information to help populate this field." validation="[&quot;isRequired&quot;]" name="username">
    <label slot="label">Name</label>
    <input type="text" placeholder="e.g. Placeholder" name="username"/>
  </muon-inputter>
  <muon-inputter value="" helper="How can we help you?" validation="[&quot;isRequired&quot;,&quot;isEmail&quot;]" autocomplete="email" name="useremail">
    <label slot="label">Email</label>
    <input type="email" placeholder="e.g. my@email.com" autocomplete="email">
    <div slot="tip-details">By providing clarification on why this information is necessary.</div>
  </muon-inputter>
  <input type="text" name="firstname" value="" required>
  <button type="submit"><muon-cta href="#">Submit</muon-cta></button>
<form>`;

export const Standard = (args) => details.template(args, innerDetail);
