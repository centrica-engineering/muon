import { html, MuonElement } from '@muon/library';

/**
 * A mixin to hold base setup for a form element.
 * @mixin FormElementMixin
 */

export const FormElementMixin = (superClass) =>
  class FormElementMixinClass extends superClass {

    static get properties() {
      return {
        name: {
          type: String
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

        _id: {
          type: String,
          state: true
        },

        _inputType: {
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
        SINGLE: 'single',
        MULTIPLE: 'multiple',
        SELECT: 'select'
      };

      this.value = '';
      this.labelID = '';
      this.heading = '';
      this._id = `${this._randomId}-input`;
    }

    static get shadowRootOptions() {
      return { ...MuonElement.shadowRootOptions, delegatesFocus: true };
    }

    /**
     * A method to generate random Id for html elements.
     * @protected
     */
    get _randomId() {
      return `mnid-${Math.random().toString(36).substring(2, 15)}`;
    }

    connectedCallback() {
      super.connectedCallback();
      if (this.querySelectorAll('input[type="radio"], input[type="checkbox"]')?.length > 0) {
        this._inputType = this._inputTypes.MULTIPLE;
      } else if (this.querySelectorAll('select')?.length > 0) {
        this._inputType = this._inputTypes.SELECT;
      } else {
        this._inputType = this._inputTypes.SINGLE;
      }

      if (!this._isMultiple) {
        this._id = this._slottedInputs[0]?.getAttribute('id') || this._id;
        this._slottedInputs[0]?.setAttribute('id', this._id);
        this._slottedLabel?.setAttribute('for', this._id);

        if (this.labelID?.length > 0) {
          this._slottedInputs.forEach((slot) => {
            slot.setAttribute('aria-labelledby', this.labelID);
          });
        }
      }
    }

    firstUpdated() {
      this._slottedInputs.map((input) => {
        input.addEventListener('change', this._onChange.bind(this));
      });
    }

    /**
     * A method to get all slotted HTML form elements.
     * @protected
     * @override
     */
    get _slottedInputs() {
      const slot = this.querySelectorAll('input, textarea, select');
      return Array.from(slot);
    }

    /**
     * A method to get  slotted label element.
     * @protected
     * @override
     */
    get _slottedLabel() {
      return this.querySelector('label[slot="label"]');
    }

    /**
     * A method to determine if slotted form element has multiple option.
     * @protected
     * @override
     */
    get _isMultiple() {
      return this._inputType === this._inputTypes.MULTIPLE;
    }

    /**
     * A method to determine if slotted form element has only single option.
     * @protected
     * @override
     */
    get _isSingle() {
      return this._inputType === this._inputTypes.SINGLE;
    }

    /**
     * A method to handle `change` event from the slotted html elements.
     * @protected
     * @override
     */
    _onChange(changeEvent) {
      changeEvent.stopPropagation();
      const value = this._isMultiple ? this.__checkedInput : changeEvent.target.value;
      this.value = this._processValue(value);
      this._fireChangeEvent();
    }

    /**
     * A method to fire the 'change' custom event from the form element.
     * @protected
     * @override
     */
    _fireChangeEvent() {
      this.dispatchEvent(new CustomEvent('change', {
        detail: {
          value: this.value
        }
      }));
    }

    /**
     * A method to remove whitespace from the form element value
     * @param {String} value - form element value to be trimmed.
     * @returns {String} - trimmed value
     * @private
     */
    __removeWhitespace(value) {
      return this._isSingle ? value.trim() : value;
    }

    /**
     * A method to process form element value before assigning to 'value' property
     * @param {String} value - form elment value to be processed.
     * @returns {String} - processed value
     * @protected
     * @override
     */
    _processValue(value) {
      return this.__removeWhitespace(value);
    }

    /**
     * A method to get values of checked form element.
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
     * @protected
     * @override
     */
    get _htmlFormElementTemplate() {
      return html`<slot></slot>`;
    }

    /**
     * A method to get label slot template to hold html form element label.
     * @protected
     * @override
     */
    get _labelTemplate() {
      return this.labelID.length === 0 ? html`<slot name="label"></slot>` : html``;
    }

    /**
     * A method to get heading slot template to hold html form element heading.
     * @protected
     * @override
     */
    get _headingTemplate() {
      return html`<span class="input-heading">${this.heading}</span>`;
    }

    /**
     * A method to get standard template for type `standard`.
     * @protected
     * @override
     */
    get standardTemplate() {
      return this._htmlFormElementTemplate;
    }
  };
