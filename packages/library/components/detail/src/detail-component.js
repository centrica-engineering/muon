import { MuonElement, css, html, unsafeCSS, ifDefined } from '@muons/library';
import { DetailMixin } from '@muons/library/mixins/detail-mixin';
import styles from './styles.css';
import {
  DETAIL_TOGGLE_ICON_OPEN,
  DETAIL_TOGGLE_ICON_CLOSE,
  DETAIL_TOGGLE_ICON_POSITION
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
    this._openIcon = DETAIL_TOGGLE_ICON_OPEN;
    this._closeIcon = DETAIL_TOGGLE_ICON_CLOSE;
    this._togglePosition = DETAIL_TOGGLE_ICON_POSITION;
  }

  static get styles() {
    return css`${unsafeCSS(styles)}`;
  }

  get _iconTemplate() {
    if (ifDefined(this.icon)) {
      return html`
        <span class="icon">
          <detail-icon name="${this.icon}"></detail-icon>
        </span>
      `;
    }
    return undefined;
  }

  /**
   * A method to render the heading part.
   * @returns {RenderTemplate} - rendering template
   */
  _headingTemplate() {
    const isIconStart = this._togglePosition === 'start';
    return html`
      <summary class="summary">
        <span class="heading-wrapper">
            ${isIconStart ? this.__toggleIconTemplate : this._iconTemplate}
            <slot name="heading"></slot>
            ${isIconStart ? this._iconTemplate : this.__toggleIconTemplate}
        </span>
      </summary>`;
  }
}
