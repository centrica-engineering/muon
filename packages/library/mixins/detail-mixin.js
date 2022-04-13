import { html, classMap, ScopedElementsMixin, dedupeMixin } from '@muons/library';
import { Icon } from '@muons/library/components/icon';

/**.
 * A mixin to hold show / hide content
 *
 * @mixin
 */

export const DetailMixin = dedupeMixin((superClass) =>
  class DetailMixinClass extends ScopedElementsMixin(superClass) {

    static get properties() {
      return {
        open: {
          type: Boolean,
          reflect: true
        },

        decoration: {
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
        'has-decoration': !!this.decoration
      };
      return html`
        <details class=${classMap(classes)} ?open="${this.open}" @toggle="${this._onToggle}">
          ${this._addHeading}
          ${this._addContent}
        </details>
      `;
    }

    get __addDecoration() {
      if (this.decoration) {
        return html`
          <detail-icon name="${this.decoration}" class="decoration"></detail-icon>
        `;
      }
      return undefined;
    }

    get __addToggle() {
      const toggle = this.open ? this._toggleClose : this._toggleOpen;
      return html`<detail-icon name='${toggle}' class="toggle"></detail-icon>`;
    }

    /**
     * A method to render the heading part.
     *
     * @returns {object} TemplateResult - rendering template.
     */
    get _addHeading() {
      const isToggleStart = this._togglePosition === 'start';
      return html`
        <summary class="heading">
          ${isToggleStart ? this.__addToggle : this.__addDecoration}
          <slot name="heading"></slot>
          ${isToggleStart ? this.__addDecoration : this.__addToggle}
        </summary>
      `;
    }

    /**
     * A method to render the content part when expanded.
     *
     * @returns {object} TemplateResult - rendering template.
     */
    get _addContent() {
      return html`
      <div class="content">
        <slot></slot>
      </div>
    `;
    }
  }
);
