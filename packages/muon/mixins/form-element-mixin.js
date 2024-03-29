import { html, MuonElement, dedupeMixin } from '@muonic/muon';

/**
 * A mixin to hold base setup for a form element.
 *
 * @mixin FormElementMixin
 */

export const FormElementMixin = dedupeMixin((superClass) =>
  class FormElementMixinClass extends superClass {

    static get properties() {
      return {
        name: {
          type: String,
          reflect: true
        },

        value: {
          type: String,
          reflect: true
        },

        heading: {
          type: String
        },

        labelID: {
          type: String
        },

        _inputElement: {
          type: Boolean,
          state: true
        },

        _id: {
          type: String,
          state: true
        },

        _inputTypes: {
          type: Object,
          state: true
        }
      };
    }

    constructor() {
      super();

      this._inputTypes = {
        RADIO: 'radio',
        CHECKBOX: 'checkbox',
        SELECT: 'select',
        SEARCH: 'search',
        DATE: 'date',
        SINGLE: 'single'
      };

      this.value = '';
      this.labelID = '';
      this.heading = '';
      this._inputElement = true;
      this._id = `${this._randomId}-input`;
    }

    static get shadowRootOptions() {
      return { ...MuonElement.shadowRootOptions, delegatesFocus: true };
    }

    /**
     * A method to generate random Id for html elements.
     *
     * @returns {string} - Random generated id.
     * @protected
     */
    get _randomId() {
      return `mnid-${Math.random().toString(36).substring(2, 15)}`;
    }

    /**
     * A method to get input type from the slotted html form elements.
     *
     * @returns {string} Input type.
     * @protected
     */
    get _inputType() {
      const inputType = this.querySelector('input')?.type;
      if (inputType && Object.values(this._inputTypes).indexOf(inputType) > -1) {
        return inputType;
      } else if (this.querySelector('select')) {
        return this._inputTypes.SELECT;
      }
      return this._inputTypes.SINGLE;
    }

    firstUpdated() {
      super.firstUpdated();
      if (!this.name) {
        this.name = this._slottedInputs?.[0]?.name ?? '';
      }
      if (!this._isMultiple) {
        if (this.labelID?.length > 0) {
          this._slottedInputs.forEach((slot) => {
            slot.setAttribute('aria-labelledby', this.labelID);
          });
        } else {
          this._id = this._slottedInputs[0]?.getAttribute('id') || this._id;
          this._slottedInputs[0]?.setAttribute('id', this._id);
          this._slottedLabel?.setAttribute('for', this._id);
        }
      }
      this.__syncValue(true);

      this._boundChangeEvent = (changeEvent) => {
        this._onChange(changeEvent);
      };

      this._boundBlurEvent = (blurEvent) => {
        this._onBlur(blurEvent);
      };

      this._boundInputEvent = (inputEvent) => {
        this._onInput(inputEvent);
      };

      this._slottedInputs.forEach((input) => {
        input.addEventListener('change', this._boundChangeEvent);
        input.addEventListener('blur', this._boundBlurEvent);
        input.addEventListener('input', this._boundInputEvent);
      });
    }

    focus() {
      this.updateComplete.then(() => {
        this._slottedInputs[0].focus();
      });
    }

    reset() {
      this.value = this._slottedValue; // get values from slotted html form elements
    }
    /**
     * A method to sync the value property of the component with value of slotted input elements.
     *
     * @param {boolean} firstSync - If first time syncing values.
     * @returns {void}
     * @private
     */
    __syncValue(firstSync) {
      if (this._isMultiple) { //Check when component has slotted multi-input
        if (!this.value && this.__checkedInput) {
          // If component has null value and slotted input has checked value(s),
          // assign the value of checked slotted input(s) to value property of the component.
          this.value = this.__checkedInput;
        } else if (this.value && !this.__checkedInput) {
          // If component has not null value and slotted input has no value(s) checked,
          // mark the multi-input as checked if its value(s) is part of component value property.
          const values = this.value.toString().split(',');
          this._slottedInputs.filter((input) => {
            return values.includes(input.value) && !input.checked;
          }).forEach((input) => {
            input.checked = true;
            if (firstSync) {
              input.defaultChecked = true;
            }
          });
        }
      } else { //When component has single-input slot
        // eslint-disable-next-line no-lonely-if
        if (!this.value && this._slottedInputs?.[0]?.value) {
          // If component has null value and slotted input has value,
          // assign the value of slotted inputs to value property of the component.
          this.value = this._processFormChangeValue(this._slottedInputs[0].value);
        } else if (this.value && !this._slottedInputs[0].value) {
          // If component has not null value and slotted input has null value,
          // assign the value of the component to value of the slotted input.
          this._slottedInputs[0].value = this.value;

          if (firstSync) {
            this._slottedInputs[0].defaultValue = this.value;
          }
        }
      }
    }

    /**
     * A method to get all slotted HTML form elements.
     *
     * @protected
     * @override
     */
    get _slottedInputs() {
      const slot = this.querySelectorAll('input, textarea, select');
      return Array.from(slot);
    }

    /**
     * A method to get slotted label element.
     *
     * @protected
     * @override
     */
    get _slottedLabel() {
      return this.querySelector('label[slot="label"]');
    }

    /**
     * A method to get slotted element value.
     *
     * @protected
     * @override
     */
    get _slottedValue() {
      return this._isMultiple ? this.__checkedInput : this._slottedInputs[0].value;
    }

    /**
     * A method to determine if slotted form element has multiple option.
     *
     * @protected
     * @override
     */
    get _isMultiple() {
      return this._inputType === this._inputTypes.RADIO || this._inputType === this._inputTypes.CHECKBOX;
    }

    /**
     * A method to determine if slotted form element has only single option.
     *
     * @protected
     * @override
     */
    get _isSingle() {
      return !(this._isMultiple || this._isSelect);
    }

    /**
     * A method to determine if slotted form element has only select option.
     *
     * @protected
     * @override
     */
    get _isSelect() {
      return this._inputType === this._inputTypes.SELECT;
    }

    /**
     * A method to handle `change` event from the slotted html elements.
     *
     * @protected
     * @override
     */
    _onChange(changeEvent) {
      changeEvent.stopPropagation();
      changeEvent.preventDefault();
      this.value = this._processFormChangeValue(this._slottedValue);
      this._fireChangeEvent();
    }

    /**
     * A method to handle `blur` event from the slotted html elements.
     *
     * @protected
     * @override
     */
    _onBlur(blurEvent) {
      blurEvent.stopPropagation();
    }

    /**
     * A method to handle `input` event from the slotted html elements.
     *
     * @protected
     * @override
     */
    _onInput(inputEvent) {
      inputEvent.stopPropagation();
      inputEvent.preventDefault();
    }

    /**
     * A method to fire the 'change' custom event from the form element.
     *
     * @protected
     * @override
     */
    _fireChangeEvent() {
      this.dispatchEvent(
        new CustomEvent('change', {
          bubbles: true,
          cancelable: false,
          detail: {
            value: this.value
          }
        })
      );
    }

    /**
     * A method to remove whitespace from the form element value.
     *
     * @param {string} value - Form element value to be trimmed.
     * @returns {string} - Trimmed value.
     * @private
     */
    __removeWhitespace(value) {
      return this._isSingle ? value.trim() : value;
    }

    /**
     * A method to process form element value before assigning to 'value' property.
     *
     * @param {string} value - Form elment value to be processed.
     * @returns {string} - Processed value.
     * @protected
     * @override
     */
    _processFormChangeValue(value) {
      return this.__removeWhitespace(value);
    }

    /**
     * A method to get values of checked form element.
     *
     * @returns {string} - Array of selected values for multiple option input.
     * @private
     */
    get __checkedInput() {
      return Array.from(this.querySelectorAll('input')).filter((input) => {
        return input.checked;
      }).map((input) => {
        return input.value;
      }).toString();
    }

    /**
     * A method to get anonymous slot template to hold html form elements.
     *
     * @protected
     * @override
     */
    get _addSlottedContent() {
      return html`<slot></slot>`;
    }

    /**
     * A method to get label slot template to hold html form element label.
     *
     * @protected
     * @override
     */
    get _addLabel() {
      return this.labelID.length === 0 ? html`<slot name="label"></slot>` : html``;
    }

    /**
     * A method to get heading slot template to hold html form element heading.
     *
     * @protected
     * @override
     */
    get _addHeading() {
      return html`<span class="input-heading">${this.heading}</span>`;
    }

    /**
     * A method to get standard template for type `standard`.
     *
     * @protected
     * @override
     */
    get standardTemplate() {
      return this._addSlottedContent;
    }
  }
);
