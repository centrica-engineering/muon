import { MuonElement, html, ifDefined, classMap, styleMap } from '@muonic/muon';
import { svgLoader } from '@muon/directives/svg-loader-directive';
import {
  ICON_CONFIG_TYPE,
  ICON_CONFIG_NAME,
  ICON_CONFIG_CATEGORY,
  ICON_CONFIG_SIZES,
  ICON_CONFIG_URL
} from '@muon/tokens';

import styles from './icon-styles.css';

/**
 * Icons are visual symbols that are used to represent objects or actions to reduce cognitive load to a user.
 *
 * @element icon
 * @placement {"muon-form"}
 */

export class Icon extends MuonElement {

  static get properties() {
    return {
      name: { type: String, attribute: true },
      describe: { type: String },
      size: { type: Number },
      category: { type: String },
      _url: { type: String, state: true }
    };
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();

    this.type = ICON_CONFIG_TYPE;
    this.name = ICON_CONFIG_NAME;
    this.category = ICON_CONFIG_CATEGORY;
    this.allSizes = ICON_CONFIG_SIZES;
    this._url = ICON_CONFIG_URL;
    this.describe = '';
  }

  get classes() {
    return {
      icon: true,
      [this.name]: true
    };
  }

  get inlineStyles() {
    return {
      '--icon-size': this.iconSize
    };
  }

  /**
   * A getter method to get size of image.
   *
   * @returns {number | string} - Size at specific index or 100%.
   * @readonly
   */
  get sizes() {
    const size = this.size - 1;

    return this.allSizes[size] || '100%';
  }

  get iconSize() {
    const computedSize = this.sizes;
    const size = computedSize === '100%' ? computedSize : `${computedSize}px`;

    return size;
  }

  get standardTemplate() {
    const hidden = this.describe?.length === 0 ? 'true' : undefined;
    const role = !hidden ? 'img' : undefined;

    return html`
      <div aria-hidden=${ifDefined(hidden)} role=${ifDefined(role)} aria-label=${ifDefined(role && this.describe)} class=${classMap(this.classes)} style=${styleMap(this.inlineStyles)}>
        ${svgLoader({ name: this.name, category: this.category, path: this._url })}
      </div>
    `;
  }

  render() {
    if (!this.name?.length > 0) {
      return undefined;
    }

    return super.render();
  }
}
