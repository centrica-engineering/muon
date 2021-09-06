import { Image } from '@muon/library/components/image';
import setup from '@muon/library/storybook/stories';

const prefix = process.env.MUON_PREFIX;

customElements.define(`${prefix}-image`, Image);

const details = setup(`${prefix}-image`, 'image');

export default details.defaultValues;

export const Standard = (args) => details.template(args, (args) => args.text);
Standard.args = { src: 'https://www.britishgas.co.uk/aem6/content/dam/britishgas/images/ns/homepage/engineer-van-homepage.jpg' };

export const Background = (args) => details.template(args, (args) => args.text);
Background.args = { src: 'https://www.britishgas.co.uk/aem6/content/dam/britishgas/images/ns/homepage/engineer-van-homepage.jpg', background: true };
