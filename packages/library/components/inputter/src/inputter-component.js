import { css, html, MuonElement, unsafeCSS, classMap, ScopedElementsMixin, repeat } from '@muon/library';
/*eslint-disable */
import {
  INPUTTER_TYPE,
  INPUTTER_VALIDATION_ISREQUIRED,
  INPUTTER_VALIDATION_ISFIRSTNAME
} from '@muon/library/build/tokens/es6/muon-tokens';
/*eslint-enable */
import { ValidationMixin } from '@muon/library/mixins/validation-mixin.js';
import { FormElementMixin } from '@muon/library/mixins/form-element-mixin.js';
import { DetailsMixin } from '../../../mixins/details-mixin.js';
import styles from './styles.css';
import detailStyles from './inputter-details-styles.css';
import validationStyles from './inputter-validation-styles.css';

/**
 * Allow for inputs
 *
 * @element inputter
 *
 */

export class Inputter extends ScopedElementsMixin(ValidationMixin(FormElementMixin(MuonElement))) {
  static get shadowRootOptions() {
    return { ...MuonElement.shadowRootOptions, delegatesFocus: true };
  }

  static get scopedElements() {
    return {
      'inputter-detail': InputterDetail,
      'inputter-validation': InputterValidation
    };
  }

  static get properties() {
    return {
      heading: {
        type: String,
        value: ''
      },
      labelID: {
        type: String,
        value: ''
      }, // to override the need for a label, incase it is somewhere else on the page

      mask: { type: String },
      separator: { type: String },
      helper: { type: String },
      isHelperOpen: {
        type: Boolean,
        value: false,
        reflect: true
      }
    };
  }

  static get styles() {
    return css`${unsafeCSS(styles)}`;
  }

  constructor() {
    super();

    this.type = INPUTTER_TYPE;
  }

  get slotInputs() {
    const slot = this.querySelectorAll('input, textarea, select');
    return Array.from(slot);
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

  addEventListener() {
    const inputs = this.querySelectorAll('input');
    inputs.forEach((input) => {
      input.addEventListener('input', (event) => {
        this.value = event.target.value;
        this.fireChangeEvent();
      });

      input.addEventListener('blur', () => {
        if (this.showError) {
          this.validateValue();
          if (this._validationError !== null) {
            this.shadowRoot.querySelector('inputter-validation').validationError = this._validationError;
          }
        }
      });
    });
  }

  firstUpdated() {
    this.addEventListener();
  }

  get standardTemplate() {
    const classes = {
      'slotted-content': true,
      'select-arrow': this.inputType === 'select'
    };

    return html`
      <div class="label">
        <slot name="label"></slot>
      </div>
      <inputter-detail ${this.isHelperOpen ? 'open' : ''}>
        <div slot="heading">${this.helper}</div>
        <slot name="tip-details"></slot>
      </inputter-detail>
      <div class="${classMap(classes)}">
        <slot></slot>
      </div>
    `;
  }

  get radioTemplate() {
    return this.__renderChoiceTemplate();
  }

  get checkboxTemplate() {
    return this.__renderChoiceTemplate();
  }

  __renderChoiceTemplate() {
    const classes = {
      'slotted-content': true,
      'select-arrow': this.inputType === 'select'
    };

    return html`
      <div class="heading">
        <slot name="heading"></slot>
      </div>
      <inputter-detail ${this.isHelperOpen ? 'open' : ''}>
        <div slot="heading">${this.helper}</div>
        <slot name="tip-details"></slot>
      </inputter-detail>
      <div class="${classMap(classes)}">
        <slot></slot>
      </div>
    `;
  }

  renderError() {
    if (this.showError) {
      return html`
        <inputter-validation type="inputterValidation" validationerror="${JSON.stringify(this._validationError)}">
        </inputter-validation>
      `;
    }

    return html``;
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
        ${this.renderError()}
      </div>
    `;
  }
}

class InputterDetail extends DetailsMixin(MuonElement) {

  static get styles() {
    return css`${unsafeCSS(detailStyles)}`;
  }
}

class InputterValidation extends MuonElement {

  static get properties() {
    return {
      validationError: {
        type: Array
      }
    };
  }

  constructor() {
    super();

    this.validationError = [];
  }

  static get styles() {
    return css`${unsafeCSS(validationStyles)}`;
  }

  get inputterValidationTemplate() {
    return html`
      <div class="error">
      ${repeat(this.validationError, (error) => html`<p> ${this.__errorTemplate(error.name)} </p>`)}
      </div>`;
  }

  __errorTemplate(key) {
    return eval('INPUTTER_VALIDATION_' + key.toUpperCase());
  }
}
