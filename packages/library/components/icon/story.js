import { Icon } from '@muon/library/components/icon';
import setup from '@muon/library/storybook/stories';

const details = setup('icon', Icon);

export default details.defaultValues;

export const Standard = (args) => details.template(args);
Standard.args = { name: 'arrow-right' };
