import { MuonElement, css, html, unsafeCSS } from '@muon/library';
import { DetailsMixin } from '@muon/library/mixins/detail-mixin';
import { Icon } from '@muon/library/components/icon';
import styles from './styles.css';

export class Detail extends DetailsMixin(MuonElement) {

  static get properties() {
    return {
      icon: {
        type: String
      }
    };
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
