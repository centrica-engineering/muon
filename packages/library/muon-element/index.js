import { html, LitElement, adoptStyles } from '@muons/library';

export const MuonElementMixin = (superClass) => class extends superClass {

  static get properties() {
    return {
      type: { type: String }
    };
  }

  constructor() {
    super();

    this.type = 'standard';
  }
  /**
   * A method to inject light DOM styles into parent.
   * This currently has some limitations:
   * - Cannot easily target the element with attributes
   * - With this implementation CSS can be written outside of host, leaking styles
   * - :host might not be the right use here as users might believe they can use its other features
   * @param {CSSResult} css - scoped styles
   * @returns {CSSResult} - return modified css that is injected
   */
  lightDOM(css) {
    this.updateComplete.then(() => {
      const nodeName = this.nodeName.toLowerCase();
      const parentNode = this.getRootNode();
      const parentNodeType = parentNode.nodeName;
      const style = document.createElement('style');
      const styleName = `${nodeName}-styles`;

      // First need to replace `:host` with the component name
      css.cssText = css.cssText.replace(/:host/g, nodeName);
      style.innerHTML = String.raw`${css.cssText}`;
      style.title = styleName;

      // How we add the styles depends on where it is being added, HTMLDocument or another ShadowDom.
      // If the Document we don't want to add multiple times
      if (parentNodeType === '#document-fragment') {
        // If it is within a shadowDom
        // @TODO: Work out a way to have shadow adopt only once

        adoptStyles(parentNode, [css]);
      } else if (parentNodeType === '#document') {
        // If it is in the parent DOM

        const styleSheets = parentNode.styleSheets;
        const sheets = [].slice.call(styleSheets).filter((sheet) => {
          return sheet.title === styleName;
        });

        if (!Array.from(sheets).length > 0) {
          document.head.appendChild(style);
        }
      }

      return css;
    });
  }

  render() {
    return html`${this[`${this.type}Template`]}`;
  }
};

export const MuonElement = MuonElementMixin(LitElement);
