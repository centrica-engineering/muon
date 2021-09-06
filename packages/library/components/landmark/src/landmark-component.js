import { html, css, unsafeCSS, LitElement, ScopedElementsMixin } from '@muon/library';
import { Image } from '@muon/library/components/image';
import {
  LANDMARK_TYPE
} from '@muon/library/build/tokens/es6/muon-tokens';

import styles from './styles.css';

/**
 * Landmarks are used to introduce the page, informing users of their current location and its primary purpose.
 *
 * @element landmark
 *
 */

export class Landmark extends ScopedElementsMixin(LitElement) {

  static get scopedElements() {
    return {
      'landmark-image': Image
    };
  }

  static get properties() {
    return {
      type: { type: String }, // summit, hillside
      image: { type: String } // background image passed
    };
  }

  static get styles() {
    return css`${unsafeCSS(styles)}`;
  }

  constructor() {
    super();
    this.image = '';
    this.type = LANDMARK_TYPE;
  }

  /**
    * @private
  */
  get addImage() {
    if (this.image) {
      return html`<landmark-image src="${this.image}"></landmark-image>`;
    }

    return undefined;
  }

  /**
  * @private
  */
  get addSlots() {
    return html`
    ${this.addImage}
    <div>
       <slot name="heading"></slot>
       <slot name="content"></slot>
       <slot name="action"></slot>
    </div>`;
  }

  /**
  * @private
  */
  get standardTemplate() {
    return this.addSlots;
  }

  render() {
    return html`${this[`${this.type}Template`]}`;
  }

}
