import { html, MuonElement, ScopedElementsMixin, classMap, styleMap } from '@muons/library';
import {
  INPUTTER_TYPE,
  INPUTTER_VALIDATION_WARNING_ICON
} from '@muons/library/build/tokens/es6/muon-tokens';
import { ValidationMixin } from '@muons/library/mixins/validation-mixin';
import { MaskMixin } from '@muons/library/mixins/mask-mixin';
import { Icon } from '@muons/library/components/icon';
import styles from './styles.css';

/**
 * A component to allow for user inputs of type text, radio, checkbox, select,
 * date, tel, number, textarea, search.
 *
 * @element inputter
 */

export class Inputter extends ScopedElementsMixin(MaskMixin(ValidationMixin(MuonElement))) {

  static get properties() {
    return {
      helper: { type: String },
      isHelperOpen: { type: Boolean }
    };
  }

  static get scopedElements() {
    return {
      'inputter-icon': Icon
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

  get _validationIconTemplate() {
    return html`<inputter-icon name="${INPUTTER_VALIDATION_WARNING_ICON}" class="validation-icon"></inputter-icon>`;
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
