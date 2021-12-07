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
        },

        _togglePosition: {
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
      this._toggleEvent = 'detail-toggle';
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
        <details class="details" ?open="${this.open}" @toggle="${this._onToggle}">
        ${this._headingTemplate()}
        ${this._contentTemplate()}
        </details>
      `;
    }

    get __toggleIconTemplate() {
      const toggleIcon = this.open ? this._closeIcon : this._openIcon;
      return html`<detail-icon name='${toggleIcon}' class="toggle-icon"></detail-icon>`;
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
              ${isIconStart ? this.__toggleIconTemplate : undefined}
              <slot name="heading"></slot>
              ${isIconStart ? undefined : this.__toggleIconTemplate}
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
