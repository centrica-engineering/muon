import { html, repeat, dedupeMixin } from '@muons/library';
import * as customValidation from '@muons/library/utils/validation-functions.js';
import { FormElementMixin } from './form-element-mixin';

/**
 * A mixin to hold the validation state of a form element.
 *
 * @mixin
 */

export const ValidationMixin = dedupeMixin((superClass) =>
  class ValidationMixinClass extends FormElementMixin(superClass) {

    static get properties() {
      return {
        validation: {
          type: Array
        },

        disableNative: {
          type: Boolean
        },

        showMessage: {
          type: Boolean
        },

        _pristine: {
          type: Boolean,
          state: true
        },

        _validationState: {
          type: Object,
          state: true
        },

        _customValidation: {
          type: Object,
          state: true
        }
      };
    }

    constructor() {
      super();

      this.validation = [];
      this.disableNative = false;
      this.showMessage = true;
      this._pristine = true;
      this._validationState = [];
      this._customValidation = {};
    }

    firstUpdated() {
      super.firstUpdated();
      this._addValidations(customValidation);
    }

    /**
     * A  method to add additional custom validations.
     *
     * @param {object} validations - Custom validation function name and definitions.
     * @protected
     * @override
     */
    _addValidations(validations) {
      if (validations) {
        Object.entries(validations).forEach(([key, value]) => {
          this._customValidation[key] = value;
        });
      }
    }

    /**
     * A getter method to get pristine state of the form element.
     *
     * @returns {boolean} - Pristine state.
     * @public
     */
    get isPristine() {
      return this._pristine;
    }

    /**
     * A getter method to get dirty state of the form element.
     *
     * @returns {boolean} - Dirty state.
     * @public
     */
    get isDirty() {
      return !this._pristine;
    }

    _onChange(changeEvent) {
      this._pristine = false;
      super._onChange(changeEvent);
      this.validate();
    }

    _onBlur(blurEvent) {
      this._pristine = false;
      super._onBlur(blurEvent);
      this.validate();
    }

    _onInput(inputEvent) {
      this._pristine = false;
      super._onInput(inputEvent);
      if (this._isSingle) {
        if (this.value !== this._slottedValue) {
          this.value = this._slottedValue;
          this._fireChangeEvent();
        }
        this.validate();
      }
    }
    /**
     * A method to validate the value of the form element.
     *
     * @returns {ValidityState} - Validity state of the form element.
     * @public
     * @override
     */
    validate() {
      let validationState = [];
      this.__updateAllValidity('');
      if (this.validation?.length > 0) {
        validationState = this.validation.map((val) => {
          const vf = this.__parseValidationFunction(val);
          const functionName = vf.functionName;
          const params = [this, this.value].concat(vf.params);
          return {
            name: functionName,
            value: this._customValidation[functionName].apply(this, params)
          };
        });
      }

      const nativeValidationState = this.__validateNative();
      if (nativeValidationState) {
        validationState.push(nativeValidationState);
      }

      console.log('validation state ', validationState);
      this._validationState = validationState || [];
      this.__updateAllValidity(this.__validationMessage);
      return this._slottedInputs[0].validity;
    }

    /**
     * A method to do native html form element validation.
     *
     * @returns {object} - Validation state.
     * @private
     */
    __validateNative() {
      if (this.disableNative) {
        return undefined;
      }

      let message;
      this._slottedInputs.forEach((input) => {
        if (!input.validity.valid) {
          if (input.validity.patternMismatch && input.title) {
            message = input.title;
          } else {
            message = input.validationMessage;
          }
        }
      });
      return message ? {
        name: 'native',
        value: message
      } : undefined;
    }

    /**
     * A method to parse the validation function name to return function name and parameter list (if any).
     *
     * @param {string} validation - Validation function name.
     * @returns {object} - Parsed function name and parameter list.
     * @private
     */
    __parseValidationFunction(validation) {
      let params = [];
      const arr = validation.split('(');
      const functionName = arr[0];
      const paramString = arr.length > 1 && arr[1].split(')')[0];
      if (paramString) {
        params = paramString.split(',').map((value) => {
          const int = parseInt(value, 10);
          const clean = value.split('');
          // remove quotes from 'string'
          clean.pop();
          clean.shift();
          return isNaN(int) ? clean.join('') : int;
        });
      }
      return {
        functionName,
        params
      };
    }

    /**
     * A method to update the custom validity of the html form elements.
     *
     * @param {string} validationMessage - Validation message to be set.
     * @returns {void}
     * @private
     */
    __updateAllValidity(validationMessage) {
      if (this.isDirty) {
        this._slottedInputs.forEach((input) => {
          if (input.setCustomValidity) {
            input.setCustomValidity(validationMessage);
          }
        });
      }
    }

    /**
     * A getter method to return warning icon of validation message.
     *
     * @protected
     * @override
     * @readonly
     */
    get _addValidationIcon() {
      return undefined;
    }

    /**
     * A method to get a validation message combind from the validity states.
     *
     * @returns {string} - Validation message.
     * @private
     */
    get __validationMessage() {
      return this._validationState?.filter((state) => {
        return state?.value;
      }).map((state) => {
        return state.value + '.';
      }).join(' ');
    }

    /**
     * A method to get validation message template.
     *
     * @returns {object} TemplateResult - validation message template.
     * @protected
     * @override
     */
    get _addValidationMessage() {
      if (this.showMessage && this.isDirty && this.__validationMessage) {
        return html`
          <div class="validation">
            ${this._addValidationIcon}
            <div class="message">
              ${this.__validationMessage}
            </div>
          </div>`;
      }

      return html``;
    }

    /**
     * A method to get list view of validation message template.
     *
     * @returns {object} TemplateResult - validation message template.
     * @protected
     * @override
     */
    get _addValidationListMessage() {
      if (this.showMessage && this.isDirty && this.__validationMessage) {
        const failedValidationStates = this._validationState?.filter((state) => {
          return state?.value;
        });
        if (failedValidationStates) {
          return html`
            <div class="validation">
              <ul>
                ${repeat(failedValidationStates, (validationState) => html`<li>${this._addValidationState(validationState.name, validationState.value)}</li>`)}
              </ul>
            </div>`;
        }
      }

      return html``;
    }

    /**
     * A method to render each of validation state message template.
     *
     * @param {string} key - Validation function name.
     * @param {string} value - Validation state or message.
     * @returns {object} TemplateResult validation template.
     * @protected
     * @override
     */
    _addValidationState(key, value) {
      return html`<p> ${value}. </p>`;
    }
  }
);
