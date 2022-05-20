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

    // this._boundKeyPressEvent = (submitEvent) => {
    //   this._submitNativeForm(submitEvent);
    // };

    // Array.from(this.nativeForm.querySelectorAll('input, textarea, select')).forEach((element) => {
    //   element.addEventListener('keypress', this._boundKeyPressEvent);
    // });
  }

  // _submitNativeForm(event) {
  //   if (event.key === 'Enter') {
  //     this.nativeForm.requestSubmit();
  //   }
  // }

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
      this.updateComplete.then(() => {
        setTimeout(()=> {
          invalidElements[0].formElement.focus();
        }, 150);
      });
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
      const nativeElement = this.nativeForm.elements[i];
      // get web component to do validation.
      const formElement = this.nativeForm.querySelector(`[name=${nativeElement.name}]`) || nativeElement;
      formElement.reportValidity();
      const validity = formElement.validity;
      isValid = Boolean(isValid & validity.valid);
      validationStates.push({
        name: formElement.name,
        value: formElement.value,
        isValid: validity.valid,
        error: formElement.validationMessage,
        validity: validity,
        formElement: nativeElement // element used to run validation check and to be focused in case of validation error.
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
