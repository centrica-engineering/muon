import { html, css, unsafeCSS, MuonElement, ScopedElementsMixin, classMap } from '@muon/library';
import { Image } from '@muon/library/components/image';
import {
  CARD_TYPE
} from '@muon/library/build/tokens/es6/muon-tokens';

import styles from './styles.css';

/**
 * Show content in a contained way
 *
 * @element Card
 *
 */

export class Card extends ScopedElementsMixin(MuonElement) {

  static get scopedElements() {
    return {
      'card-image': Image
    };
  }

  static get properties() {
    return {
      type: { type: String },
      image: { type: String }
    };
  }

  static get styles() {
    return css`${unsafeCSS(styles)}`;
  }

  constructor() {
    super();
    this.type = CARD_TYPE;
  }

  /**
    * @private
  */
  get addImage() {
    if (this.image) {
      return html`<card-image src="${this.image}"></card-image>`;
    }

    return undefined;
  }

  /**
    * @private
  */
  get header() {
    return html`
    <div class="header">
      <slot name="heading"></slot>
    </div>
    `;
  }
  /**
    * @private
  */
  get body() {
    return html`
    <div class="content">
      <slot name="content"></slot>
    </div>
    `;
  }
  /**
    * @private
  */
  get footer() {
    return html`
    <div class="footer">
      <slot name="action"></slot>
    </div>
    `;
  }
  /**
    * @private
  */
  get standardTemplate() {
    const classes = {
      [this.type]: true
    };

    return html`
      <div class="${classMap(classes)}">
        ${this.addImage}
        <div class="card">
          ${this.header}
          ${this.body}
          ${this.footer}
        </div>
      </div>
    `;
  }
}
