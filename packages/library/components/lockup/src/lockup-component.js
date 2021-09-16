import { MuonElement, css, html, unsafeCSS, classMap } from '@muon/library';
import {
  LOCKUP_TYPE
} from '@muon/library/build/tokens/es6/muon-tokens';

import styles from './styles.css';

/**
 * Visual appearance of content with media.
 *
 * @element lockup
 *
 */

export class Lockup extends MuonElement {

  static get properties() {
    return {
      reverse: { type: Boolean }
    };
  }

  static get styles() {
    return css`${unsafeCSS(styles)}`;
  }

  constructor() {
    super();

    this.type = LOCKUP_TYPE;
  }

  get mediaTemplate() {
    return html`
      <slot name="media"></slot>
    `;
  }

  get contentTemplate() {
    return html`
      <slot name="heading"></slot>
      <slot name="content"></slot>
      <slot name="action"></slot>
    `;
  }

  get standardTemplate() {
    const classes = {
      reverse: this.reverse,
      [this.type]: true
    };

    return html`
      <div class="${classMap(classes)}">
        ${this.contentTemplate}
        ${this.mediaTemplate}
      </div>
    `;
  }
}
