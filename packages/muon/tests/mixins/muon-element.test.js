/* eslint-disable no-undef */
import { expect, fixture, html, defineCE, unsafeStatic } from '@open-wc/testing';
import { MuonElement, ScopedElementsMixin } from '@muonic/muon';
import testStyles from '../scripts/utils/test-styles.css';

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

const BrokenScopedStyles = class extends MuonElement {
  get slottedStyles() {
    return [true];
  }
};

const PrefixedStyledComponent = class extends MuonElement {
  get slottedStyles() {
    return testStyles;
  }

  get standardTemplate() {
    return html`<slot></slot>`;
  }
};

const prefixedStyledTagName = defineCE(PrefixedStyledComponent); // eslint-disable-line no-unused-vars

const tagName = defineCE(MuonComponent);
const tag = unsafeStatic(tagName);

const parentTagName = defineCE(ParentMuonComponent);
const parentTag = unsafeStatic(parentTagName);

const emptyTagName = defineCE(EmptyMuonComponent);
const emptyTag = unsafeStatic(emptyTagName);

const multipleScopedStylesTagName = defineCE(MultipleScopedStyles);
const multipleScopedStylesTag = unsafeStatic(multipleScopedStylesTagName);

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

  it('broken scoped styles', async () => {
    const element = await fixture(html`<${brokenScopedStylesTag}></${brokenScopedStylesTag}>`);

    expect(getComputedStyle(element).color).to.equal('rgb(0, 0, 0)', 'computed style value added for component');
    expect(element.__addLightDOM()).to.equal(undefined, 'no styles added');
  });

  describe('PREFIX replacement', () => {
    function getPrefixedComponentCssText() { // eslint-disable-line jsdoc/require-jsdoc
      const instance = new PrefixedStyledComponent();
      const styles = instance.slottedStyles;
      return styles && styles.cssText ? styles.cssText : styles;
    }

    it('does not happen with class selectors', () => {
      const cssText = getPrefixedComponentCssText();
      // eslint-disable-next-line no-unused-expressions
      expect(
        cssText.includes('.PREFIX-test') && !cssText.includes('.muon-test'),
        `Expected .PREFIX-test to be present and .muon-test to be absent in cssText.\ncssText: ${cssText}`
      ).to.be.true;
    });

    it('works with type selectors', () => {
      const cssText = getPrefixedComponentCssText();
      // eslint-disable-next-line no-unused-expressions
      expect(
        cssText.includes('muon-child-el') && !cssText.includes('PREFIX-child-el'),
        `Expected muon-child-el to be present and PREFIX-child-el to be absent in cssText.\ncssText: ${cssText}`
      ).to.be.true;
    });
  });
});
