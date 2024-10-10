import { html, repeat, dedupeMixin } from '@muonic/muon';
import customValidation from '@muon/utils/validation/index.js';
import { FormElementMixin } from '@muon/mixins/form-element-mixin';

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
    }

    /**
     * A getter method to get pristine state of the form element.
     *
     * @returns {boolean} - Pristine state.
     * @public
     * @readonly
     */
    get isPristine() {
      return this._pristine;
    }

    /**
     * A getter method to get dirty state of the form element.
     *
     * @returns {boolean} - Dirty state.
     * @public
     * @readonly
     */
    get isDirty() {
      return !this._pristine;
    }

    reportValidity() {
      return this.validity;
    }

    /**
     * A getter method to get validity of the form element.
     * @returns {ValidityState} - Validity state of the form element.
     * @readonly
     */
    get validity() {
      this._pristine = false;
      return this.validate();
    }

    reset() {
      super.reset();
      this._pristine = true;
      this._validationState = [];
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
            value: customValidation[functionName].apply(this, params)
          };
        });
      }

      const nativeValidationState = this.__validateNative();
      if (nativeValidationState) {
        validationState.push(nativeValidationState);
      }

      this._validationState = validationState;
      this.__updateAllValidity(this.validationMessage);
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
     */
    get validationMessage() {
      return this._validationState?.filter((state) => {
        return state?.value;
      }).map((state) => {
        if (state.value.charAt(state.value.length - 1) === '.') {
          return state.value;
        }

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
      if (this.showMessage && this.isDirty && this.validationMessage) {
        return html`
          <div class="validation">
            ${this._addValidationIcon}
            <div class="message" role="alert" aria-live="assertive">
              <div class="visually-hidden">${this._isMultiple ? this.heading : this._slottedLabel?.textContent}</div>
              ${this.validationMessage}
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
      if (this.showMessage && this.isDirty && this.validationMessage) {
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
