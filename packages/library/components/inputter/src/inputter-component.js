import { css, html, MuonElement, unsafeCSS, classMap } from '@muon/library';
import {
  INPUTTER_TYPE
} from '@muon/library/build/tokens/es6/muon-tokens';
import { FormElementMixin } from '@muon/library/mixins/form-element-mixin.js';
import styles from './styles.css';

/**
 * Allow for inputs
 *
 * @element inputter
 *
 */

export class Inputter extends FormElementMixin(MuonElement) {
  static get shadowRootOptions() {
    return { ...MuonElement.shadowRootOptions, delegatesFocus: true };
  }

  static get properties() {
    return {
      validation: { type: Array },
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
    this.pristine = true;
    this._error = undefined;
    this.maskInputValue = this.mask;
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

  get showLabel() {
    if (this.labelID.length === 0) {
      if (this.heading.length > 0 && this._inputType === this._inputTypes.MULTIPLE) {
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

  get standardTemplate() {
    const classes = {
      'slotted-content': true,
      'select-arrow': this._inputType === this._inputTypes.SELECT
    };

    return html`
      ${this._labelTemplate}
      <div class="${classMap(classes)}">
        ${this._htmlFormElementTemplate}
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
        ${super.render()}
      </div>
    `;
  }
}
