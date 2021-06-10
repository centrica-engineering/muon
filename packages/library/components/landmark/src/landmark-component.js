import { html, css, LitElement } from '@muon/library';
import styles from './styles.css';

/**
 * Landmarks are used to introduce the page, informing users of their current location and its primary purpose.
 *
 * @element landmark
 *
 */

export class Landmark extends LitElement {
  static get properties() {
    return {
      type: { type: String }, // summit, hillside
      image: { type: String } // background image passed
    };
  }

  static get styles() {
    return css([`${styles}`]);
  }

  constructor() {
    super();
    this.image = '';
    this.type = 'standard';
  }

  /**
  * @private
  */
  get addSlots() {
    return `
    ${this.image}
    <div>
       <slot name="heading"></slot>
       <slot name="content"></slot>
       <slot name="action"></slot>
    </div>`;
  }

  /**
  * @private
  */
  get standard() {
    return this.addSlots;
  }

  render() {
    return html([`
        ${this[this.type]}
    `]);
  }

}
