import { MuonElement, css, html, unsafeCSS, ifDefined, classMap } from '@muons/library';
import { DetailMixin } from '@muons/library/mixins/detail-mixin';
import styles from './styles.css';
import {
  DETAIL_TOGGLE_OPEN,
  DETAIL_TOGGLE_CLOSE,
  DETAIL_TOGGLE_POSITION
} from '@muons/library/build/tokens/es6/muon-tokens';

/**
 * @element detail
 */
export class Detail extends DetailMixin(MuonElement) {

  static get properties() {
    return {
      icon: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this._toggleOpen = DETAIL_TOGGLE_OPEN;
    this._toggleClose = DETAIL_TOGGLE_CLOSE;
    this._togglePosition = DETAIL_TOGGLE_POSITION;
  }

  static get styles() {
    return css`${unsafeCSS(styles)}`;
  }

  get _iconTemplate() {
    if (ifDefined(this.icon)) {
      return html`
        <detail-icon name="${this.icon}" class="icon"></detail-icon>
      `;
    }
    return undefined;
  }

  get standardTemplate() {
    const classes = {
      details: true,
      'toggle-start': this._togglePosition === 'start',
      'toggle-end': this._togglePosition === 'end',
      'has-icon': !!this.icon
    };
    return html`
      <details class=${classMap(classes)} ?open="${this.open}" @toggle="${this._onToggle}">
      ${this._headingTemplate()}
      ${this._contentTemplate()}
      </details>
    `;
  }

  /**
   * A method to render the heading part.
   * @returns {RenderTemplate} - rendering template
   */
  _headingTemplate() {
    const isIconStart = this._togglePosition === 'start';
    return html`
      <summary class="heading">
        ${isIconStart ? this.__toggleTemplate : this._iconTemplate}
        <slot name="heading"></slot>
        ${isIconStart ? this._iconTemplate : this.__toggleTemplate}
      </summary>`;
  }
}
