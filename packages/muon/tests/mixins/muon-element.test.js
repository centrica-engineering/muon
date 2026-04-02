/* eslint-disable no-undef */
import { expect, fixture, html, defineCE, unsafeStatic } from '@open-wc/testing';
import { MuonElement, ScopedElementsMixin } from '@muonic/muon';

const MuonComponent = class extends MuonElement {
  get slottedStyles() {
    return 'light-dom{color:red}';
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

const EmptyMuonComponent = class extends MuonElement {
};

const MultipleScopedStyles = class extends MuonElement {
  get slottedStyles() {
    return [
      'light-dom{color:red}',
      'light-dom{background:blue}'
    ];
  }
};

const prefixScopedComponentStyles = class extends MuonElement {
  get styles() {
    return css([this.processPrefix(':host { prefix-test { margin-inline-end: 20px;}')]);
  }

  get slottedStyles() {
    return [
      'prefix-test-component { color: red; }',
      'prefixx-test-component { color: blue; }',
    ];
  }

  get standardTemplate() {
    return html`<slot></slot>`;
  }
};

const BrokenScopedStyles = class extends MuonElement {
  get slottedStyles() {
    return [true];
  }
};

const tagName = defineCE(MuonComponent);
const tag = unsafeStatic(tagName);

const parentTagName = defineCE(ParentMuonComponent);
const parentTag = unsafeStatic(parentTagName);

const emptyTagName = defineCE(EmptyMuonComponent);
const emptyTag = unsafeStatic(emptyTagName);

const multipleScopedStylesTagName = defineCE(MultipleScopedStyles);
const multipleScopedStylesTag = unsafeStatic(multipleScopedStylesTagName);

const prefixScopedComponentStylesTagName = defineCE(prefixScopedComponentStyles);
const prefixScopedComponentStylesTag = unsafeStatic(prefixScopedComponentStylesTagName);

const brokenScopedStylesTagName = defineCE(BrokenScopedStyles);
const brokenScopedStylesTag = unsafeStatic(brokenScopedStylesTagName);

describe('muon-component', () => {
  it('standard', async () => {
    const element = await fixture(html`<${tag}>foo</${tag}>`);

    expect(getComputedStyle(element).color).to.equal('rgb(255, 0, 0)', 'computed style value added for component');
  });

  it('scoped', async () => {
    const element = await fixture(html`<${parentTag}></${parentTag}>`);

    const shadowRoot = element.shadowRoot;
    console.log(element.shadowRoot.innerHTML);
    const childEl = shadowRoot.querySelector('child-el');

    expect(getComputedStyle(childEl).color).to.equal('rgb(255, 0, 0)', 'computed style value added for child shadow component');
  });

  it('empty', async () => {
    const element = await fixture(html`<${emptyTag}></${emptyTag}>`);

    expect(getComputedStyle(element).color).to.equal('rgb(0, 0, 0)', 'computed style value added for empty component');
    expect(element.shadowRoot.textContent).to.equal('');
  });

  it('multiple scoped styles', async () => {
    const element = await fixture(html`<${multipleScopedStylesTag}></${multipleScopedStylesTag}>`);

    expect(getComputedStyle(element).color).to.include('rgb(255, 0, 0)', 'computed style value added for component');
    expect(getComputedStyle(element).background).to.include('rgb(0, 0, 255)', 'computed style value added for component');
  });

  it('prefix is replaced for styles', async () => {
    const element = await fixture(html`
      <${prefixScopedComponentStylesTag}>
        <muon-test-component>test</muon-test-component>
        <muonx-test-component>test</muonx-test-component>
      </${prefixScopedComponentStylesTag}>
    `);
    const nsComponent = element.querySelector('muon-test-component');
    const nsxComponent = element.querySelector('muonx-test-component');

    expect(getComputedStyle(nsComponent).color).to.equal('rgb(255, 0, 0)', 'prefix was replaced with config prefix & styles successfully applied');
    expect(getComputedStyle(nsxComponent).color).to.equal('rgb(0, 0, 255)', 'prefixx was replaced with config prefixx & styles successfully applied');
  });

  it('broken scoped styles', async () => {
    const element = await fixture(html`<${brokenScopedStylesTag}></${brokenScopedStylesTag}>`);

    expect(getComputedStyle(element).color).to.equal('rgb(0, 0, 0)', 'computed style value added for component');
    expect(element.__addLightDOM()).to.equal(undefined, 'no styles added');
  });
});
