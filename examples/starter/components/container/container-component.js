import { html, MuonElement, classMap } from '@muonic/muon';
import styles from './container-styles.css';
import slottedStyles from './container-styles.slotted.css';

/**
 *
 * @element container
 *
 */

export class Container extends MuonElement {

  static get styles() {
    return styles;
  }

  get slottedStyles() {
    return slottedStyles;
  }

  /**
   * Standard template.
   *
   * @readonly
   * @private
   * @returns {object} TemplateResult - template.
   */
  get standardTemplate() {
    const classes = {
      container: true
    };

    return html`
      <div class=${classMap(classes)}>
        <slot></slot>
      </div>
    `;
  }
}
