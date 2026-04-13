import { MuonElement, html } from '@muonic/muon';
import slottedStyles from './card-styles.slotted.css';

/**
 * A test card element that will nest whatever and apply styling.
 *
 * @element test-card
 *
 */

export class TestCard extends MuonElement {

  get slottedStyles() {
    return slottedStyles;
  }

  get standardTemplate() {
    return html`
      <div>
        <slot></slot>
      </div>
    `;
  }
}
