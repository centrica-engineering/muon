import { html, MuonElement, ScopedElementsMixin, classMap, styleMap } from '@muons/library';
import {
  INPUTTER_TYPE,
  INPUTTER_DETAIL_TOGGLE_OPEN,
  INPUTTER_DETAIL_TOGGLE_CLOSE,
  INPUTTER_DETAIL_TOGGLE_POSITION,
  INPUTTER_VALIDATION_WARNING_ICON
} from '@muons/library/build/tokens/es6/muon-tokens';
import { ValidationMixin } from '@muons/library/mixins/validation-mixin';
import { MaskMixin } from '@muons/library/mixins/mask-mixin';
import { DetailMixin } from '@muons/library/mixins/detail-mixin';
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

  /* eslint-disable no-use-before-define */
  static get scopedElements() {
    return {
      'inputter-detail': InputterDetail,
      'inputter-icon': Icon
    };
  }
  /* eslint-enable no-use-before-define */

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

  /**
   * A method to check availability of tip details slot.
   *
   * @returns {boolean} - Availability of tip details slot.
   * @private
   */
  get __isTipDetailAvailable() {
    return !!this.querySelector('[slot="tip-details"]');
  }

  /**
   * A method to get helper template.
   *
   * @returns {object} TemplateResult - helper template.
   * @protected
   * @override
   */
  get _helperTemplate() {
    if (this.helper) {
      if (this.__isTipDetailAvailable) {
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
      'select-arrow': this._isSelect,
      'has-mask': this.mask
    };

    let styles = {};
    if (this.mask) {
      styles = {
        '--maxlength': this.mask.length
      };
    }

    return html `
      <div class="${classMap(classes)}" style="${styleMap(styles)}">
          ${this._isMultiple ? this._headingTemplate : this._labelTemplate}
          ${this._helperTemplate}
        <div class="input-holder">
          ${super.standardTemplate}
          ${this._maskTemplate}
        </div>
      </div>
      ${this._validationMessageTemplate}`;
  }
}

/**.
 * InputterDetail component to handle helper text
 *
 * @element inputter-detail
 * @private
 */

class InputterDetail extends DetailMixin(MuonElement) {

  constructor() {
    super();
    this._toggleOpen = INPUTTER_DETAIL_TOGGLE_OPEN;
    this._toggleClose = INPUTTER_DETAIL_TOGGLE_CLOSE;
    this._togglePosition = INPUTTER_DETAIL_TOGGLE_POSITION;
  }
}
