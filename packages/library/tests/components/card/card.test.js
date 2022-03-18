/* eslint-disable no-undef */
import { expect, fixture, html, defineCE, unsafeStatic } from '@open-wc/testing';
import { defaultChecks } from '../../helpers';
import { Card } from '@muons/library/components/card';
import { Cta } from '@muons/library/components/cta';

const tag = unsafeStatic(defineCE(Card));
const ctaTag = unsafeStatic(defineCE(Cta));

describe('card', async () => {
  it('default', async () => {
    const cardElement = await fixture(html`<${tag}></${tag}>`);
    await defaultChecks(cardElement);

    const shadowRoot = cardElement.shadowRoot;

    expect(shadowRoot.querySelector('.heading')).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(shadowRoot.querySelector('.content')).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(shadowRoot.querySelector('.action')).to.not.be.null; // eslint-disable-line no-unused-expressions
  });

  it('standard', async () => {
    const cardElement = await fixture(html`
      <${tag}>
        <h2 slot="header">Heating services</h2>
        <p>Product and services we offer for energy in your home</p>
        <${ctaTag} slot="action">Click Here</${ctaTag}>
      </${tag}>`);
    await defaultChecks(cardElement);

    const shadowRoot = cardElement.shadowRoot;

    const heading = shadowRoot.querySelector('.heading');
    expect(heading).to.not.be.null; // eslint-disable-line no-unused-expressions
    const header = heading.querySelector('slot[name="header"]');
    expect(header.assignedElements()[0].textContent).to.equal('Heating services', 'Heading slot value matches');

    const content = shadowRoot.querySelector('.content');
    expect(shadowRoot.querySelector('.content')).to.not.be.null; // eslint-disable-line no-unused-expressions
    const paragraph = content.querySelector('slot');
    expect(paragraph.assignedElements()[0].textContent).to.equal('Product and services we offer for energy in your home', 'Content slot value matches');

    const action = shadowRoot.querySelector('.action');
    expect(action).to.not.be.null; // eslint-disable-line no-unused-expressions
    const cta = action.querySelector('slot[name="action"]');
    expect(cta.assignedElements()[0].textContent).to.equal('Click Here', 'Action slot has Cta component');

    expect(shadowRoot.querySelector('.media')).to.be.null; // eslint-disable-line no-unused-expressions
  });

  it('flat', async () => {
    const cardElement = await fixture(html`
      <${tag} type="flat">
        <h2 slot="header">Heating services</h2>
        <p>Product and services we offer for energy in your home</p>
        <${ctaTag} slot="action">Click Here</${ctaTag}>
      </${tag}>`);
    await defaultChecks(cardElement);

    const shadowRoot = cardElement.shadowRoot;

    const heading = shadowRoot.querySelector('.heading');
    expect(heading).to.not.be.null; // eslint-disable-line no-unused-expressions
    const header = heading.querySelector('slot[name="header"]');
    expect(header.assignedElements()[0].textContent).to.equal('Heating services', 'Heading slot value matches');

    const content = shadowRoot.querySelector('.content');
    expect(shadowRoot.querySelector('.content')).to.not.be.null; // eslint-disable-line no-unused-expressions
    const paragraph = content.querySelector('slot');
    expect(paragraph.assignedElements()[0].textContent).to.equal('Product and services we offer for energy in your home', 'Content slot value matches');

    const action = shadowRoot.querySelector('.action');
    expect(action).to.not.be.null; // eslint-disable-line no-unused-expressions
    const cta = action.querySelector('slot[name="action"]');
    expect(cta.assignedElements()[0].textContent).to.equal('Click Here', 'Action slot has Cta component');

    expect(shadowRoot.querySelector('.media')).to.be.null; // eslint-disable-line no-unused-expressions
  });

  it('support without image', async () => {
    const cardElement = await fixture(html`
      <${tag} type="support">
        <h2 slot="header">Heating services</h2>
        <p>Product and services we offer for energy in your home</p>
        <${ctaTag} slot="action">Click Here</${ctaTag}>
      </${tag}>`);
    await defaultChecks(cardElement);

    const shadowRoot = cardElement.shadowRoot;

    const heading = shadowRoot.querySelector('.heading');
    expect(heading).to.not.be.null; // eslint-disable-line no-unused-expressions
    const header = heading.querySelector('slot[name="header"]');
    expect(header.assignedElements()[0].textContent).to.equal('Heating services', 'Heading slot value matches');

    const content = shadowRoot.querySelector('.content');
    expect(shadowRoot.querySelector('.content')).to.not.be.null; // eslint-disable-line no-unused-expressions
    const paragraph = content.querySelector('slot');
    expect(paragraph.assignedElements()[0].textContent).to.equal('Product and services we offer for energy in your home', 'Content slot value matches');

    const action = shadowRoot.querySelector('.action');
    expect(action).to.not.be.null; // eslint-disable-line no-unused-expressions
    const cta = action.querySelector('slot[name="action"]');
    expect(cta.assignedElements()[0].textContent).to.equal('Click Here', 'Action slot has Cta component');

    expect(shadowRoot.querySelector('.media')).to.be.null; // eslint-disable-line no-unused-expressions
  });

  it('support with image', async () => {
    const cardElement = await fixture(html`
      <${tag} type="support" image="https://www.britishgas.co.uk/aem6/content/dam/britishgas/images/smart-meters/Technology/Lockup%202.png" alt="image alt"> 
        <h2 slot="header">Heating services</h2>
        <p>Product and services we offer for energy in your home</p>
        <${ctaTag} slot="action">Click Here</${ctaTag}>
      </${tag}>`);
    await defaultChecks(cardElement);

    const shadowRoot = cardElement.shadowRoot;

    const heading = shadowRoot.querySelector('.heading');
    expect(heading).to.not.be.null; // eslint-disable-line no-unused-expressions
    const header = heading.querySelector('slot[name="header"]');
    expect(header.assignedElements()[0].textContent).to.equal('Heating services', 'Heading slot value matches');

    const content = shadowRoot.querySelector('.content');
    expect(shadowRoot.querySelector('.content')).to.not.be.null; // eslint-disable-line no-unused-expressions
    const paragraph = content.querySelector('slot');
    expect(paragraph.assignedElements()[0].textContent).to.equal('Product and services we offer for energy in your home', 'Content slot value matches');

    const action = shadowRoot.querySelector('.action');
    expect(action).to.not.be.null; // eslint-disable-line no-unused-expressions
    const cta = action.querySelector('slot[name="action"]');
    expect(cta.assignedElements()[0].textContent).to.equal('Click Here', 'Action slot has Cta component');

    const media = shadowRoot.querySelector('.media');
    expect(media).to.not.be.null; // eslint-disable-line no-unused-expressions
    const image = media.querySelector('card-image');
    expect(image.src).to.equal('https://www.britishgas.co.uk/aem6/content/dam/britishgas/images/smart-meters/Technology/Lockup%202.png', 'card image has correct value');
    expect(image.alt).to.equal('image alt', 'card image alt has correct value');
  });
});
