import { Form } from '@muons/library/components/form';
import setup from '@muons/library/storybook/stories';

const details = setup('form', Form);

export default details.defaultValues;

const innerDetail = () => `
<form>
  <muon-inputter value="" helper="Useful information to help populate this field." validation="[&quot;isRequired&quot;]" name="username">
    <label slot="label">Name</label>
    <input type="text" placeholder="e.g. Placeholder"/>
  </muon-inputter>

  <muon-inputter value="" helper="How can we help you?" validation="[&quot;isRequired&quot;,&quot;isEmail&quot;]" autocomplete="email" name="useremail">
    <div>
      <label slot="label">Email</label>
      <input type="email" placeholder="e.g. my@email.com" autocomplete="email">
    </div>
    <div slot="tip-details">By providing clarification on why this information is necessary.</div>
  </muon-inputter>
  
  <input type="text" name="firstname" value="" required>

  <muon-inputter name="checkboxes" heading="What options do you like?" helper="How can we help you?" validation="[&quot;isRequired&quot;]">
    <input type="checkbox" value="a" checked id="check-01">
    <label for="check-01">Option A</label>
    <input type="checkbox" value="b" id="check-02">
    <label for="check-02">Option B</label>
    <div slot="tip-details">By providing clarification on why this information is necessary.</div>
  </muon-inputter>

  <button><muon-cta href="#">Submit</muon-cta></button>
<form>`;

export const Standard = (args) => details.template(args, innerDetail);
