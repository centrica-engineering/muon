import { css, html, LitElement, unsafeCSS, classMap, ScopedElementsMixin } from '@muon/library';
import { Icon } from '@muon/library/components/icon';
import {
  TAB_TYPE
} from '@muon/library/build/tokens/es6/muon-tokens';

import styles from './styles.css';

/**
 * Tab button to work within Tabs
 *
 * @element tab
 *
 */

export class Tab extends ScopedElementsMixin(LitElement) {

  static get scopedElements() {
    return {
      'tab-icon': Icon
    };
  }

  static get properties() {
    return {
      type: { type: String },
      icon: { type: String },
      selected: { type: Boolean }
    };
  }

  static get styles() {
    return css`${unsafeCSS(styles)}`;
  }

  constructor() {
    super();
    this.icon = '';
    this.type = TAB_TYPE;
  }

  get addIcon() {
    if (this.icon?.trim()?.length > 0) {
      return html`
        <tab-icon name=${this.icon.trim()}></tab-icon>
      `;
    }

    return undefined;
  }

  get standardTemplate() {
    const classes = {
      'has-icon': this.icon?.trim()?.length > 0
    };

    return html`
      <button .selected="${this.selected}" class="${classMap(classes)}">
        ${this.addIcon}
        <slot></slot>
      </button>
    `;
  }

  render() {
    return html`${this[`${this.type}Template`]}`;
  }
}
