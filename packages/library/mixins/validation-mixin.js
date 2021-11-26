import { html, repeat } from '@muon/library';
import * as customValidation from '@muon/library/utils/validation-functions.js';
import { FormElementMixin } from './form-element-mixin';

/**
 * A mixin to hold the validation state of a form element.
 * @mixin
 */

export const ValidationMixin = (superClass) =>
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

        _validity: {
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
      this._validity = {};
      this._customValidation = [];
    }

    firstUpdated() {
      super.firstUpdated();
      this._customValidation = customValidation;

      this._slottedInputs.map((input) => {
        input.addEventListener('blur', this._onBlur.bind(this));
      });
    }

    /**
     * A  method to add additional custom validations.
     * @param {Object} validations - custom validation function name and definitions.
     * @protected
     * @override
     */
    _addValidations(validations) {
      if (validations) {
        for (const functionName in validations) {
          this._customValidation[functionName] = validations[functionName];
        }
      }
    }

    /**
     * A getter method to get pristine state of the form element
     */
    get isPristine() {
      return this._pristine;
    }

    /**
     * A getter method to get dirty state of the form element
     */
    get isDirty() {
      return !this._pristine;
    }

    _onChange(changeEvent) {
      this._pristine = false;
      super._onChange(changeEvent);

      this.validate();
    }

    /**
     * A method to handle `blur` event from the slotted html elements.
     * @protected
     * @override
     */
    _onBlur(blurEvent) {
      blurEvent.stopPropagation();
      this._pristine = false;
      super._onBlur(blurEvent);

      this.validate();
    }

    /**
     * A method to validate the value of the form element.
     * @param {String} value - form element value to be validated.
     * @returns {ValidityState} - validity state of the form element.
     * @public
     * @override
     */
    validate() {
      let validationState = [];
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
      if (validationState.length > 0) {
        this._validity.state = validationState;
        const isValid = validationState.reduce((previousState, nextState) =>
          previousState?.value && nextState?.value)?.value;
        this._validity.valid = !isValid;

        this.__updateAllValidity();
      }
      return this._slottedInputs[0].validity;
    }

    /**
     * A method to do native html form element validation.
     * @returns {Object} - validation state
     * @private
     */
    __validateNative() {
      if (this.disableNative) {
        return undefined;
      }

      let error;
      this._slottedInputs.forEach((input) => {
        if (!input.validity.valid) {
          if (input.validity.patternMismatch && input.title) {
            error = input.title;
          } else {
            error = input.validationMessage;
          }
        }
      });
      return error ? { native: error } : undefined;
    }

    /**
     * A method to parse the validation function name to return function name and parameter list (if any).
     * @param {String} validation - validation function name.
     * @returns {Object} - parsed function name and parameter list.
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
     * @returns {undefined}
     * @private
     */
    __updateAllValidity() {
      const validationMessage = this.__validationMessage;
      if (this.isDirty) {
        this._slottedInputs.forEach((input) => {
          if (input.setCustomValidity) {
            input.setCustomValidity(validationMessage);
          }
        });
      }
    }

    /**
     * A method to get a validation message combind from the validity states.
     * @returns {String} - validation message
     * @private
     */
    get __validationMessage() {
      return this._validity.state?.filter((state) => {
        return state?.value;
      }).map((state) => {
        return state.value + '.';
      }).join(' ');
    }

    /**
     * A method to get validation message template
     * @returns {RenderTemplate} - validation message template
     * @protected
     * @override
     */
    get _validationMessageTemplate() {
      if (this.showMessage && this.isDirty && !this._validity.valid) {
        return html`
          <div class="error">
            ${this.__validationMessage}
          </div>`;
      }

      return html``;
    }

    /**
     * A method to get list view of validation message template
     * @returns {RenderTemplate} - validation message template
     * @protected
     * @override
     */
    get _validationListMessageTemplate() {
      if (this.showMessage && this.isDirty && !this._validity.valid) {
        const failedValidation = this._validity.state?.filter((state) => {
          return state?.value;
        });
        if (failedValidation) {
          return html`
            <div class="error">
              <ul>
                ${repeat(failedValidation, (error) => html`<li>${this._errorTemplate(error.name)}</li>`)}
              </ul>
            </div>`;
        }
      }

      return html``;
    }

    /**
     *
     * @param {String} key - validation function name
     * @returns {RenderTemplate} validation error template
     * @protected
     * @override
     */
    _errorTemplate(key) {
      return html`<p> ${key} </p>`;
    }
  };
