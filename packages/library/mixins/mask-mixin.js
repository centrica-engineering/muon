import { html, ifDefined } from '@muons/library';
import { dedupeMixin } from '@open-wc/dedupe-mixin';
import { FormElementMixin } from './form-element-mixin';

export const MaskMixin = dedupeMixin((superclass) =>
  class MaskMixinClass extends FormElementMixin(superclass) {
    static get properties() {
      return {
        mask: {
          type: String
        },

        separator: {
          type: String
        }
      };
    }

    constructor() {
      super();

      this.mask = '';
      this.separator = '';
    }

    firstUpdated() {
      super.firstUpdated();

      if (this.mask) {
        this._slottedInputs.map((input) => {
          input.addEventListener('input', this._onInput.bind(this)());
          input.setAttribute('maxlength', this.mask.length);
        });
      }
    }

    _onInput(inputEvent) {
      const args = inputEvent;
      let timeout;
      return () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.__inputHandler.apply(this, args);
        }, 300);
      };
    }

    /**
     * A method to handle `input` event when `mask` is provided.
     * @param {Event} inputEvent - event while 'input.
     * @returns {undefined}
     */
    __inputHandler() {
      const inputElement = this._slottedInputs[0];
      if (ifDefined(this.separator)) {
        this.updateValue(inputElement);
      } else {
        this.value = inputElement.value;
      }
    }

    _processValue(value) {
      value = super._processValue(value);
      if (ifDefined(this.separator)) {
        value = this.formatWithMaskAndSeparator(value);
      }
      return value;
    }

    updateValue(input) {
      let value = input.value;
      let cursor = input.selectionStart;
      const diff = this.value.length - value.length;

      if (diff > 0 && this.mask.charAt(cursor) === this.separator) {
        value = value.slice(0, cursor - 1) + (cursor < value.length ? value.slice(cursor) : '');
        cursor -= 1;
      }
      const formattedValue = this.formatWithMaskAndSeparator(value);
      input.value = formattedValue;
      this.value = formattedValue;

      if (this.mask.charAt(cursor) === this.separator) {
        cursor += 1;
      }
      this.updateComplete.then(() => {
        input.setSelectionRange(cursor, cursor);
      });
    }

    formatWithMaskAndSeparator(value) {
      const formattedValue = this.__formatInputWithoutSeparator(value);
      const parts = this.mask.split(this.separator);
      let processedValue = '';
      let length = 0;
      let partsLength = 0;
      for (let i = 0; i < parts.length && length < formattedValue.length; i++) {
        partsLength += parts[i].length;
        const remainingLength = formattedValue.length - length;
        processedValue += formattedValue.substr(
          length, remainingLength > parts[i].length ? parts[i].length : remainingLength);
        length += parts[i].length;
        if (i < (parts.length - 1) && processedValue.length === partsLength) {
          processedValue += this.separator;
          partsLength += 1;
        }
      }
      return processedValue;
    }

    __formatInputWithoutSeparator(value) {
      return value.split(this.separator).join('');
    }

    get _maskTemplate() {
      if (this.mask) {
        let length = this.value ? this.value.length : 0;
        let updatedMask = new Array(length + 1).join(' ');
        if (this.separator && this.mask.charAt(length) === this.separator) {
          updatedMask += ' ';
          length += 1;
        }
        updatedMask += this.mask.slice(length);
        return html`<div aria-hidden="true" class="input-mask">${updatedMask}</div>`;
      } else {
        return undefined;
      }
    }
  }
);
