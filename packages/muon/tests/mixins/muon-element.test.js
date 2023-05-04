/* eslint-disable no-undef */
import { expect, fixture, html, defineCE, unsafeStatic } from '@open-wc/testing';
import { MuonElement, ScopedElementsMixin } from '@muonic/muon';

const MuonComponent = class extends MuonElement {
  get slottedStyles() {
    return {
      _$cssResult$: true,
      cssText: 'light-dom{color:red}'
    };
  }

  get standardTemplate() {
    return html`<slot></slot>`;
  }
};

const ParentMuonComponent = class extends ScopedElementsMixin(MuonElement) {

  static get scopedElements() {
    return {
      'child-el': MuonComponent
    };
  }

  get standardTemplate() {
    return html`<child-el>test</child-el>`;
  }
};

const tagName = defineCE(MuonComponent);
const tag = unsafeStatic(tagName);

const parentTagName = defineCE(ParentMuonComponent);
const parentTag = unsafeStatic(parentTagName);

describe('muon-component', () => {
  it('standard', async () => {
    const element = await fixture(html`<${tag}>foo</${tag}>`);

    expect(getComputedStyle(element).color).to.equal('rgb(255, 0, 0)', 'computed style value added for component');
  });

  it('scoped', async () => {
    const element = await fixture(html`<${parentTag}></${parentTag}>`);

    const shadowRoot = element.shadowRoot;
    const childEl = shadowRoot.querySelector('child-el');

    expect(getComputedStyle(childEl).color).to.equal('rgb(255, 0, 0)', 'computed style value added for child shadow component');
  });
});
