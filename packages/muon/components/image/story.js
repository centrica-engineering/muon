import { Image } from '@muonic/muon/components/image';
import setup from '@muonic/muon/storybook/stories';

const details = setup('image', Image);

export default details.defaultValues;

const StandardTemplate = (args) => details.template(args, (args) => args.text);

export const Standard = StandardTemplate.bind({});
Standard.args = { src: 'https://blog.nucleus.design/vanilla-first/vanilla-ice-cream-cone.jpg', placeholder: '(src).thumb.48.48.png' };

export const Background = StandardTemplate.bind({});
Background.args = { src: 'https://blog.nucleus.design/multi-branding/Multibrand.jpg', placeholder: '(src).thumb.48.48.png', background: true };
