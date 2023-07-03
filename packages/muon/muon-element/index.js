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
        return sheet.ownerNode?.id === styleName;
      });
    };

    this.updateComplete.then(() => {
      const css = this.slottedStyles;

      if (!css) {
        return undefined;
      }

      const addStyles = (css, key = 0) => {
        const clonedCSS = Object.assign({}, css);
        const nodeName = this.nodeName.toLowerCase();
        const parentNode = this.getRootNode();
        const parentNodeType = parentNode.nodeName;
        const styleName = key > 0 ? `${nodeName}-styles-${key}` : `${nodeName}-styles`;

        // First need to replace `light-dom` with the component name
        clonedCSS.cssText = clonedCSS.cssText.replace(/import {css} from 'lit';\nexport const styles = css`/g, '');
        clonedCSS.cssText = clonedCSS.cssText.replace(/`;\nexport default styles;\n/g, '');

        // How we add the styles depends on where it is being added, HTMLDocument or another ShadowDom.
        // If the Document we don't want to add multiple times
        if (parentNodeType === '#document-fragment') {
          clonedCSS.cssText = clonedCSS.cssText.replace(/light-dom/g, nodeName);
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
          clonedCSS.cssText = clonedCSS.cssText.replace(/light-dom/g, `.ndsn ${nodeName}`);
          // If it is in the parent DOM
          const styleSheets = parentNode.styleSheets;

          if (!Array.from(checkSheets(styleSheets, styleName)).length > 0) {
            const style = document.createElement('style');
            style.innerHTML = String.raw`${clonedCSS.cssText}`;
            style.id = styleName;
            document.head.appendChild(style);
          }
        }
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
