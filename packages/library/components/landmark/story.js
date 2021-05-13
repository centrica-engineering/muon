import { Landmark } from "@muon/library/components/landmark";
import setup from "@muon/library/storybook/stories";

const prefix = process.env.MUON_PREFIX;

customElements.define(`${prefix}-landmark`, Landmark);

const details = setup(`${prefix}-landmark`, 'landmark');

export default details.defaultValues;

const inner = (args) => `
  <h1 slot="heading">${args.heading}</h1>
  <p slot="content">${args.content}</p>
  <div slot="action">${args.action}</div>
`

export const Standard = (args) => details.template(args, inner);
Standard.args = { heading: 'hello', content: 'test', action: 'new' };
