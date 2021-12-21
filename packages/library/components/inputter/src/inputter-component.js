import { html, MuonElement, classMap, styleMap, ifDefined } from '@muons/library';
import {
  INPUTTER_TYPE
} from '@muons/library/build/tokens/es6/muon-tokens';
import { ValidationMixin } from '@muons/library/mixins/validation-mixin';
import { MaskSeparatorController } from '@muons/library/controllers/mask-separator-controller';
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
      isHelperOpen: { type: Boolean },
      _maskDisplayValue: { type: String, state: true },
      _maskSeparatorController: { type: Object, state: true }
    };
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();

    this.type = INPUTTER_TYPE;
    this.isHelperOpen = false;
    this.mask = '';
    this.separator = '';
    this._maskDisplayValue = '';
  }

  firstUpdated() {
    if (ifDefined(this.mask)) {
      this._maskSeparatorController = new MaskSeparatorController(this);
      this.addController(this._maskSeparatorController);

      this._slottedInputs[0].addEventListener('input', this._onInput.bind(this));
      this._slottedInputs[0].setAttribute('maxlength', this.mask.length);
    }
  }

  /**
   * A method to handle `input` event when `mask` is provided.
   *
   * @param {Event} inputEvent - `input` event
   * @returns {undefined}
   */
  _onInput(inputEvent) {
    inputEvent.stopPropagation();
    if (ifDefined(this.separator)) {
      this.__updateValue(inputEvent.target);
    }
    this._maskDisplayValue = this._maskSeparatorController.updateMaskValue(inputEvent.target.value);
  }

  __updateValue(input) {
    let value = input.value;
    let cursor = input.selectionStart;
    const diff = this.value.length - value.length;

    if (diff > 0 && this.mask.charAt(cursor) === this.separator) {
      value = value.slice(0, cursor - 1) + (cursor < value.length ? value.slice(cursor) : '');
      cursor -= 1;
    }
    this.value = this._maskSeparatorController.formatWithMaskAndSeparator(value);
    input.value = this.value;

    this.updateComplete.then(() => {
      if (this.mask.charAt(cursor) === this.separator) {
        cursor += 1;
      }
      input.setSelectionRange(cursor, cursor);
    });
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
      'has-mask': ifDefined(this.mask)
    };

    let styles;
    if (this.mask) {
      styles = {
        '--maxlength': this.mask.length
      }
    }
    return html`
      ${this._labelTemplate}
      <div class="${classMap(classes)}" style="${styleMap(styles)}">
        ${this._htmlFormElementTemplate}
        ${this._maskTemplate}
      </div>
      ${this._validationMessageTemplate}
    `;
  }

  get _maskTemplate() {
    if (ifDefined(this.mask)) {
      const maskValue = this._maskDisplayValue || this.mask;
      return html`<div aria-hidden="true" class="input-guide">${maskValue}</div>`;
    }
    return undefined;
  }
}
