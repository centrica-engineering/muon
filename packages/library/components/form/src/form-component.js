import { html, MuonElement } from '@muons/library';
// import { FormElementMixin } from '@muons/library/mixins/form-element-mixin';
// import { ValidationMixin } from '@muons/library/mixins/validation-mixin';

export class Form extends MuonElement {

  constructor() {
    super();
    this.type = 'standard';
  }

  firstUpdated() {
    super.firstUpdated();
    // const nativeForm = this.shadowRoot.querySelector('form');
    //nativeForm?.addEventListener('submit', this._onSubmit.bind(this));

    Array.from(this.querySelectorAll('*')).filter((formElement) => {
      console.log(formElement);
      //   return formElement instanceof FormElementMixin;
      return formElement.nodeName.includes('-'); //web component
    }).forEach((formElement) => {
      formElement.associateForm = true;
      formElement.addEventListener('form-submit', this._onSubmit.bind(this));
    });
  }

  _onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('form submit');
    const validity = this.validate();
    console.log(validity);
    return false;
  }

  get standardTemplate() {
    return html`
      <div class="form">
        <form>
          <slot></slot>
        </form>
      </div>
    `;
  }

  validate() {
    let isValid = true;
    const validationStates = Array.from(this.querySelectorAll('*')).filter((formElement) => {
      //return formElement instanceof FormElementMixin;
      return formElement.nodeName.includes('-'); //web component
    }).map((formElement) => {
      //if (formElement instanceof ValidationMixin) {
      console.log(formElement);
      const validity = formElement.validity;
      console.log(validity.valid);
      isValid = isValid & validity.valid;
      return {
        name: formElement.name,
        value: formElement.value,
        isValid: validity.valid,
        error: formElement.validationMessage,
        formElement
      };
    });
    return {
      isValid,
      validationStates
    };
  }
}
