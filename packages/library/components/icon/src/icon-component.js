import { MuonElement, html, ifDefined, classMap, styleMap } from '@muons/library';
import { svgLoader } from '@muons/directives/svg-loader';
import {
  ICON_CONFIG_TYPE,
  ICON_CONFIG_NAME,
  ICON_CONFIG_CATEGORY,
  ICON_CONFIG_SIZES,
  ICON_CONFIG_URL
} from '@muons/tokens';

import styles from './icon-styles.css';

/**
 * Icons are visual symbols that are used to represent objects or actions to reduce cognitive load to a user.
 *
 * @element icon
 */

export class Icon extends MuonElement {

  static get properties() {
    return {
      name: { type: String, attribute: true },
      describe: { type: String },
      size: { type: Number },
      category: { type: String },
      url: { type: String, state: true }
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
    this.url = ICON_CONFIG_URL;
    this.describe = '';
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
    const classes = {
      icon: true,
      [this.type]: true
    };

    const styles = {
      '--icon-size': this.iconSize
    };

    return html`
      <div aria-hidden=${ifDefined(hidden)} role=${ifDefined(role)} aria-label=${ifDefined(role && this.describe)} class=${classMap(classes)} style=${styleMap(styles)}>
        ${svgLoader({ name: this.name, category: this.category, path: this.url })}
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
