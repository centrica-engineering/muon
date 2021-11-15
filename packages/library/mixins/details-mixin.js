import { html, ScopedElementsMixin } from '@muon/library';
import { Icon } from '@muon/library/components/icon';

export const DetailsMixin = (superClass) =>
  class DetailsMixinClass extends ScopedElementsMixin(superClass) {

    static get properties() {
      return {
        open: {
          type: Boolean,
          value: false,
          reflect: true
        }
      }
    }

    static get scopedElements() {
      return {
        'detail-icon': Icon
      };
    }

    constructor() {
      super();
      //this.__detailRef = createRef();
      this._openIcon = 'chevron-down'; // TODO: override with token
      this._closeIcon = 'chevron-up'; // TODO: override with token
    }

    updated() {
      super.updated();

      const detailElement = this.shadowRoot.querySelector('details');
      detailElement.addEventListener('toggle', this._onToggle.bind(this));
      detailElement.addEventListener('click', this._onToggle.bind(this));
    }

    /*
     * protected
     * override to implement on detail toggle event
     */
    _onToggle(event) {
      this.open = event.target.open;
      this.dispatchEvent(new CustomEvent('toggle', {
        detail: {
          isOpen: event.target.open
        }
      }));
    }

    get standardTemplate() {
      return html`
        <details class="details"  ${this.open ? 'open' : ''}>
        ${this._standardSummaryTemplate()}
        ${this._standardContentTemplate()}
        </details>
      `;
    }

    _standardSummaryTemplate() {
      return html`
        <summary class="summary">
          <span class="heading-wrapper">
            <span class="heading">
              <slot name="heading"></slot>
            </span>
            <span class="open-close-icon">
              <detail-icon name='${this._openIcon}'  class="open-icon"></detail-icon>
              <detail-icon name='${this._closeIcon}' class="close-icon"></detail-icon>
            </span>
          </span>
        </summary>
      `;
    }

    _standardContentTemplate() {
      return html`
        <div class="panel">
          <slot></slot>
        </div>
      `;
    }
  }
