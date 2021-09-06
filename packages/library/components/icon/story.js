import { Icon } from '@muon/library/components/icon';
import setup from '@muon/library/storybook/stories';

const prefix = process.env.MUON_PREFIX;

customElements.define(`${prefix}-icon`, Icon);

const details = setup(`${prefix}-icon`, 'icon');

export default details.defaultValues;

export const Standard = (args) => details.template(args);
Standard.args = { name: 'arrow-right' };
