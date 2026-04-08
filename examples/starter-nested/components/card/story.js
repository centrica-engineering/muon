import { TestCard } from './card-component';
import setup from '@muonic/muon/storybook/stories';
import { html } from '@muonic/muon';

const details = setup(`test-card`, TestCard);

export default details.defaultValues;

export const Standard = (args) => details.template(args, () => html`<starter-cta>Highpoint</starter-cta>`);
Standard.args = {};
