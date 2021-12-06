import { MuonElement, css, html, unsafeCSS } from '@muons/library';
import { DetailsMixin } from '@muons/library/mixins/detail-mixin';
import { Icon } from '@muons/library/components/icon';
import styles from './styles.css';
import {
  DETAIL_OPEN_ICON,
  DETAIL_CLOSE_ICON
} from '@muons/library/build/tokens/es6/muon-tokens';

export class Detail extends DetailsMixin(MuonElement) {

  static get properties() {
    return {
      icon: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this._openIcon = DETAIL_OPEN_ICON;
    this._closeIcon = DETAIL_CLOSE_ICON;
  }

  static get scopedElements() {
    return {
      'detail-icon': Icon
    };
  }

  static get styles() {
    return css`${unsafeCSS(styles)}`;
  }

  get _iconTemplate() {
    if (this.icon !== '') {
      return html`
        <span class="icon">
          <detail-icon name="${this.icon}"></detail-icon>
        </span>
      `;
    }
    return html``;
  }

  /**
   * A method to render the heading part.
   * @returns {RenderTemplate} - rendering template
   */
  _headingTemplate() {
    return html`
      <summary class="summary">
        <span class="heading-wrapper">
          ${this._iconTemplate}
          <span class="heading">
            <slot name="heading"></slot>
          </span>
          <span class="open-close-icon">
            <detail-icon name='${this._openIcon}' class="open-icon"></detail-icon>
            <detail-icon name='${this._closeIcon}' class="close-icon"></detail-icon>
          </span>
        </span>
      </summary>`;
  }
}
