import { Form } from '@muonic/muon/components/form';
import setup from '@muonic/muon/storybook/stories';

const details = setup('form', Form);

export default details.defaultValues;

const innerDetail = () => `
<form>
  <muon-inputter helper="Useful information to help populate this field." validation='["isRequired"]' name="username">
    <label slot="label">Name</label>
    <input type="text" placeholder="e.g. Placeholder" name="username"/>
  </muon-inputter>

  <muon-inputter value="" helper="How can we help you?" validation="[&quot;isRequired&quot;,&quot;isEmail&quot;]" autocomplete="email">
      <label slot="label">Email</label>
      <input type="email" placeholder="e.g. my@email.com" autocomplete="email" name="useremail">
    <div slot="tip-details">By providing clarification on why this information is necessary.</div>
  </muon-inputter>
  
  <label for="user-id">User ID<label>
  <input type="text" id="user-id" name="user-id" required/>

  <muon-inputter heading="What options do you like?" helper="How can we help you?" validation='["isRequired"]' value="b">
    <input type="checkbox" name="checkboxes" value="a" id="check-01">
    <label for="check-01">Option A</label>
    <input type="checkbox" name="checkboxes" value="b" id="check-02">
    <label for="check-02">Option B</label>
    <div slot="tip-details">By providing clarification on why this information is necessary.</div>
  </muon-inputter>
  <input type="reset" />
  <muon-cta type="submit">Submit</muon-cta>
<form>`;

export const Standard = (args) => details.template(args, innerDetail);
