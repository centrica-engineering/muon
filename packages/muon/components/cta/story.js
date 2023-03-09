import { staticHTML } from '@muonic/muon';
import setup from '@muonic/muon/storybook/stories';
import { Cta } from '@muon/components/cta';

const details = setup('cta', Cta);
const tag = details.getTagEl();

export default {
  component: details.component,
  title: 'Components/Cta',
  parameters: {
    controls: {
      exclude: ['standardTemplate', 'submitTemplate', 'resetTemplate', 'loading-message']
    }
  }
};

const StandardTemplate = (args) => staticHTML`${details.template(args, (args) => args.text)}`;
const ButtonTemplate = (args) => {
  const dArgs = details.dynamicArgs(args);

  return staticHTML`<${tag} ${dArgs} ._isButton=${true}>${args.text}</${tag}>`;
};

const FormTemplate = (args) => staticHTML`<form>${StandardTemplate(args)}</form>`;
const WithinLinkTemplate = (args) => staticHTML`<a href="${args.link}">${StandardTemplate(args)}</a>`;
const WithinButtonTemplate = (args) => staticHTML`<button>${StandardTemplate(args)}</button>`;
const WithinDisabledButtonTemplate = (args) => staticHTML`<button disabled>${StandardTemplate(args)}</button>`;

export const Standard = StandardTemplate.bind({});
Standard.args = { text: 'Highpoint' };

export const Disabled = StandardTemplate.bind({});
Disabled.args = { text: 'Highpoint', disabled: true };

export const Hidden = StandardTemplate.bind({});
Hidden.args = { text: 'Highpoint', hidden: true };

export const Loading = StandardTemplate.bind({});
Loading.args = { text: 'Highpoint', loading: true };

export const StandardLink = StandardTemplate.bind({});
StandardLink.storyName = 'Standard [link]';
StandardLink.args = { text: 'Highpoint', href: '#!' };

export const DisabledLink = StandardTemplate.bind({});
DisabledLink.storyName = 'Disabled [link]';
DisabledLink.args = { text: 'Highpoint', disabled: true, href: '#!' };

export const LoadingLink = StandardTemplate.bind({});
LoadingLink.storyName = 'Loading [link]';
LoadingLink.args = { text: 'Highpoint', loading: true, href: '#!' };

export const StandardButton = ButtonTemplate.bind({});
StandardButton.storyName = 'Standard [button]';
StandardButton.args = { text: 'Highpoint' };

export const DisabledButton = ButtonTemplate.bind({});
DisabledButton.storyName = 'Disabled [button]';
DisabledButton.args = { text: 'Highpoint', disabled: true };

export const LoadingButton = ButtonTemplate.bind({});
LoadingButton.storyName = 'Loading [button]';
LoadingButton.args = { text: 'Highpoint', loading: true };

export const StandardForm = FormTemplate.bind({});
StandardForm.storyName = 'Standard [within form]';
StandardForm.args = { text: 'Highpoint' };

export const DisabledForm = FormTemplate.bind({});
DisabledForm.storyName = 'Disabled [within form]';
DisabledForm.args = { text: 'Highpoint', disabled: true };

export const LoadingForm = FormTemplate.bind({});
LoadingForm.storyName = 'Loading [within form]';
LoadingForm.args = { text: 'Highpoint', loading: true };

export const StandardWithinLink = WithinLinkTemplate.bind({});
StandardWithinLink.storyName = 'Standard [within link]';
StandardWithinLink.args = { text: 'Highpoint', link: '#!' };

export const DisabledWithinLink = WithinLinkTemplate.bind({});
DisabledWithinLink.storyName = 'Disabled [within link]';
DisabledWithinLink.args = { text: 'Highpoint', disabled: true, link: '#!' };

export const LoadingWithinLink = WithinLinkTemplate.bind({});
LoadingWithinLink.storyName = 'Loading [within link]';
LoadingWithinLink.args = { text: 'Highpoint', loading: true, link: '#!' };

export const StandardWithinButton = WithinButtonTemplate.bind({});
StandardWithinButton.storyName = 'Standard [within button]';
StandardWithinButton.args = { text: 'Highpoint', link: '#!' };

export const DisabledWithinButton = WithinDisabledButtonTemplate.bind({});
DisabledWithinButton.storyName = 'Disabled [within button]';
DisabledWithinButton.args = { text: 'Highpoint', disabled: true, link: '#!' };

export const LoadingWithinButton = WithinButtonTemplate.bind({});
LoadingWithinButton.storyName = 'Loading [within button]';
LoadingWithinButton.args = { text: 'Highpoint', loading: true, link: '#!' };
