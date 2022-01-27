import { html, classMap, ScopedElementsMixin } from '@muons/library';
import { Icon } from '@muons/library/components/icon';

/**.
 * A mixin to hold show / hide content
 *
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

        icon: {
          type: String
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
     *
     * @param {Event} toggleEvent - Event to handle.
     * @returns {void}
     * @example
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

    get __iconTemplate() {
      if (this.icon) {
        return html`
          <detail-icon name="${this.icon}" class="icon"></detail-icon>
        `;
      }
      return undefined;
    }

    get __toggleTemplate() {
      const toggle = this.open ? this._toggleClose : this._toggleOpen;
      return html`<detail-icon name='${toggle}' class="toggle"></detail-icon>`;
    }

    /**
     * A method to render the heading part.
     *
     * @returns {object} TemplateResult - rendering template.
     */
    _headingTemplate() {
      const isToggleStart = this._togglePosition === 'start';
      return html`
        <summary class="heading">
          ${isToggleStart ? this.__toggleTemplate : this.__iconTemplate}
          <slot name="heading"></slot>
          ${isToggleStart ? this.__iconTemplate : this.__toggleTemplate}
        </summary>
      `;
    }

    /**
     * A method to render the content part when expanded.
     *
     * @returns {object} TemplateResult - rendering template.
     */
    _contentTemplate() {
      return html`
      <div class="content">
        <slot></slot>
      </div>
    `;
    }
  };
