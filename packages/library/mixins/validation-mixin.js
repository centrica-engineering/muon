//import { validate } from '@muon/library/directives/validator';

export const ValidationMixin = (superClass) =>
  class ValidationMixinClass extends superClass {

    static get properties() {
      return {
        showError: {
          type: Boolean,
          value: true
        },

        validation: {
          type: Array,
          value: []
        },

        disableNativeValidation: {
          type: Boolean,
          value: false
        }
      };
    }

    constructor() {
      super();

      // @protected
      this._validationError = [];
      this._errorMessage = '';
      this._isValid = true;
    }

    isValid() {
      return !this._validationError?.length > 0;
    }

    validateValue() {
      this._validationError = this.validation.map((val) => {
        const vf = this.parseValidationFunction(val);
        const functionName = vf.functionName;
        const params = [this, this.value].concat(vf.params);
        return {
          name: functionName,
          value: this.customValidation()[functionName].apply(this, params)
        };
      });
    }

    customValidation() {
      return {
        isRequired: function (inputter, value) {
          return value || value.length > 0;
        },
        isFirstName: function (inputter, value) {
          const isName = /^[A-Za-zÀ-ÖØ-öø-ÿ\-\s]{1,24}$/i.test(value);
          return value.length > 0 && isName;
        }
      };
    }

    parseValidationFunction(validation) {
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
  }
