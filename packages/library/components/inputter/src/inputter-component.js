import { css, html, LitElement, unsafeCSS, classMap, live } from '@muon/library';
import {
  INPUTTER_TYPE
} from '@muon/library/build/tokens/es6/muon-tokens';

import styles from './styles.css';

/**
 * Allow for inputs
 *
 * @element inputter
 *
 */

export class Inputter extends LitElement {
  static get shadowRootOptions() {
    return { ...LitElement.shadowRootOptions, delegatesFocus: true };
  }

  static get properties() {
    return {
      type: { type: String },
      value: { type: String },
      validation: { type: Array },
      heading: { type: String },
      helper: { type: String },
      labelID: { type: String }, // to override the need for a label, incase it is somewhere else on the page
      mask: { type: String },
      separator: { type: String },
      ignoreSeparator: { type: Boolean },
      disableNativeValidation: { type: Boolean },
      disableEventBubbling: { type: Boolean },
      showError: { type: Boolean },
      isHelperOpen: { type: Boolean }
    };
  }

  static get styles() {
    return css`${unsafeCSS(styles)}`;
  }

  constructor() {
    super();

    this.type = INPUTTER_TYPE;
    this.labelID = '';
    this.heading = '';
    this.pristine = true;
    this._error = undefined;
    this.maskInputValue = this.mask;
    this._value = '';
    this.inFocus = null;
    this.isHelperOpen = false;
    this.disableNativeValidation = false;
  }

  get dirty() {
    return !this.pristine;
  }

  get validity() {
    this.pristine = false;
    this.validate();
    return this._validity;
  }

  get slotInputs() {
    const slot = this.querySelectorAll('input, textarea, select');
    return Array.from(slot);
  }

  get showLabel() {
    if (this.labelID.length === 0) {
      if (this.heading.length > 0 && this.inputType === 'multiple') {
        const parent = this.parentElement;
        const classes = {
          'in-fieldset': parent.isFieldset // @TODO: make this change for fieldsets
        };

        return html`<span id="input-heading" class="${classMap(classes)}">${this.heading}</span>`;
      }

      return html`<slot name="label"></slot>`;
    }
    return undefined;
  }

  get inputType() {
    if (this.querySelector('select')) {
      return 'select';
    }
    return this.slotInputTypes.indexOf('ns-selector') !== -1 || this.slotInputTypes.indexOf('radio') !== -1 || this.slotInputTypes.indexOf('checkbox') !== -1 ? 'multiple' : 'single';
  }

  get slotInputTypes() {
    return Array.from(this.slotInputs).map((node) => {
      return node.getAttribute('type');
    }) || [];
  }

  get value() {
    const input = this.slotInputs[0];

    return live(input.value).values['0'];
  }

  set value(value) {
    const input = this.slotInputs[0];
    const liveValue = live(value).values['0'];

    input.value = liveValue;
    input.setAttribute('value', liveValue);
    this.setAttribute('value', liveValue);
  }

  get standardTemplate() {
    const classes = {
      'slotted-content': true,
      'select-arrow': this.inputType === 'select'
    };

    return html`
      <slot name="label"></slot>
      <div class="${classMap(classes)}">
        <slot></slot>
      </div>
    `;
  }

  render() {
    // const hasError = this._error && !this.inputType === 'select' ? 'invalid' : ''; // @TODO: it is not an error
    const classes = {
      'input-holder': true,
      'is-pristine': this.pristine,
      'is-dirty': !this.pristine
    };

    return html`
      <div class="${classMap(classes)}">
        ${this[`${this.type}Template`]}
      </div>
    `;
  }
}
