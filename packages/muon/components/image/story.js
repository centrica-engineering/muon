import setup from '@muonic/muon/storybook/stories';
import { Image } from '@muon/components/image';
import { IMAGE_CONFIG_RATIOS } from '@muonic/muon/build/tokens/es6/muon-tokens.mjs';

const details = setup('image', Image);

export default {
  ...details.defaultValues,
  parameters: {
    controls: {
      exclude: ['standardTemplate', 'placeholderImage']
    }
  },
  argTypes: {
    ...details.defaultValues.argTypes,
    ratio: {
      options: IMAGE_CONFIG_RATIOS,
      control: {
        type: 'inline-radio'
      }
    }
  }
};

const StandardTemplate = (args) => details.template(args, (args) => args.text);

export const Standard = StandardTemplate.bind({});
Standard.args = { src: 'https://blog.nucleus.design/vanilla-first/vanilla-ice-cream-cone.jpg', placeholder: '(src).thumb.48.48.png' };

export const Background = StandardTemplate.bind({});
Background.args = { src: 'https://blog.nucleus.design/multi-branding/Multibrand.jpg', placeholder: '(src).thumb.48.48.png', background: true };
