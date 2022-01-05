import { html, MuonElement, classMap, styleMap } from '@muons/library';
import {
  INPUTTER_TYPE
} from '@muons/library/build/tokens/es6/muon-tokens';
import { ValidationMixin } from '@muons/library/mixins/validation-mixin';
import { MaskMixin } from '@muons/library/mixins/mask-mixin';

import styles from './styles.css';

/**
 * Allow for inputs
 *
 * @element inputter
 *
 */

export class Inputter extends MaskMixin(ValidationMixin(MuonElement)) {

  static get properties() {
    return {
      helper: { type: String },
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
      'select-arrow': this._isSelect,
      'has-mask': this.mask
    };

    let styles = {};
    if (this.mask) {
      styles = {
        '--maxlength': this.mask.length
      };
    }
    return html`
      ${this._isMultiple ? this._headingTemplate : this._labelTemplate}
      <div class="${classMap(classes)}" style="${styleMap(styles)}">
        ${this._htmlFormElementTemplate}
        ${this._maskTemplate}
      </div>
      ${this._validationMessageTemplate}`;
  }
}
