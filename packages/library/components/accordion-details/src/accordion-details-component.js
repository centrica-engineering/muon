import { css, html, LitElement, unsafeCSS } from '@muon/library';
import {
  ACCORDION_DETAILS_TYPE
} from '@muon/library/build/tokens/es6/muon-tokens';

import styles from './styles.css';

/**
 * Hide and show information. Stacks within Accordion.
 *
 * @element accordion-details
 *
 */

export class AccordionDetails extends LitElement {

  static get properties() {
    return {
      open: { type: Boolean },
      type: { type: String }
    };
  }

  static get styles() {
    return css`${unsafeCSS(styles)}`;
  }

  constructor() {
    super();

    this.type = ACCORDION_DETAILS_TYPE;
  }

  get heading() {
    return html`
      <span>
        <slot name="heading"></slot>
      </span>
    `;
  }

  get panel() {
    return html`
      <div>
        <slot></slot>
      </div>
    `;
  }

  get standardTemplate() {
    return html`
      <details .open=${this.open}>
        <summary>
          ${this.heading}
        </summary>
        ${this.panel}
      </details>
    `;
  }

  render() {
    return html`${this[`${this.type}Template`]}`;
  }
}
