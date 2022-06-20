import { Icon } from '@muonic/muon/components/icon';
import setup from '@muonic/muon/storybook/stories';
import {
  ICON_CONFIG_SIZES
} from '@muonic/muon/build/tokens/es6/muon-tokens.mjs';

const details = setup('icon', Icon);

details.defaultValues.argTypes = {
  ...details.defaultValues.argTypes,
  iconSize: {
    table: {
      disable: true
    }
  },
  size: {
    control: {
      type: 'select',
      options: [...ICON_CONFIG_SIZES]
    }
  }
};

export default details.defaultValues;

export const Standard = (args) => details.template(args);
Standard.args = { name: 'arrow-right' };
