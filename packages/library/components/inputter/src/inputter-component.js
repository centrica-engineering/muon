import { html, MuonElement, classMap, ScopedElementsMixin } from '@muons/library';
import {
  INPUTTER_TYPE,
  INPUTTER_DETAIL_TOGGLE_OPEN,
  INPUTTER_DETAIL_TOGGLE_CLOSE,
  INPUTTER_DETAIL_TOGGLE_POSITION,
  INPUTTER_VALIDATION_WARNING_ICON
} from '@muons/library/build/tokens/es6/muon-tokens';
import { ValidationMixin } from '@muons/library/mixins/validation-mixin';
import { DetailMixin } from '@muons/library/mixins/detail-mixin';
import { Icon } from '@muons/library/components/icon';
import styles from './styles.css';
import detailStyles from './inputter-detail-styles.css';

/**
 * Allow for inputs
 *
 * @element inputter
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
    return html`
      <inputter-icon name="${INPUTTER_VALIDATION_WARNING_ICON}" class="icon"></inputter-icon>
    `;
  }

  get validity() {
    this.pristine = false;
    this.validate();
    return this._validity;
  }

  /**
   * A method to check availability of tip details slot.
   * @returns {Boolean} - availability of tip details slot.
   * @private
   */
  get __isTipDetailAvailable() {
    return !!this.querySelector('[slot="tip-details"]');
  }

  /**
   * A method to get helper template
   * @returns {RenderTemplate} - helper template
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
          </inputter-detail>
        `;
      } else {
        return html`
          <div class="helper">${this.helper}</div>
        `;
      }
    }

    return html``;
  }

  get standardTemplate() {
    const classes = {
      inputter: true,
      select: this._isSelect
    };

    return html`
      <div class="${classMap(classes)}">
        ${this._isMultiple ? this._headingTemplate : this._labelTemplate}
        ${this._helperTemplate}
        ${super.standardTemplate}
      </div>
      ${this._validationMessageTemplate}
    `;
  }
}

/**
 * InputterDetail component to handle helper text
 * @element inputter-detail
 * @private
 */

class InputterDetail extends DetailMixin(MuonElement) {

  static get styles() {
    return detailStyles;
  }

  constructor() {
    super();
    this._toggleOpen = INPUTTER_DETAIL_TOGGLE_OPEN;
    this._toggleClose = INPUTTER_DETAIL_TOGGLE_CLOSE;
    this._togglePosition = INPUTTER_DETAIL_TOGGLE_POSITION;
  }
}
