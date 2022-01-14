import { MuonElement, html, ifDefined, classMap, styleMap } from '@muons/library';
import { svgLoader } from '@muons/library/directives/svg-loader';
import {
  ICON_TYPE,
  ICON_NAME,
  ICON_CATEGORY,
  ICON_SIZES,
  ICON_URL
} from '@muons/library/build/tokens/es6/muon-tokens';

import styles from './styles.css';

/**
 * Icons are visual symbols that are used to represent objects or actions to reduce cognitive load to a user.
 *
 * @element icon
 *
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

    this.type = ICON_TYPE;
    this.name = ICON_NAME;
    this.category = ICON_CATEGORY;
    this.allSizes = ICON_SIZES;
    this.url = ICON_URL;
    this.describe = '';
  }

  /**
   *
   *
   * @readonly
   * @memberof Icon
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
