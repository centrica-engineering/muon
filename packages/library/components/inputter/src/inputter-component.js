import { html, MuonElement, classMap } from '@muons/library';
import {
  INPUTTER_TYPE
} from '@muons/library/build/tokens/es6/muon-tokens';
import { ValidationMixin } from '@muons/library/mixins/validation-mixin';
import styles from './styles.css';

/**
 * Allow for inputs
 *
 * @element inputter
 *
 */

export class Inputter extends ValidationMixin(MuonElement) {

  static get properties() {
    return {
      helper: { type: String },
      mask: { type: String },
      separator: { type: String },
      isHelperOpen: { type: Boolean }
    };
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();

    this.type = INPUTTER_TYPE;
    this.isHelperOpen = false;
  }

  get validity() {
    this.pristine = false;
    this.validate();
    return this._validity;
  }

  get standardTemplate() {
    const classes = {
      'slotted-content': true,
      'select-arrow': this._inputType === this._isSelect
    };

    return html`
      ${this._labelTemplate}
      <div class="${classMap(classes)}">
        ${this._htmlFormElementTemplate}
      </div>
      ${this._validationMessageTemplate}
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
