import { html, LitElement, adoptStyles, supportsAdoptingStyleSheets } from '@muonic/muon';

/**
 * @typedef {module:lit.CSSResultOrNative} CSSResultOrNative - define css type
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
  }

  performUpdate() {
    super.performUpdate();

    this.__addLightDOM();
  }

  /**
   * A method to inject light DOM styles into parent.
   * This currently has some limitations:
   * - Cannot easily target the element with attributes.
   * - With this implementation CSS can be written outside of host, leaking styles.
   *
   * @returns {CSSResultOrNative} - Return modified css that is injected.
   * @private
   */
  __addLightDOM() {
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

      const addStyles = (css, key = 0) => {
        if (typeof css !== 'string' || !css) {
          return;
        }

        const nodeName = this.nodeName.toLowerCase();
        const parentNode = this.getRootNode();
        const parentNodeType = parentNode.nodeName;
        const styleName = key > 0 ? `${nodeName}-styles-${key}` : `${nodeName}-styles`;

        // First need to replace `light-dom` with the component name
        css = css.replace(/light-dom/g, nodeName);

        // How we add the styles depends on where it is being added, HTMLDocument or another ShadowDom.
        // If the Document we don't want to add multiple times
        if (parentNodeType === '#document-fragment') {
          // If it is within a shadowDom
          let stylesAdded;

          if (supportsAdoptingStyleSheets) {
            const stylesheet = new CSSStyleSheet();

            stylesheet.replaceSync(css);
            stylesAdded = [...parentNode.adoptedStyleSheets, stylesheet];
          } else {
            stylesAdded = [css];
          }

          adoptStyles(parentNode, stylesAdded);
        } else if (parentNodeType === '#document') {
          // If it is in the parent DOM
          const styleSheets = parentNode.styleSheets;

          if (!Array.from(checkSheets(styleSheets, styleName)).length > 0) {
            const style = document.createElement('style');
            style.innerHTML = String.raw`${css}`;
            style.title = styleName;
            document.head.appendChild(style);
          }
        }

        return;
      };

      if (Array.isArray(css)) {
        css.forEach((style, key) => {
          addStyles(style, key);
        });
      } else {
        addStyles(css);
      }

      return true;
    });
    return undefined;
  }

  render() {
    return html`${this[`${this.type}Template`]}`;
  }
};

export const MuonElement = MuonElementMixin(LitElement);
