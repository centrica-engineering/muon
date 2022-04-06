/* eslint-disable no-undef */
import { expect, fixture, html, defineCE, unsafeStatic } from '@open-wc/testing';
import { MuonElement } from '@muons/library';
import { defaultChecks } from '../helpers';
import { CardMixin } from '@muons/library/mixins/card-mixin';
import { Cta } from '@muons/library/components/cta';

const CardMixinElement = class extends CardMixin(MuonElement) {

  get standardTemplate() {
    return html`
      ${this._addHeader}
      ${this._addContent}
      ${this._addFooter}
    `;
  }
};

const tagName = defineCE(CardMixinElement);
const tag = unsafeStatic(tagName);

const ctaTag = unsafeStatic(defineCE(Cta));

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
        <${ctaTag} slot="footer">Click Here</${ctaTag}>
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
    const cta = footerSelector.querySelector('slot[name="footer"]');
    expect(cta.assignedElements()[0].textContent).to.equal('Click Here', 'Action slot has Cta component');

  });
});
