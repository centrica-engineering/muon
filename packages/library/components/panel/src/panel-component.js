import { css, html, LitElement, unsafeCSS } from '@muon/library';
import {
  PANEL_TYPE
} from '@muon/library/build/tokens/es6/muon-tokens';

import styles from './styles.css';

/**
 * To hold content within a layout
 *
 * @element Panel
 *
 */

export class Panel extends LitElement {

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

    this.type = PANEL_TYPE;
  }

  get standardTemplate() {
    return html`
      <div>
        <slot></slot>
      </div>
    `;
  }

  render() {
    return html`${this[`${this.type}Template`]}`;
  }
}
