import { css, html, LitElement, unsafeCSS } from '@muon/library';
import {
  ACCORDION_TYPE
} from '@muon/library/build/tokens/es6/muon-tokens';

import styles from './styles.css';

/**
 * Holder of accordion-details. Introduces them.
 *
 * @element accordion
 *
 */

export class Accordion extends LitElement {

  static get properties() {
    return {
      type: { type: String }
    };
  }

  static get styles() {
    return css`${unsafeCSS(styles)}`;
  }

  constructor() {
    super();

    this.type = ACCORDION_TYPE;
  }

  get standardTemplate() {
    return html`
      <slot name="heading"></slot>
      <slot></slot>
    `;
  }

  render() {
    return html`${this[`${this.type}Template`]}`;
  }
}
