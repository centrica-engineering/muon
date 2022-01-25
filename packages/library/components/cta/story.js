import { Cta } from '@muons/library/components/cta';
import setup from '@muons/library/storybook/stories';

const details = setup('cta', Cta);

export default details.defaultValues;

export const Standard = (args) => details.template(args, (args) => args.text);
Standard.args = { text: 'Highpoint' };

export const Disabled = (args) => details.template(args, (args) => args.text);
Disabled.args = { text: 'Highpoint', disabled: true };

export const Hidden = (args) => details.template(args, (args) => args.text);
Hidden.args = { text: 'Highpoint', hidden: true };

export const Loading = (args) => details.template(args, (args) => args.text);
Loading.args = { text: 'Highpoint', loading: true };

export const StandardLink = (args) => details.template(args, (args) => args.text);
StandardLink.storyName = 'Standard [link]';
StandardLink.args = { text: 'Highpoint', href: '#!' };

export const DisabledLink = (args) => details.template(args, (args) => args.text);
DisabledLink.storyName = 'Disabled [link]';
DisabledLink.args = { text: 'Highpoint', disabled: true, href: '#!' };

export const HiddenLink = (args) => details.template(args, (args) => args.text);
HiddenLink.storyName = 'hidden [link]';
HiddenLink.args = { text: 'Highpoint', hidden: true, href: '#!' };

export const LoadingLink = (args) => details.template(args, (args) => args.text);
LoadingLink.storyName = 'Loading [link]';
LoadingLink.args = { text: 'Highpoint', loading: true, href: '#!' };

const btnEnable = `
  <script>
    Array.from(document.querySelectorAll('muon-cta')).forEach((cta) => {
      cta._isButton = true;
    })
  </script>
`;

export const StandardButton = (args) => `${details.template(args, (args) => args.text)}${btnEnable}`;
StandardButton.storyName = 'Standard [button]';
StandardButton.args = { text: 'Highpoint' };

export const DisabledButton = (args) => `${details.template(args, (args) => args.text)}${btnEnable}`;
DisabledButton.storyName = 'Disabled [button]';
DisabledButton.args = { text: 'Highpoint', disabled: true };

export const HiddenButton = (args) => `${details.template(args, (args) => args.text)}${btnEnable}`;
HiddenButton.storyName = 'Hidden [button]';
HiddenButton.args = { text: 'Highpoint', hidden: true };

export const LoadingButton = (args) => `${details.template(args, (args) => args.text)}${btnEnable}`;
LoadingButton.storyName = 'Loading [button]';
LoadingButton.args = { text: 'Highpoint', loading: true };

export const StandardForm = (args) => `<form>${details.template(args, (args) => args.text)}</form>`;
StandardForm.storyName = 'Standard [within form]';
StandardForm.args = { text: 'Highpoint' };

export const DisabledForm = (args) => `<form>${details.template(args, (args) => args.text)}</form>`;
DisabledForm.storyName = 'Disabled [within form]';
DisabledForm.args = { text: 'Highpoint', disabled: true };

export const HiddenForm = (args) => `<form>${details.template(args, (args) => args.text)}</form>`;
HiddenForm.storyName = 'Hidden [within form]';
HiddenForm.args = { text: 'Highpoint', hidden: true };

export const LoadingForm = (args) => `<a href="${args.link}">${details.template(args, (args) => args.text)}</a>`;
LoadingForm.storyName = 'Loading [within link]';
LoadingForm.args = { text: 'Highpoint', loading: true };

export const StandardWithinLink = (args) => `<a href="${args.link}">${details.template(args, (args) => args.text)}</a>`;
StandardWithinLink.storyName = 'Standard [within link]';
StandardWithinLink.args = { text: 'Highpoint', link: '#!' };

export const DisabledWithinLink = (args) => `<a href="${args.link}">${details.template(args, (args) => args.text)}</a>`;
DisabledWithinLink.storyName = 'Disabled [within link]';
DisabledWithinLink.args = { text: 'Highpoint', disabled: true, link: '#!' };

export const HiddenWithinLink = (args) => `<a href="${args.link}">${details.template(args, (args) => args.text)}</a>`;
HiddenWithinLink.storyName = 'Hidden [within link]';
HiddenWithinLink.args = { text: 'Highpoint', hidden: true, link: '#!' };

export const LoadingWithinLink = (args) => `<a href="${args.link}">${details.template(args, (args) => args.text)}</a>`;
LoadingWithinLink.storyName = 'Loading [within link]';
LoadingWithinLink.args = { text: 'Highpoint', loading: true, link: '#!' };

export const StandardWithinButton = (args) => `<button>${details.template(args, (args) => args.text)}</button>`;
StandardWithinButton.storyName = 'Standard [within button]';
StandardWithinButton.args = { text: 'Highpoint', link: '#!' };

export const DisabledWithinButton = (args) => `<button disabled>${details.template(args, (args) => args.text)}</button>`;
DisabledWithinButton.storyName = 'Disabled [within button]';
DisabledWithinButton.args = { text: 'Highpoint', disabled: true, link: '#!' };

export const HiddenWithinButton = (args) => `<button hidden>${details.template(args, (args) => args.text)}</button>`;
HiddenWithinButton.storyName = 'Hidden [within button]';
HiddenWithinButton.args = { text: 'Highpoint', hidden: true, link: '#!' };

export const LoadingWithinButton = (args) => `<button>${details.template(args, (args) => args.text)}</button>`;
LoadingWithinButton.storyName = 'Loading [within button]';
LoadingWithinButton.args = { text: 'Highpoint', loading: true, link: '#!' };

Standard.parameters = {
  percy: {
    additionalSnapshots: [{
      suffix: 'test'
    }]
  }
};
