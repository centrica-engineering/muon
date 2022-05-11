import { Form } from '@muons/library/components/form';
import setup from '@muons/library/storybook/stories';

const details = setup('form', Form);

export default details.defaultValues;

const innerDetail = () => `
<muon-inputter value="" helper="Useful information to help populate this field." validation="[&quot;isRequired&quot;]" name="username">
  <label slot="label">Name</label>
  <input type="text" placeholder="e.g. Placeholder"/>
</muon-inputter>
<muon-inputter value="" helper="How can we help you?" validation="[&quot;isRequired&quot;,&quot;isEmail&quot;]" autocomplete="email" name="useremail">
  <label slot="label">Email</label>
  <input type="email" placeholder="e.g. my@email.com" autocomplete="email">
  <div slot="tip-details">By providing clarification on why this information is necessary.</div>
</muon-inputter>
<button type="submit">Submit</button>`;

export const Standard = (args) => details.template(args, innerDetail);
