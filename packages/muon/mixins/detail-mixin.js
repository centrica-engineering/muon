import { html, classMap, styleMap, ScopedElementsMixin, dedupeMixin } from '@muonic/muon';
import { Icon } from '@muon/components/icon';

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

    get classes() {
      return {
        details: true,
        'toggle-start': this._togglePosition === 'start',
        'toggle-end': this._togglePosition === 'end',
        'has-icon': !!this.icon
      };
    }

    get inlineStyles() {
      return {};
    }

    /**
     * A method to handle 'toggle' event from the html detail element.
     *
     * @param {Event} toggleEvent - Event to handle.
     * @returns {void}
     * @example
     */
    _onToggle(toggleEvent) {
      this.open = !!toggleEvent.target.open;
      this.dispatchEvent(new CustomEvent(this._toggleEvent, {
        detail: {
          isOpen: this.open
        }
      }));
    }

    get standardTemplate() {
      return html`
        <details class=${classMap(this.classes)} style=${styleMap(this.inlineStyles)} ?open="${this.open}" @toggle="${this._onToggle}">
          ${this._addHeading}
          ${this._addContent}
        </details>
      `;
    }

    get __addIcon() {
      if (this.icon) {
        return html`
          <detail-icon name="${this.icon}" class="icon"></detail-icon>
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
          ${isToggleStart ? this.__addToggle : this.__addIcon}
          <slot name="heading"></slot>
          ${isToggleStart ? this.__addIcon : this.__addToggle}
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
