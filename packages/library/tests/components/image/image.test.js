/* eslint-disable no-undef */
import { expect, fixture, html, defineCE, unsafeStatic, nextFrame } from '@open-wc/testing';
import sinon from 'sinon';
import { defaultChecks } from '../../helpers';
import { Image } from '@muons/library/components/image';

const tagName = defineCE(Image);
const tag = unsafeStatic(tagName);

const awaitLoading = () => {
  return new Promise((resolve) => {
    window.addEventListener('image-loaded', resolve);
  });
};

describe('image', () => {

  afterEach(() => {
    sinon.restore();
  });

  it('implements standard self', async () => {
    const el = await fixture(html`<${tag}></${tag}>`);

    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const elementImage = shadowRoot.querySelector('.image');

    expect(elementImage.innerHTML).to.equal('', 'has empty image div');
    expect(el.src).to.equal(undefined, '`src` has no default property');
    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(el._ratios).to.deep.equal(['1 / 1', '4 / 3', '16 / 9'], '`ratios` property has default token value');
    expect(el.placeholder).to.equal('', '`placeholder` has default token value');
    expect(el.ratio).to.equal('16 / 9', '`ratio` has default token value');
    expect(el.loading).to.equal('lazy', '`loading` has default value');
    expect(el.alt).to.equal('', 'alt has no value');

  });

  it('implements src image', async () => {
    const el = await fixture(html`<${tag} src="https://via.placeholder.com/150"></${tag}>`);

    await awaitLoading(el);
    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const elementImage = shadowRoot.querySelector('.image');
    const img = elementImage.querySelector('img');

    expect(elementImage).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(el.ratio).to.equal('16 / 9', '`ratio` has default token value');
    expect(img.src).to.equal('https://via.placeholder.com/150', 'has `src` value from el');
    expect(img.alt).to.equal('', 'alt has not value');
    expect(Array.from(img.classList)).to.deep.equal(['blur-out', 'image-lazy']);
    expect(elementImage.style.getPropertyValue('--image-ratio')).to.equal('16 / 9', 'ratio passed as custom css variable');
    expect(getComputedStyle(elementImage).aspectRatio).to.equal('16 / 9', 'computed style value added for aspect-ratio');

  });

  it('implements ratio', async () => {
    const el = await fixture(html`<${tag} src="https://via.placeholder.com/150" ratio="1 / 1"></${tag}>`);

    await awaitLoading(el);
    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const elementImage = shadowRoot.querySelector('.image');
    const img = elementImage.querySelector('img');

    expect(elementImage).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(el.ratio).to.equal('1 / 1', '`ratio` has default token value');
    expect(img.src).to.equal('https://via.placeholder.com/150', 'has `src` value from el');
    expect(img.alt).to.equal('', 'alt has not value');
    expect(elementImage.style.getPropertyValue('--image-ratio')).to.equal('1 / 1', 'ratio passed as custom css variable');
    expect(getComputedStyle(elementImage).aspectRatio).to.equal('1 / 1', 'computed style value added for aspect-ratio');
    expect(Array.from(img.classList)).to.deep.equal(['blur-out', 'image-lazy']);
  });

  it('implements background', async () => {
    const el = await fixture(html`<${tag} src="https://via.placeholder.com/150" background></${tag}>`);

    await awaitLoading(el);
    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const elementImage = shadowRoot.querySelector('.image');
    const img = elementImage.querySelector('img');
    const holder = elementImage.querySelector('.image-holder');

    expect(elementImage).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(img).to.be.null; // eslint-disable-line no-unused-expressions
    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(Array.from(holder.classList)).to.deep.equal(['image-holder', 'blur-out']);
    expect(getComputedStyle(holder).backgroundImage).to.equal('url("https://via.placeholder.com/150")', 'computed style value added for background image');
    expect(holder.style.getPropertyValue('--background-image')).to.equal('url("https://via.placeholder.com/150")', 'image passed as custom css variable');
  });

  it('implements placeholder image', async () => {
    const el = await fixture(html`<${tag} src="https://via.placeholder.com/35000" placeholder="https://via.placeholder.com/15"></${tag}>`);

    await nextFrame();
    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const elementImage = shadowRoot.querySelector('.image');
    const img = elementImage.querySelector('img');

    expect(elementImage).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(el.ratio).to.equal('16 / 9', '`ratio` has default token value');
    expect(img.src).to.equal('https://via.placeholder.com/15', 'has `src` value from el');
    expect(img.alt).to.equal('', 'alt has not value');
    expect(Array.from(img.classList)).to.deep.equal(['image-lazy', 'blur']);
    expect(elementImage.style.getPropertyValue('--image-ratio')).to.equal('16 / 9', 'ratio passed as custom css variable');
    expect(getComputedStyle(elementImage).aspectRatio).to.equal('16 / 9', 'computed style value added for aspect-ratio');
  });

  it('implements placeholder image for background', async () => {
    const el = await fixture(html`<${tag} src="https://via.placeholder.com/35000" placeholder="https://via.placeholder.com/15" background></${tag}>`);

    await nextFrame();
    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const elementImage = shadowRoot.querySelector('.image');
    const holder = elementImage.querySelector('.image-holder');

    expect(elementImage).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(getComputedStyle(holder).backgroundImage).to.equal('url("https://via.placeholder.com/15")', 'computed style value added for background image');
    expect(holder.style.getPropertyValue('--background-image')).to.equal('url("https://via.placeholder.com/15")', 'image passed as custom css variable');
    expect(el.ratio).to.equal('16 / 9', '`ratio` has default token value');
    expect(elementImage.style.getPropertyValue('--image-ratio')).to.equal('16 / 9', 'ratio passed as custom css variable');
    expect(getComputedStyle(elementImage).aspectRatio).to.equal('16 / 9', 'computed style value added for aspect-ratio');
  });

  it('implements alt', async () => {
    const el = await fixture(html`<${tag} src="https://via.placeholder.com/150" alt="alternative text for the image"></${tag}>`);

    await awaitLoading(el);
    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const elementImage = shadowRoot.querySelector('.image');
    const img = elementImage.querySelector('img');

    expect(elementImage).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(el.ratio).to.equal('16 / 9', '`ratio` has default token value');
    expect(img.src).to.equal('https://via.placeholder.com/150', 'has `src` value from el');
    expect(img.alt).to.equal('alternative text for the image', 'alt has a value');
    expect(Array.from(img.classList)).to.deep.equal(['blur-out', 'image-lazy']);
    expect(elementImage.style.getPropertyValue('--image-ratio')).to.equal('16 / 9', 'ratio passed as custom css variable');
    expect(getComputedStyle(elementImage).aspectRatio).to.equal('16 / 9', 'computed style value added for aspect-ratio');
  });

  it('fallsback on ratio if not correct', async () => {
    const el = await fixture(html`<${tag} src="https://via.placeholder.com/150" ratio="not-a-ratio"></${tag}>`);

    await awaitLoading(el);
    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const elementImage = shadowRoot.querySelector('.image');
    const img = elementImage.querySelector('img');

    expect(elementImage).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(el.ratio).to.equal('16 / 9', '`ratio` has default token value');
    expect(img.src).to.equal('https://via.placeholder.com/150', 'has `src` value from el');
    expect(img.alt).to.equal('', 'alt has not value');
    expect(elementImage.style.getPropertyValue('--image-ratio')).to.equal('16 / 9', 'ratio passed as custom css variable');
    expect(getComputedStyle(elementImage).aspectRatio).to.equal('16 / 9', 'computed style value added for aspect-ratio');
    expect(Array.from(img.classList)).to.deep.equal(['blur-out', 'image-lazy']);
  });

  it('image is eager', async () => {
    const el = await fixture(html`<${tag} src="https://via.placeholder.com/150" loading="eager"></${tag}>`);

    await awaitLoading(el);
    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const elementImage = shadowRoot.querySelector('.image');
    const img = elementImage.querySelector('img');

    expect(elementImage).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(el.ratio).to.equal('16 / 9', '`ratio` has default token value');
    expect(img.src).to.equal('https://via.placeholder.com/150', 'has `src` value from el');
    expect(img.alt).to.equal('', 'alt has not value');
    expect(elementImage.style.getPropertyValue('--image-ratio')).to.equal('16 / 9', 'ratio passed as custom css variable');
    expect(getComputedStyle(elementImage).aspectRatio).to.equal('16 / 9', 'computed style value added for aspect-ratio');
    expect(Array.from(img.classList)).to.deep.equal(['blur-out', 'image-lazy']);
  });

  it('fallsback on image padding if aspect-ratio not available', async () => {
    sinon.replace(
      CSS,
      'supports',
      sinon.fake.returns(false)
    );

    const el = await fixture(html`<${tag} src="https://via.placeholder.com/150"></${tag}>`);

    await awaitLoading(el);
    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const elementImage = shadowRoot.querySelector('.image');
    const img = elementImage.querySelector('img');

    expect(elementImage).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(el.ratio).to.equal('16 / 9', '`ratio` has default token value');
    expect(img.src).to.equal('https://via.placeholder.com/150', 'has `src` value from el');
    expect(img.alt).to.equal('', 'alt has not value');
    expect(elementImage.style.getPropertyValue('--image-padding')).to.equal('56.25%', 'ratio percentage passed as custom css variable');
    // expect(getComputedStyle(elementImage).paddingTop).to.equal('56.25%', 'computed style value added padding top');
    // @TODO: work out how to fake @supports in CSS
    expect(Array.from(img.classList)).to.deep.equal(['blur-out', 'image-lazy']);
  });

  it('image fails to load', async () => {
    const consoleError = sinon.stub(console, 'error');
    const el = await fixture(html`<${tag} src="this-is-not-an-image"></${tag}>`);

    await nextFrame();
    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const elementImage = shadowRoot.querySelector('.image');
    const img = elementImage.querySelector('img');

    expect(elementImage).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(img).to.be.null; // eslint-disable-line no-unused-expressions
    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(el.ratio).to.equal('16 / 9', '`ratio` has default token value');
    expect(elementImage.style.getPropertyValue('--image-ratio')).to.equal('16 / 9', 'ratio passed as custom css variable');
    expect(getComputedStyle(elementImage).aspectRatio).to.equal('16 / 9', 'computed style value added for aspect-ratio');
    expect(consoleError.args[0]).to.deep.equal(['Image (this-is-not-an-image) failed to load']);
  });

  it('image fails to load for background', async () => {
    const consoleError = sinon.stub(console, 'error');
    const el = await fixture(html`<${tag} src="this-is-not-an-image"></${tag}>`);

    await nextFrame();
    await defaultChecks(el);

    expect(consoleError.args[0]).to.deep.equal(['Image (this-is-not-an-image) failed to load']);
  });

  it('implements placeholder image for chrome', async () => {
    window.chrome = true;
    const el = await fixture(html`<${tag} src="https://via.placeholder.com/35000" placeholder="https://via.placeholder.com/15"></${tag}>`);

    await nextFrame();
    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const elementImage = shadowRoot.querySelector('.image');
    const img = elementImage.querySelector('img');

    expect(elementImage).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(el.ratio).to.equal('16 / 9', '`ratio` has default token value');
    expect(img.src).to.equal('https://via.placeholder.com/15', 'has `src` value from el');
    expect(img.alt).to.equal('', 'alt has not value');
    expect(img.loading).to.equal('lazy', 'loading has a value');
    expect(Array.from(img.classList)).to.deep.equal(['image-lazy', 'blur']);
    expect(elementImage.style.getPropertyValue('--image-ratio')).to.equal('16 / 9', 'ratio passed as custom css variable');
    expect(getComputedStyle(elementImage).aspectRatio).to.equal('16 / 9', 'computed style value added for aspect-ratio');
  });

});
