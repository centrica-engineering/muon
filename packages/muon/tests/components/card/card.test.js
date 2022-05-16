/* eslint-disable no-undef */
import { expect, fixture, html, defineCE, unsafeStatic } from '@open-wc/testing';
import { defaultChecks } from '../../helpers';
import { Card } from '@muonic/muon/components/card';

const tag = unsafeStatic(defineCE(Card));

describe('card', async () => {
  it('default', async () => {
    const cardElement = await fixture(html`<${tag}></${tag}>`);
    await defaultChecks(cardElement);

    const shadowRoot = cardElement.shadowRoot;

    expect(shadowRoot.querySelector('.header')).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(shadowRoot.querySelector('.content')).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(shadowRoot.querySelector('.footer')).to.not.be.null; // eslint-disable-line no-unused-expressions
  });

  it('standard', async () => {
    const cardElement = await fixture(html`
      <${tag}>
        <h2 slot="header">Heating services</h2>
        <p>Product and services we offer for energy in your home</p>
        <div slot="footer">Footnote</div>
      </${tag}>`);
    await defaultChecks(cardElement);

    const shadowRoot = cardElement.shadowRoot;

    const headerSelector = shadowRoot.querySelector('.header');
    expect(headerSelector).to.not.be.null; // eslint-disable-line no-unused-expressions
    const header = headerSelector.querySelector('slot[name="header"]');
    expect(header.assignedElements()[0].textContent).to.equal('Heating services', 'Heading slot value matches');

    const content = shadowRoot.querySelector('.content');
    expect(shadowRoot.querySelector('.content')).to.not.be.null; // eslint-disable-line no-unused-expressions
    const paragraph = content.querySelector('slot');
    expect(paragraph.assignedElements()[0].textContent).to.equal('Product and services we offer for energy in your home', 'Content slot value matches');

    const footerSelector = shadowRoot.querySelector('.footer');
    expect(footerSelector).to.not.be.null; // eslint-disable-line no-unused-expressions
    const footer = footerSelector.querySelector('slot[name="footer"]');
    expect(footer.assignedElements()[0].textContent).to.equal('Footnote', 'Footer slot value matches');

    expect(shadowRoot.querySelector('.media')).to.be.null; // eslint-disable-line no-unused-expressions
  });

  it('standard with image', async () => {
    const cardElement = await fixture(html`
      <${tag} image="https://www.britishgas.co.uk/aem6/content/dam/britishgas/images/smart-meters/Technology/Lockup%202.png" alt="image alt"> 
        <h2 slot="header">Heating services</h2>
        <p>Product and services we offer for energy in your home</p>
        <div slot="footer">Footnote</div>
      </${tag}>`);
    await defaultChecks(cardElement);

    const shadowRoot = cardElement.shadowRoot;

    const headerSelector = shadowRoot.querySelector('.header');
    expect(headerSelector).to.not.be.null; // eslint-disable-line no-unused-expressions
    const header = headerSelector.querySelector('slot[name="header"]');
    expect(header.assignedElements()[0].textContent).to.equal('Heating services', 'Heading slot value matches');

    const content = shadowRoot.querySelector('.content');
    expect(shadowRoot.querySelector('.content')).to.not.be.null; // eslint-disable-line no-unused-expressions
    const paragraph = content.querySelector('slot');
    expect(paragraph.assignedElements()[0].textContent).to.equal('Product and services we offer for energy in your home', 'Content slot value matches');

    const footerSelector = shadowRoot.querySelector('.footer');
    expect(footerSelector).to.not.be.null; // eslint-disable-line no-unused-expressions
    const footer = footerSelector.querySelector('slot[name="footer"]');
    expect(footer.assignedElements()[0].textContent).to.equal('Footnote', 'Footer slot value matches');

    const media = shadowRoot.querySelector('.media');
    expect(media).to.not.be.null; // eslint-disable-line no-unused-expressions
    const image = media.querySelector('card-image');
    expect(image.src).to.equal('https://www.britishgas.co.uk/aem6/content/dam/britishgas/images/smart-meters/Technology/Lockup%202.png', 'card image has correct value');
    expect(image.alt).to.equal('image alt', 'card image alt has correct value');
  });
});
