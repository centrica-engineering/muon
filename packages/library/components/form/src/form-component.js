import { html, MuonElement } from '@muons/library';

export class Form extends MuonElement {

  constructor() {
    super();
    this.type = 'standard';
  }

  firstUpdated() {
    super.firstUpdated();
    this.nativeForm.setAttribute('novalidate', true);
    this.nativeForm.addEventListener('submit', this._onSubmit.bind(this));
  }

  _onSubmit(event) {
    event.preventDefault();
    const validity = this.validate();
    console.log(validity);
    const invalidElements = validity.validationStates.filter((state) => {
      return !state.isValid;
    });
    invalidElements[0].formElement.focus();
    return false;
  }

  get nativeForm() {
    return this.querySelector('form');
  }

  get standardTemplate() {
    return html`
      <div class="form">
          <slot></slot>
      </div>
    `;
  }

  validate() {
    let isValid = true;
    const validationStates = Array.from(this.querySelectorAll('*')).filter((formElement) => {
      return formElement.name && !formElement.parentElement?.formAssociated;
    }).map((formElement) => {
      const validity = formElement.validity;
      isValid = Boolean(isValid & validity.valid);
      if (!formElement.formAssociated) {
        formElement.reportValidity();
      }
      return {
        name: formElement.name,
        value: formElement.value,
        isValid: validity.valid,
        error: formElement.validationMessage,
        validity: validity,
        formElement
      };
    });
    return {
      isValid,
      validationStates
    };
  }
}
