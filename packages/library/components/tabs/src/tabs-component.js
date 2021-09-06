import { css, html, LitElement, unsafeCSS } from '@muon/library';
import {
  TABS_TYPE
} from '@muon/library/build/tokens/es6/muon-tokens';

import styles from './styles.css';

/**
 * Tabs to show different sections of content
 *
 * @element tabs
 *
 */

export class Tabs extends LitElement {

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

    this.type = TABS_TYPE;
  }

  get addTabs() {
    return html`
      <div role="tablist" class="tabs-holder">
        <div class="tabs">
          <slot name="tab"></slot>
        </div>
      </div>
    `;
  }

  get addPanels() {
    return html`
      <slot name="panel"></slot>
    `;
  }

  get standardTemplate() {
    return html`
      <div class="layout">
        ${this.addTabs}
        ${this.addPanels}
      </div>
    `;
  }

  render() {
    return html`${this[`${this.type}Template`]}`;
  }
}
