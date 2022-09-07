import { html, MuonElement, css, unsafeCSS } from '@muonic/muon';
import scrollTo from '@muon/utils/scroll';
import styles from './form-styles.css';

/**
 * A form.
 *
 * @element form
 */

export class Form extends MuonElement {

  constructor() {
    super();
    this._submit = this._submit.bind(this);
    this._reset = this._reset.bind(this);
  }

  static get styles() {
    return css`${unsafeCSS(styles)}`;
  }

  connectedCallback() {
    super.connectedCallback();

    queueMicrotask(() => {
      this.__checkForFormEl();
      if (this._nativeForm) {
        this.__registerEvents();
        // hack to stop browser validation pop up
        this._nativeForm.setAttribute('novalidate', true);
        // hack to force implicit submission (https://github.com/WICG/webcomponents/issues/187)
        const input = document.createElement('input');
        input.type = 'submit';
        input.hidden = true;
        this._nativeForm.appendChild(input);
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.__teardownEvents();
  }

  __registerEvents() {
    this._nativeForm?.addEventListener('submit', this._submit);
    this._submitButton?.addEventListener('click', this._submit);
    this._nativeForm?.addEventListener('reset', this._reset);
    this._resetButton?.addEventListener('click', this._reset);
  }

  __teardownEvents() {
    this._nativeForm?.removeEventListener('submit', this._submit);
    this._submitButton?.removeEventListener('click', this._submit);
    this._nativeForm?.removeEventListener('reset', this._reset);
    this._resetButton?.removeEventListener('click', this._reset);
  }

  __checkForFormEl() {
    if (!this._nativeForm) {
      throw new Error(
        'No form node found. Did you put a <form> element inside?'
      );
    }
  }

  _reset() {
    this.__checkForFormEl();

    if (
      !this._resetButton.disabled ||
      !this._resetButton.loading
    ) {
      this._nativeForm.reset();
      Array.from(this._nativeForm.elements).forEach((element) => {
        const componentElement = this._findInputElement(element);
        if (componentElement !== element) {
          componentElement.reset?.();
        }
      });
    }
  }

  _submit(event) {
    event.preventDefault();
    event.stopPropagation();

    this.__checkForFormEl();

    if (
      !this._submitButton ||
      this._submitButton.disabled ||
      this._submitButton.loading
    ) {
      return undefined; // should this be false?
    }

    const validity = this.validate();

    if (validity.isValid) {
      this.dispatchEvent(new Event('submit', { cancelable: true }));
    } else {
      const invalidElements = validity.validationStates.filter((state) => {
        return !state.isValid;
      });

      scrollTo({ element: invalidElements[0].formElement });
    }

    return validity.isValid;
  }

  get _nativeForm() {
    return this.querySelector('form');
  }

  get _submitButton() {
    return this.querySelector('button:not([hidden])[type="submit"]') ||
      this.querySelector('input:not([hidden])[type="submit"]') ||
      this.querySelector('*:not([hidden])[type="submit"]');
  }

  get _resetButton() {
    return this.querySelector('button:not([hidden])[type="reset"]') ||
      this.querySelector('input:not([hidden])[type="reset"]') ||
      this.querySelector('*:not([hidden])[type="reset"]');
  }

  _findInputElement(element) {
    if (element.parentElement._inputElement) {
      return element.parentElement;
    }
    // Due to any layout container elements - @TODO - need better logic
    if (element.parentElement.parentElement._inputElement) {
      return element.parentElement.parentElement;
    }

    return element;
  }

  validate() {
    let isValid = true;
    // @TODO: Check how this works with form associated
    const validationStates = Array.from(this._nativeForm.elements).reduce((acc, element) => {
      element = this._findInputElement(element);
      const { name } = element;
      const hasBeenSet = acc.filter((el) => el.name === name).length > 0;

      // For checkboxes and radio button - don't set multiple times (needs checking for native inputs)
      // Ignore buttons (including hidden reset)
      if (
        hasBeenSet ||
        element === this._submitButton ||
        element === this._resetButton ||
        element.type === 'submit'
      ) {
        return acc;
      }

      if (element.reportValidity) {
        element.reportValidity();
      }

      const { validity } = element;

      if (validity) {
        const { value } = element;
        const { valid, validationMessage } = validity;

        isValid = Boolean(isValid & validity.valid);

        acc.push({
          name,
          value,
          isValid: valid,
          error: validationMessage,
          validity: validity,
          formElement: element
        });
      }

      return acc;
    }, []);

    return {
      isValid,
      validationStates
    };
  }

  get standardTemplate() {
    return html`
      <slot></slot>
    `;
  }
}
