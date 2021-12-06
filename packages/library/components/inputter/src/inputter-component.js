import { css, html, MuonElement, unsafeCSS, classMap, ScopedElementsMixin } from '@muons/library';
import {
  INPUTTER_TYPE
} from '@muons/library/build/tokens/es6/muon-tokens';
import { ValidationMixin } from '@muons/library/mixins/validation-mixin';
import { DetailsMixin } from '@muons/library/mixins/detail-mixin';
import styles from './styles.css';

/**
 * Allow for inputs
 *
 * @element inputter
 *
 */

export class Inputter extends ScopedElementsMixin(ValidationMixin(MuonElement)) {

  static get properties() {
    return {
      helper: { type: String },
      mask: { type: String },
      separator: { type: String },
      isHelperOpen: { type: Boolean }
    };
  }

  static get scopedElements() {
    return {
      // eslint-disable-next-line no-use-before-define
      'inputter-detail': InputterDetail
    };
  }

  static get styles() {
    return css`${unsafeCSS(styles)}`;
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

  get _isTipDetailAvailable() {
    return !!this.querySelector('[slot="tip-details"]');
  }

  get _helperTemplate() {
    if (this.helper) {
      if (this._isTipDetailAvailable) {
        return html`
        <inputter-detail ${this.isHelperOpen ? 'open' : ''}>
          <div slot="heading">${this.helper}</div>
          <slot name="tip-details"></slot>
        </inputter-detail>`;
      } else {
        return html `
        <div slot="heading">${this.helper}</div>
        `;
      }
    }

    return html``;
  }

  get standardTemplate() {
    const classes = {
      'slotted-content': true,
      'select-arrow': this._inputType === this._isSelect
    };

    return html `
      <div class="${classMap(classes)}">
          ${this._isMultiple ? this._headingTemplate : this._labelTemplate}
          ${this._helperTemplate}
        <div class="input-holder">
          ${super.standardTemplate}
        </div>
      </div>
      ${this._validationMessageTemplate}`;
  }

  // render() {
  //   // const hasError = this._error && !this.inputType === 'select' ? 'invalid' : ''; // @TODO: it is not an error
  //   const classes = {
  //     'input-holder': true,
  //     'is-pristine': this.pristine,
  //     'is-dirty': !this.pristine
  //   };

  //   return html`
  //     <div class="${classMap(classes)}">
  //       ${super.render()}
  //     </div>
  //   `;
  // }
}

/**
 * InputterDetail component to handle helper text
 * @element inputter-detail
 */

class InputterDetail extends DetailsMixin(MuonElement) {

}
