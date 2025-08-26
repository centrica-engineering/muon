/* eslint-disable no-undef */
import { expect, fixture, html, defineCE, unsafeStatic } from '@open-wc/testing';
import { Cta } from '@muonic/muon/components/cta';
import { defaultChecks } from '../../helpers';

const tagName = defineCE(Cta);
const tag = unsafeStatic(tagName);

describe('cta', () => {
  it('default', async () => {
    const el = await fixture(html`<${tag}></${tag}>`);

    await defaultChecks(el, { skipAccessibility: true });

    const shadowRoot = el.shadowRoot;
    const cta = shadowRoot.querySelector('.cta');
    const icon = cta.querySelector('.icon');
    const label = cta.querySelector('.label-holder');

    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(el.icon).to.equal('arrow-right', '`icon` property has default value `arrow-right`');
    expect(el.loading).to.equal(false, '`loading` property has default value `false`');
    expect(el.loadingMessage).to.equal('Loading...', '`loadingMessage` property has default value `Loading...`');
    expect(el.href).to.equal(undefined, '`href` attribute has no default value');
    expect(el._iconPosition).to.equal('end', '`_iconPosition` attribute has default value `end`');
    expect(el._isButton).to.equal(undefined, '`_isButton` attribute has no default value');
    expect(el.getAttribute('role')).to.equal('button', 'has the role of button');
    expect(el.getAttribute('tabindex')).to.equal('0', 'has a tab index');
    expect(el.getAttribute('aria-disabled')).to.equal(null, '`disabled aria` has not been set');
    expect(cta.nodeName).to.equal('DIV', 'parent element inside shadow should be `div`');
    // eslint-disable-next-line no-unused-expressions
    expect(cta.getAttribute('aria-label')).to.empty;
    expect(cta.getAttribute('tabindex')).to.equal(null, 'has no tab index');
    expect(cta.getAttribute('disabled')).to.equal(null, 'cta is not disabled');
    expect(cta.children[0].nodeName).to.equal('SPAN', 'first element within cta is span');
    expect(cta.children[1].nodeName).to.equal('CTA-ICON', 'second element within cta is icon');
    expect(icon.nodeName).to.equal('CTA-ICON', 'Scoped CTA component');
    expect(icon.name).to.equal('arrow-right', 'Scoped icon has name value `arrow-right`');
    expect(label.nodeName).to.equal('SPAN', 'span label holder exists');
  });
  it('implements standard self', async () => {
    const el = await fixture(html`<${tag}>Buy a doughnut</${tag}>`);

    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const cta = shadowRoot.querySelector('.cta');
    const icon = cta.querySelector('.icon');
    const label = cta.querySelector('.label-holder');

    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(el.icon).to.equal('arrow-right', '`icon` property has default value `arrow-right`');
    expect(el.loading).to.equal(false, '`loading` property has default value `false`');
    expect(el.loadingMessage).to.equal('Loading...', '`loadingMessage` property has default value `Loading...`');
    expect(el.href).to.equal(undefined, '`href` attribute has no default value');
    expect(el._iconPosition).to.equal('end', '`_iconPosition` attribute has default value `end`');
    expect(el._isButton).to.equal(undefined, '`_isButton` attribute has no default value');
    expect(el.getAttribute('role')).to.equal('button', 'has the role of button');
    expect(el.getAttribute('tabindex')).to.equal('0', 'has a tab index');
    expect(el.getAttribute('aria-disabled')).to.equal(null, '`disabled aria` has not been set');
    expect(cta.nodeName).to.equal('DIV', 'parent element inside shadow should be `div`');
    expect(cta.getAttribute('aria-label')).to.equal('Buy a doughnut', '`aria-label` has same value as anonymous slot');
    expect(cta.getAttribute('tabindex')).to.equal(null, 'has no tab index');
    expect(cta.getAttribute('disabled')).to.equal(null, 'cta is not disabled');
    expect(cta.children[0].nodeName).to.equal('SPAN', 'first element within cta is span');
    expect(cta.children[1].nodeName).to.equal('CTA-ICON', 'second element within cta is icon');
    expect(icon.nodeName).to.equal('CTA-ICON', 'Scoped CTA component');
    expect(icon.name).to.equal('arrow-right', 'Scoped icon has name value `arrow-right`');
    expect(label.nodeName).to.equal('SPAN', 'span label holder exists');
  });

  it('implements with no icon', async () => {
    const el = await fixture(html`<${tag} icon="">Click me please</${tag}>`);

    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const cta = shadowRoot.querySelector('.cta');
    const icon = cta.querySelector('.icon');

    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(el.icon).to.equal('', '`icon` property has no value');
    expect(icon).to.equal(null, 'no icon added');
  });

  it('implements with loading', async () => {
    const el = await fixture(html`<${tag} loading>This is a button</${tag}>`);

    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const cta = shadowRoot.querySelector('.cta');
    const icon = cta.querySelector('.icon');
    const srLoading = shadowRoot.querySelector('[role="alert"]');

    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(el.icon).to.equal('arrow-right', '`icon` has default property value');
    expect(icon.name).to.equal('spinner', 'icon has loading icon of `spinner`');
    expect(srLoading.innerText).to.equal('Loading...', 'Screen reader only message for loading');
    expect(cta.getAttribute('disabled')).to.equal(null, 'cta is not disabled');
  });

  it('implements with disabled', async () => {
    const el = await fixture(html`<${tag} disabled>This is a button</${tag}>`);

    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const cta = shadowRoot.querySelector('.cta');

    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(el.icon).to.equal('arrow-right', '`icon` has default property value');
    expect(el.disabled).to.equal(true, '`disabled` has been set to true');
    expect(el.getAttribute('aria-disabled')).to.equal('true', '`disabled aria` has been set to true');
    expect(cta.getAttribute('disabled')).to.equal(null, 'cta is not disabled');
  });

  it('implements with icon at start', async () => {
    const el = await fixture(html`<${tag}>Something something...danger zone</${tag}>`);

    el._iconPosition = 'start';

    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const cta = shadowRoot.querySelector('.cta');

    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(cta.children[0].nodeName).to.equal('CTA-ICON', 'first element within cta is icon');
    expect(cta.children[1].nodeName).to.equal('SPAN', 'second element within cta is span');
  });

  it('implements with a href', async () => {
    const el = await fixture(html`<${tag} href="https://example.com">This is a button</${tag}>`);

    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const cta = shadowRoot.querySelector('.cta');

    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(cta.nodeName).to.equal('A', 'cta is an anchor element');
    expect(cta.href).to.equal('https://example.com/', 'cta has the href');
    expect(cta.getAttribute('disabled')).to.equal(null, 'cta is not disabled');
  });

  it('implements cta within an anchor element', async () => {
    const parentTemplate = await fixture(html`<a href="https://example.com"><${tag}>This is a button</${tag}></a>`);
    const el = parentTemplate.querySelector('test-0'); // @TODO: Find a way to get this from the tag

    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const cta = shadowRoot.querySelector('.cta');

    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(cta.nodeName).to.equal('DIV', 'cta is a `div` element');
    expect(cta.href).to.equal(false, 'cta has NO href');
    expect(cta.getAttribute('disabled')).to.equal(null, 'cta is not disabled');
  });

  it('implements within a form', async () => {
    const parentTemplate = await fixture(html`<form><${tag}>This is a button</${tag}></form>`);
    const el = parentTemplate.querySelector('test-0'); // @TODO: Find a way to get this from the tag

    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const cta = shadowRoot.querySelector('.cta');

    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(el.getAttribute('role')).to.not.exist; // eslint-disable-line no-unused-expressions
    expect(el.getAttribute('tabindex')).to.not.exist; // eslint-disable-line no-unused-expressions
    expect(cta.nodeName).to.equal('BUTTON', 'cta is a `div` element');
    expect(cta.href).to.equal(false, 'cta has NO href');
    expect(cta.getAttribute('disabled')).to.equal(null, 'cta is not disabled');
  });

  it('implements with triggering button', async () => {
    // this is to force it to act like it is in a form (aka you need a native button element)
    const el = await fixture(html`<${tag}>This is a button</${tag}>`);
    el._isButton = true;
    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const cta = shadowRoot.querySelector('.cta');

    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(el.getAttribute('role')).to.not.exist; // eslint-disable-line no-unused-expressions
    expect(el.getAttribute('tabindex')).to.not.exist; // eslint-disable-line no-unused-expressions
    expect(cta.nodeName).to.equal('BUTTON', 'cta is a `div` element');
    expect(cta.href).to.equal(false, 'cta has NO href');
    expect(cta.getAttribute('disabled')).to.equal(null, 'cta is not disabled');
  });

  it('implements loading as a button', async () => {
    // this is to force it to act like it is in a form (aka you need a native button element)
    const el = await fixture(html`<${tag} loading>This is a button</${tag}>`);
    el._isButton = true;
    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const cta = shadowRoot.querySelector('.cta');

    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(el.getAttribute('role')).to.not.exist; // eslint-disable-line no-unused-expressions
    expect(el.getAttribute('tabindex')).to.not.exist; // eslint-disable-line no-unused-expressions
    expect(cta.nodeName).to.equal('BUTTON', 'cta is a `button` element');
    expect(cta.href).to.equal(false, 'cta has NO href');
    expect(cta.getAttribute('disabled')).to.equal('', 'cta is disabled');
  });

  it('implements template `submit`', async () => {
    // this is to force it to act like it is in a form (aka you need a native button element)
    const el = await fixture(html`<${tag} type="submit">This is a button</${tag}>`);
    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const cta = shadowRoot.querySelector('.cta');

    expect(el.type).to.equal('submit', '`type` property has default value `submit`');
    expect(cta.href).to.equal(false, 'cta has NO href');
    expect(cta.getAttribute('disabled')).to.equal(null, 'cta is disabled');
  });

  it('implements template `reset`', async () => {
    // this is to force it to act like it is in a form (aka you need a native button element)
    const el = await fixture(html`<${tag} type="reset">This is a button</${tag}>`);
    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const cta = shadowRoot.querySelector('.cta');

    expect(el.type).to.equal('reset', '`type` property has default value `reset`');
    expect(cta.href).to.equal(false, 'cta has NO href');
    expect(cta.getAttribute('disabled')).to.equal(null, 'cta is disabled');
  });
});
