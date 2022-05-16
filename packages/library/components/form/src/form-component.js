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
    if (validity.isValid) {
      this.nativeForm.submit();
    } else {
      const invalidElements = validity.validationStates.filter((state) => {
        return !state.isValid;
      });
      invalidElements[0].formElement.focus();
    }
    return validity.isValid;
  }

  get nativeForm() {
    return this.querySelector('form');
  }

  validate() {
    let isValid = true;
    const formElementsCount = this.nativeForm.elements?.length;
    let i = 0;
    const validationStates = [];
    for (; i < formElementsCount; i++) {
      const formElement = this.nativeForm.elements[i];
      console.log(formElement.name, formElement.value);
      formElement.reportValidity();
      const validity = formElement.validity;
      isValid = Boolean(isValid & validity.valid);
      validationStates.push({
        name: formElement.name,
        value: formElement.value,
        isValid: validity.valid,
        error: formElement.validationMessage,
        validity: validity,
        formElement
      });
    }
    return {
      isValid,
      validationStates
    };
  }

  get standardTemplate() {
    return html`
      <div class="form">
          <slot></slot>
      </div>
    `;
  }
}
