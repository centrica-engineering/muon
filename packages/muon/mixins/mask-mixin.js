import { html, ifDefined, dedupeMixin } from '@muonic/muon';
import { FormElementMixin } from '@muon/mixins/form-element-mixin';

/**
 * A mixin to enable mask and separator features to a form element.
 * `mask` property is supported for input of type text, date, tel.
 * `separator` property is supported for input of type text, date, tel.
 *
 * @mixin
 */

export const MaskMixin = dedupeMixin((superclass) =>
  class MaskMixinClass extends FormElementMixin(superclass) {
    static get properties() {
      return {
        mask: {
          type: String
        },

        separator: {
          type: String
        },

        ignoreSeparator: {
          type: Boolean,
          attribute: 'ignore-separator'
        }
      };
    }

    constructor() {
      super();

      this.mask = '';
      this.separator = '';
      this.ignoreSeparator = false;
    }

    firstUpdated() {
      super.firstUpdated();

      if (this.mask) {
        this._slottedInputs.map((input) => {
          input.setAttribute('maxlength', this.mask.length);
        });
      }
    }

    /**
     * A method to process the form element value in response to `input` event.
     *
     * @param {string} value - Value to be processed with mask and separator.
     * @returns {string} - Processed value.
     * @protected
     */
    _processMaskInputValue(value) {
      if (!this._isSingle) {
        return value;
      }
      const inputElement = this._slottedInputs[0];
      if (ifDefined(this.separator)) {
        value = this.updateValueAndCursor(inputElement);
      } else {
        value = inputElement.value;
      }
      return value;
    }

    /**
     * A method to process the form element value in response to `change` event.
     *
     * @param {string} value - Value to be processed with mask and separator.
     * @returns {string} - Processed value.
     * @protected
     */
    _processMaskChangeValue(value) {
      if (ifDefined(this.separator)) {
        value = this.formatWithMaskAndSeparator(value);
        this._slottedInputs[0].value = value;
      }
      return value;
    }

    /**
     * A method to update the form element value with separator in adjusted indices and cursor position.
     *
     * @param {HTMLElement} input - HTMLInputElement value to be updated with seperators.
     * @returns {string} - Updated form element value.
     */
    updateValueAndCursor(input) {
      let value = input.value;
      let cursor = input.selectionStart;
      const diff = this.value.length - value.length;

      if (diff > 0 && this.mask.charAt(cursor) === this.separator) {
        value = value.slice(0, cursor - 1) + (cursor < value.length ? value.slice(cursor) : '');
        cursor -= 1;
      }
      const formattedValue = this.formatWithMaskAndSeparator(value);
      input.value = formattedValue;

      if (this.mask.charAt(cursor) === this.separator) {
        cursor += 1;
      }
      this.updateComplete.then(() => {
        input.setSelectionRange(cursor, cursor);
      });

      return formattedValue;
    }

    /**
     * A method to format the form element value with separator adjusted to correct indices
     * after editing the form element value.
     *
     * @param {string} value - Value of the form element.
     * @returns {string} - Value with adjusted separator in correct indices.
     */
    formatWithMaskAndSeparator(value) {
      const formattedValue = this.__formatInputWithoutSeparator(value);
      const parts = this.mask.split(this.separator);
      let processedValue = '';
      let length = 0;
      let currentLength = 0;

      for (let i = 0; i < parts.length && length < formattedValue.length; i++) {
        const remainingLength = formattedValue.length - length;
        const splitPoint = remainingLength > parts[i].length ? parts[i].length : remainingLength;

        processedValue += formattedValue.substr(length, splitPoint);
        currentLength += parts[i].length;

        if (i < (parts.length - 1) && processedValue.length === currentLength) {
          processedValue += this.separator;
          currentLength += 1;
        }

        length += parts[i].length;
      }

      return processedValue;
    }

    /**
     * A method to remove separator from the value of the form element.
     *
     * @param {string} value - Form element value.
     * @returns {string} - Value with separator removed.
     */
    __formatInputWithoutSeparator(value) {
      return value.split(this.separator).join('');
    }

    get _addMask() {
      if (this.mask && this._isSingle) {
        const length = this.value ? this.value.length : 0;
        let updatedMask = new Array(length + 1).join(' ');
        updatedMask += this.mask.slice(length);
        return html`<div aria-hidden="true" class="input-mask">${updatedMask}</div>`;
      } else {
        return undefined;
      }
    }
  }
);
