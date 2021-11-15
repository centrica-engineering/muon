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

        id: {
          type: String
        },

        inFocus: {
          type: Boolean,
          state: true
        }
      };
    }

    constructor() {
      super();
      this._id = ''; //TODO: generate random id
    }

    updated(changedProperties) {
      super.updated?.(changedProperties);

      //TODO: form element updated
    }

    //protected
    fireChangeEvent() {
      this.dispatchEvent(new CustomEvent('change', {
        detail: {
          value: this.value
        }
      }));
    }

    /*
    * protected function
    * override to implement on input event
    */
    _onInput() {

    }

    /*
    * protected function
    * override to implement on input event
    */
    _onChange() {

    }

    /*
    * protected function
    * override to implement on focus event
    */
    _onFocus() {
      this.inFocus = true;
    }

    /*
    * protected function
    * override to implement on blur event
    */
    _onBlur() {
      this.inFocus = false;
    }
  }
