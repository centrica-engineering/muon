import { html, LitElement, adoptStyles, supportsAdoptingStyleSheets } from '@muons/library';
// eslint-disable-next-line jsdoc/valid-types
/**
 * @typedef {import('@lit/reactive-element').CSSResultOrNative} CSSResultOrNative
 */

export const MuonElementMixin = (superClass) => class extends superClass {

  static get properties() {
    return {
      type: { type: String }
    };
  }

  constructor() {
    super();

    this.type = 'standard';

    this.addLightDOM();

  }

  /**
   * A method to inject light DOM styles into parent.
   * This currently has some limitations:
   * - Cannot easily target the element with attributes.
   * - With this implementation CSS can be written outside of host, leaking styles.
   * - :host might not be the right use here as users might believe they can use its other features.
   *
   * @returns {CSSResultOrNative} - Return modified css that is injected.
   */
  addLightDOM() {
    const checkSheets = (styleSheets, styleName) => {
      return [].slice.call(styleSheets).filter((sheet) => {
        return sheet.title === styleName;
      });
    };

    this.updateComplete.then(() => {
      const css = this.slottedStyles;

      if (!css) {
        return undefined;
      }

      const clonedCSS = Object.assign({}, css);

      const nodeName = this.nodeName.toLowerCase();
      const parentNode = this.getRootNode();
      const parentNodeType = parentNode.nodeName;
      const styleName = `${nodeName}-styles`;

      // First need to replace `:host` with the component name
      clonedCSS.cssText = clonedCSS.cssText.replace(/:host/g, nodeName);

      // How we add the styles depends on where it is being added, HTMLDocument or another ShadowDom.
      // If the Document we don't want to add multiple times
      if (parentNodeType === '#document-fragment') {
        // If it is within a shadowDom
        let stylesAdded;

        if (supportsAdoptingStyleSheets) {
          const stylesheet = new CSSStyleSheet();

          stylesheet.replaceSync(clonedCSS.cssText);
          stylesAdded = [...parentNode.adoptedStyleSheets, stylesheet];
        } else {
          stylesAdded = [clonedCSS];
        }

        adoptStyles(parentNode, stylesAdded);
      } else if (parentNodeType === '#document') {
        // If it is in the parent DOM
        const styleSheets = parentNode.styleSheets;

        if (!Array.from(checkSheets(styleSheets, styleName)).length > 0) {
          const style = document.createElement('style');
          style.innerHTML = String.raw`${clonedCSS.cssText}`;
          style.title = styleName;
          document.head.appendChild(style);
        }
      }

      return clonedCSS;

    });
    return undefined;
  }

  render() {
    return html`${this[`${this.type}Template`]}`;
  }
};

export const MuonElement = MuonElementMixin(LitElement);
