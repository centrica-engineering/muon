import { staticHTML } from '@muonic/muon';
import { Cta } from '@muonic/muon/components/cta';
import setup from '@muonic/muon/storybook/stories';

const details = setup('cta', Cta);
const tag = details.getTagEl();

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

export const LoadingLink = (args) => details.template(args, (args) => args.text);
LoadingLink.storyName = 'Loading [link]';
LoadingLink.args = { text: 'Highpoint', loading: true, href: '#!' };

export const StandardButton = (args) => {
  const dArgs = details.dynamicArgs(args);

  return staticHTML`<${tag} ${dArgs} ._isButton=${true}>${args.text}</${tag}>`;
};
StandardButton.storyName = 'Standard [button]';
StandardButton.args = { text: 'Highpoint' };

export const DisabledButton = (args) => {
  const dArgs = details.dynamicArgs(args);

  return staticHTML`<${tag} ${dArgs} ._isButton=${true}>${args.text}</${tag}>`;
};
DisabledButton.storyName = 'Disabled [button]';
DisabledButton.args = { text: 'Highpoint', disabled: true };

export const LoadingButton = (args) => {
  const dArgs = details.dynamicArgs(args);

  return staticHTML`<${tag} ${dArgs} ._isButton=${true}>${args.text}</${tag}>`;
};
LoadingButton.storyName = 'Loading [button]';
LoadingButton.args = { text: 'Highpoint', loading: true };

export const StandardForm = (args) => staticHTML`<form>${details.template(args, (args) => args.text)}</form>`;
StandardForm.storyName = 'Standard [within form]';
StandardForm.args = { text: 'Highpoint' };

export const DisabledForm = (args) => staticHTML`<form>${details.template(args, (args) => args.text)}</form>`;
DisabledForm.storyName = 'Disabled [within form]';
DisabledForm.args = { text: 'Highpoint', disabled: true };

export const LoadingForm = (args) => staticHTML`<a href="${args.link}">${details.template(args, (args) => args.text)}</a>`;
LoadingForm.storyName = 'Loading [within link]';
LoadingForm.args = { text: 'Highpoint', loading: true };

export const StandardWithinLink = (args) => staticHTML`<a href="${args.link}">${details.template(args, (args) => args.text)}</a>`;
StandardWithinLink.storyName = 'Standard [within link]';
StandardWithinLink.args = { text: 'Highpoint', link: '#!' };

export const DisabledWithinLink = (args) => staticHTML`<a href="${args.link}">${details.template(args, (args) => args.text)}</a>`;
DisabledWithinLink.storyName = 'Disabled [within link]';
DisabledWithinLink.args = { text: 'Highpoint', disabled: true, link: '#!' };

export const LoadingWithinLink = (args) => staticHTML`<a href="${args.link}">${details.template(args, (args) => args.text)}</a>`;
LoadingWithinLink.storyName = 'Loading [within link]';
LoadingWithinLink.args = { text: 'Highpoint', loading: true, link: '#!' };

export const StandardWithinButton = (args) => staticHTML`<button>${details.template(args, (args) => args.text)}</button>`;
StandardWithinButton.storyName = 'Standard [within button]';
StandardWithinButton.args = { text: 'Highpoint', link: '#!' };

export const DisabledWithinButton = (args) => staticHTML`<button disabled>${details.template(args, (args) => args.text)}</button>`;
DisabledWithinButton.storyName = 'Disabled [within button]';
DisabledWithinButton.args = { text: 'Highpoint', disabled: true, link: '#!' };

export const LoadingWithinButton = (args) => staticHTML`<button>${details.template(args, (args) => args.text)}</button>`;
LoadingWithinButton.storyName = 'Loading [within button]';
LoadingWithinButton.args = { text: 'Highpoint', loading: true, link: '#!' };
