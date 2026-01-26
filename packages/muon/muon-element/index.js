import { html, LitElement, adoptStyles, supportsAdoptingStyleSheets } from '@muonic/muon';

/**
 * @typedef {module:lit.CSSResultOrNative} CSSResultOrNative - define css type
 */

const prefixRegex = /prefix/g;
const prefix = process.env.MUON_PREFIX;

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
   * Helper to replace 'prefix' with 'process.env.MUON_PREFIX' in CSS text.
   * @param {string} cssText
   * @returns {string}
   *
   * @example
   * static get styles() {
   *   return css([this.processPrefix(styles.cssText)]);
   * }
   */

  static processPrefix(cssText) {
    return typeof cssText === 'string' ? cssText.replace(prefixRegex, prefix) : cssText;
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
        return sheet?.ownerNode?.dataset?.styleName === styleName;
      });
    };

    const processCss = (css, nodeName) => {
      return css
        .replace(/light-dom/g, nodeName)
        .replace(prefixRegex, prefix);
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

        // How we add the styles depends on where it is being added, HTMLDocument or another ShadowDom.
        // If the Document we don't want to add multiple times
        if (parentNodeType === '#document-fragment') {
          // If it is within a shadowDom
          css = processCss(css, nodeName);

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
          css = processCss(css, `:root ${nodeName}`);

          const styleSheets = parentNode.styleSheets;

          if (!Array.from(checkSheets(styleSheets, styleName)).length > 0) {
            const style = document.createElement('style');
            style.textContent = css;
            style.dataset.styleName = styleName;
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
    if (this[`${this.type}Template`]) {
      return html`${this[`${this.type}Template`]}`;
    }

    return html`${this.standardTemplate}` || html``;
  }
};

export const MuonElement = MuonElementMixin(LitElement);
