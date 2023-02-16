import { Icon } from '@muonic/muon/components/icon';
import setup from '@muonic/muon/storybook/stories';
import {
  ICON_CONFIG_SIZES
} from '@muonic/muon/build/tokens/es6/muon-tokens.mjs';

const details = setup('icon', Icon);

export default {
  component: details.component,
  ...details.defaultValues,
  parameters: {
    controls: {
      exclude: ['standardTemplate', 'sizes', 'iconSize', 'allSizes']
    }
  },
  argTypes: {
    ...details.defaultValues.argTypes,
    size: {
      control:
      { type: 'range', min: 1, max: ICON_CONFIG_SIZES.length, step: 1 }
    }
  }
};

export const Standard = (args) => details.template(args);
Standard.args = { name: 'arrow-right' };
