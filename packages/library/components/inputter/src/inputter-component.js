import { html, MuonElement, ScopedElementsMixin, classMap, styleMap } from '@muons/library';
import {
  INPUTTER_TYPE,
  INPUTTER_DETAIL_TOGGLE_OPEN,
  INPUTTER_DETAIL_TOGGLE_CLOSE,
  INPUTTER_DETAIL_TOGGLE_POSITION,
  INPUTTER_VALIDATION_WARNING_ICON,
  INPUTTER_TYPE_DATE_ICON,
  INPUTTER_TYPE_SELECT_ICON,
  INPUTTER_TYPE_SEARCH_ICON
} from '@muons/library/build/tokens/es6/muon-tokens';
import { ValidationMixin } from '@muons/library/mixins/validation-mixin';
import { MaskMixin } from '@muons/library/mixins/mask-mixin';
import { DetailMixin } from '@muons/library/mixins/detail-mixin';
import { Icon } from '@muons/library/components/icon';
import styles from './styles.css';
import detailStyles from './inputter-detail-styles.css';

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
    return html`
      <inputter-icon name="${INPUTTER_VALIDATION_WARNING_ICON}" class="icon"></inputter-icon>
    `;
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
          <inputter-detail ?open="${this.isHelperOpen}">
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

    return undefined;
  }

  get _inputTypeIconTemplate() {
    let icon;
    if (this._isSelect) {
      icon = INPUTTER_TYPE_SELECT_ICON;
    } else if (this.querySelector('input[type="search"]')) {
      icon = INPUTTER_TYPE_SEARCH_ICON;
    } else if (this.querySelector('input[type="date"]')) {
      icon = INPUTTER_TYPE_DATE_ICON;
    }

    return icon ? html`<inputter-icon name="${icon}"></inputter-icon>` : undefined;
  }

  get standardTemplate() {
    const classes = {
      inputter: true,
      select: this._isSelect,
      'has-mask': this.mask,
      radio: this.querySelector('input[type="radio"]'),
      checkbox: this.querySelector('input[type="checkbox"]'),
      search: this.querySelector('input[type="search"]'),
      date: this.querySelector('input[type="date"]')
    };

    let styles = {};
    if (this.mask) {
      styles = {
        '--maxlength': this.mask.length
      };
    }

    return html`
      <div class="${classMap(classes)}" style="${styleMap(styles)}">
        ${this._isMultiple ? this._headingTemplate : this._labelTemplate}
        ${this._helperTemplate}
        <div class="wrapper">
          ${super.standardTemplate}
          ${this._maskTemplate}
          ${this._inputTypeIconTemplate}
        </div>
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
