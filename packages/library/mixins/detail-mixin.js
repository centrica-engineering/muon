import { html, classMap, ScopedElementsMixin } from '@muons/library';
import { Icon } from '@muons/library/components/icon';

/**
 * A mixin to hold show / hide content
 * @mixin
 */

export const DetailMixin = (superClass) =>
  class DetailMixinClass extends ScopedElementsMixin(superClass) {

    static get properties() {
      return {
        open: {
          type: Boolean,
          reflect: true
        },

        _toggleOpen: {
          type: String,
          state: true
        },

        _toggleClose: {
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
      const classes = {
        details: true,
        'toggle-start': this._togglePosition === 'start',
        'toggle-end': this._togglePosition === 'end'
      };
      return html`
        <details class=${classMap(classes)} ?open="${this.open}" @toggle="${this._onToggle}">
          ${this._headingTemplate()}
          ${this._contentTemplate()}
        </details>
      `;
    }

    get __toggleTemplate() {
      const toggle = this.open ? this._toggleClose : this._toggleOpen;
      return html`<detail-icon name='${toggle}' class="toggle"></detail-icon>`;
    }

    /**
     * A method to render the heading part.
     * @returns {RenderTemplate} - rendering template
     */
    _headingTemplate() {
      const isToggleStart = this._togglePosition === 'start';
      return html`
        <summary class="heading">
          ${isToggleStart ? this.__toggleTemplate : undefined}
          <slot name="heading"></slot>
          ${isToggleStart ? undefined : this.__toggleTemplate}
        </summary>
      `;
    }

    /**
     * A method to render the content part when expanded.
     * @returns {RenderTemplate} - rendering template
     */
    _contentTemplate() {
      return html`
      <div class="content">
        <slot></slot>
      </div>
    `;
    }
  };
