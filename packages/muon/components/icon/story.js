import { Icon } from '@muonic/muon/components/icon';
import setup from '@muonic/muon/storybook/stories';

const details = setup('icon', Icon);

export default details.defaultValues;

export const Standard = (args) => details.template(args);
Standard.args = { name: 'arrow-right' };
