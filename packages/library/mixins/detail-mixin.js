import { html, ScopedElementsMixin } from '@muons/library';
import { Icon } from '@muons/library/components/icon';

/**
 * A mixin to hold show / hide content
 * @mixin
 */

export const DetailsMixin = (superClass) =>
  class DetailsMixinClass extends ScopedElementsMixin(superClass) {

    static get properties() {
      return {
        open: {
          type: Boolean,
          reflect: true
        },

        _openIcon: {
          type: String,
          state: true
        },

        _closeIcon: {
          type: String,
          state: true
        }
      };
    }

    static get scopedElements() {
      return {
        'detail-icon': Icon
      };
    }

    constructor() {
      super();
      this.open = false;
      this._openIcon = 'chevron-down'; // TODO: override with token
      this._closeIcon = 'chevron-up'; // TODO: override with token
      this._toggleEvent = 'detail-toggle';
    }

    firstUpdated() {
      super.firstUpdated();

      const detailElement = this.shadowRoot.querySelector('details');
      detailElement.addEventListener('toggle', this._onToggle.bind(this));
    }

    /**
     * A method to handle 'toggle' event from the html detail element.
     * @param {Event} toggleEvent - event to handle.
     * @returns {undefined}
     */
    _onToggle(toggleEvent) {
      const isOpen = !!toggleEvent.target.open;
      this.open = isOpen;
      this.dispatchEvent(new CustomEvent(this._toggleEvent, {
        detail: {
          open: isOpen
        }
      }));
    }

    get standardTemplate() {
      return html`
        <details class="details" ?open="${this.open}">
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
      return html`
        <summary class="summary">
          <span class="heading-wrapper">
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

    /**
     * A method to render the content part when expanded.
     * @returns {RenderTemplate} - rendering template
     */
    _contentTemplate() {
      return html`
        <div class="panel">
          <slot></slot>
        </div>`;
    }
  };
