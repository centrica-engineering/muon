/* eslint-disable no-undef */
import { expect, fixture, html, defineCE, unsafeStatic } from '@open-wc/testing';
import sinon from 'sinon';
import { Icon } from '@muonic/muon/components/icon';
import { defaultChecks } from '../../helpers';

const tagName = defineCE(Icon);
const tag = unsafeStatic(tagName);

const awaitLoading = () => {
  return new Promise((resolve) => {
    window.addEventListener('svg-loaded', resolve);
  });
};

describe('icon', () => {

  afterEach(() => {
    sinon.restore();
  });

  it('implements standard self', async () => {
    const el = await fixture(html`<${tag}></${tag}>`);

    await awaitLoading(el);
    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const icon = shadowRoot.querySelector('.icon');
    const elementSVG = icon.querySelector('svg');

    expect(elementSVG).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(el.name).to.equal('arrow-right', '`name` property has default value `arrow-right`');
    expect(Array.from(icon.classList)).to.deep.equal(['icon', 'arrow-right'], 'class list for parent div');
    expect(icon.getAttribute('aria-hidden')).to.equal('true', '`aria-hidden` attribute added to not be seen by screen readers');
    expect(icon.getAttribute('aria-label')).to.equal(null, '`aria-label` not added');
    expect(icon.getAttribute('role')).to.equal(null, 'no `role` attribute added');
    expect(getComputedStyle(elementSVG).fill).to.equal('rgb(0, 0, 0)', 'computed style value added for svg of fill'); // getComputedStyle will create the colour from currentColor
    expect(icon.style.getPropertyValue('--icon-size')).to.equal('100%', 'default value added for custom css variable');
    expect(el.sizes).to.equal('100%', 'getter `sizes` returns default value');
  });

  it('implements icon size 16', async () => {
    const size = 16;
    const el = await fixture(html`<${tag} size="1"></${tag}>`);

    await awaitLoading(el);

    const shadowRoot = el.shadowRoot;
    const icon = shadowRoot.querySelector('.icon');

    expect(getComputedStyle(icon).width).to.equal(`${size}px`, 'computed size equal related size for width');
    expect(getComputedStyle(icon).height).to.equal(`${size}px`, 'computed size equal related size for height');
    expect(icon.style.getPropertyValue('--icon-size')).to.equal(`${size}px`, 'size value added for custom css variable');
    expect(el.sizes).to.equal(size, 'getter `sizes` returns size value');
  });

  it('implements icon size 32', async () => {
    const size = 32;
    const el = await fixture(html`<${tag} size="2"></${tag}>`);

    await awaitLoading(el);

    const shadowRoot = el.shadowRoot;
    const icon = shadowRoot.querySelector('.icon');

    expect(getComputedStyle(icon).width).to.equal(`${size}px`, 'computed size equal related size for width');
    expect(getComputedStyle(icon).height).to.equal(`${size}px`, 'computed size equal related size for height');
    expect(icon.style.getPropertyValue('--icon-size')).to.equal(`${size}px`, 'size value added for custom css variable');
    expect(el.sizes).to.equal(size, 'getter `sizes` returns size value');
  });

  it('implements icon size 48', async () => {
    const size = 48;
    const el = await fixture(html`<${tag} size="3"></${tag}>`);

    await awaitLoading(el);

    const shadowRoot = el.shadowRoot;
    const icon = shadowRoot.querySelector('.icon');

    expect(getComputedStyle(icon).width).to.equal(`${size}px`, 'computed size equal related size for width');
    expect(getComputedStyle(icon).height).to.equal(`${size}px`, 'computed size equal related size for height');
    expect(icon.style.getPropertyValue('--icon-size')).to.equal(`${size}px`, 'size value added for custom css variable');
    expect(el.sizes).to.equal(size, 'getter `sizes` returns size value');
  });

  it('implements icon size 64', async () => {
    const size = 64;
    const el = await fixture(html`<${tag} size="4"></${tag}>`);

    await awaitLoading(el);

    const shadowRoot = el.shadowRoot;
    const icon = shadowRoot.querySelector('.icon');

    expect(getComputedStyle(icon).width).to.equal(`${size}px`, 'computed size equal related size for width');
    expect(getComputedStyle(icon).height).to.equal(`${size}px`, 'computed size equal related size for height');
    expect(icon.style.getPropertyValue('--icon-size')).to.equal(`${size}px`, 'size value added for custom css variable');
    expect(el.sizes).to.equal(size, 'getter `sizes` returns size value');
  });

  it('implements icon size 72', async () => {
    const size = 72;
    const el = await fixture(html`<${tag} size="5"></${tag}>`);

    await awaitLoading(el);

    const shadowRoot = el.shadowRoot;
    const icon = shadowRoot.querySelector('.icon');

    expect(getComputedStyle(icon).width).to.equal(`${size}px`, 'computed size equal related size for width');
    expect(getComputedStyle(icon).height).to.equal(`${size}px`, 'computed size equal related size for height');
    expect(icon.style.getPropertyValue('--icon-size')).to.equal(`${size}px`, 'size value added for custom css variable');
    expect(el.sizes).to.equal(size, 'getter `sizes` returns size value');
  });

  it('select icon name', async () => {
    const el = await fixture(html`<${tag} name="arrow-left"></${tag}>`);

    await awaitLoading(el);
    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const icon = shadowRoot.querySelector('.icon');
    const elementSVG = icon.querySelector('svg');

    expect(elementSVG).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(el.name).to.equal('arrow-left', '`name` property has default value `arrow-right`');
    expect(icon.getAttribute('aria-label')).to.equal(null, '`aria-label` not added');
    expect(icon.getAttribute('role')).to.equal(null, 'no `role` attribute added');
  });

  it('fails gracefully when using non existent name', async () => {
    const el = await fixture(html`<${tag} name="this-does-not-exist-as-an-icon-sad-face"></${tag}>`);

    await awaitLoading(el);
    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const icon = shadowRoot.querySelector('.icon');
    const elementSVG = icon.querySelector('svg');

    expect(elementSVG).to.be.null; // eslint-disable-line no-unused-expressions
    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(el.name).to.equal('this-does-not-exist-as-an-icon-sad-face', '`name` property has attribute value');
  });

  it('fails gracefully when using no name', async () => {
    const el = await fixture(html`<${tag} name=""></${tag}>`);

    await defaultChecks(el);

    expect(el.shadowRoot.querySelector('.icon')).to.equal(null); // eslint-disable-line no-unused-expressions

    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(el.name).to.equal('', '`name` property has no value');
  });

  it('adds attributes for when describe used', async () => {
    const el = await fixture(html`<${tag} describe="foobar"></${tag}>`);

    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const icon = shadowRoot.querySelector('.icon');

    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(icon.getAttribute('aria-hidden')).to.equal(null, 'element is not hidden');
    expect(icon.getAttribute('aria-label')).to.equal('foobar', 'element has an aria label');
    expect(icon.getAttribute('role')).to.equal('img', 'element is given a role of img');
  });

  it('no anonymous slot', async () => {
    const el = await fixture(html`<${tag}>some additional content that will not be rendered</${tag}>`);

    await awaitLoading(el);
    await defaultChecks(el);

    expect(el.innerText.trim()).to.equal('', 'has no light dom');
  });

  it('caches not available', async () => {
    delete self.caches; // replicate caches API not being available

    const consoleWarn = sinon.stub(console, 'info');
    const el = await fixture(html`<${tag}></${tag}>`);

    await awaitLoading(el);
    await defaultChecks(el);

    expect(consoleWarn.args[0]).to.deep.equal(['cache not available'], 'console info shows that cache is not available');
    expect(consoleWarn.args.length).to.equal(2, 'info shows 2 messages');
  });
});
