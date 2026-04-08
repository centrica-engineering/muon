import { MuonElement, html } from '@muonic/muon';
import styles from './card-styles.css';
import slottedStyles from './card-styles.slotted.css';

/**
 * A test card element that will nest whatever and apply styling.
 *
 * @element test-card
 *
 */

export class TestCard extends MuonElement {

  static get styles() {
    return [
      styles
    ];
  }

  get slottedStyles() {
    return slottedStyles;
  }

  get standardTemplate() {
    return html`
      <div class="starter-test-card">
        <slot></slot>
      </div>
    `;
  }
}
