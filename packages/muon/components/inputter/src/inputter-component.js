import { html, MuonElement, ScopedElementsMixin, classMap, styleMap, ifDefined } from '@muonic/muon';
import {
  INPUTTER_CONFIG_TYPE,
  INPUTTER_CONFIG_DISABLED,
  INPUTTER_DETAIL_TOGGLE_OPEN,
  INPUTTER_DETAIL_TOGGLE_CLOSE,
  INPUTTER_DETAIL_TOGGLE_POSITION,
  INPUTTER_VALIDATION_WARNING_ICON,
  INPUTTER_FIELD_DATE_ICON,
  INPUTTER_FIELD_SELECT_ICON,
  INPUTTER_FIELD_SEARCH_ICON
} from '@muon/tokens';
import { ValidationMixin } from '@muon/mixins/validation-mixin';
import { MaskMixin } from '@muon/mixins/mask-mixin';
import { DetailMixin } from '@muon/mixins/detail-mixin';
import { Icon } from '@muon/components/icon';
import styles from './inputter-styles.css';
import detailStyles from './inputter-styles-detail.css';
import slottedStyles from './inputter-styles.slotted.css';

/**
 * A component to allow for user inputs of type text, radio, checkbox, select,
 * date, tel, number, textarea, search.
 *
 * @element inputter
 */

export class Inputter extends ScopedElementsMixin(ValidationMixin(MaskMixin(MuonElement))) {

  static get properties() {
    return {
      helper: { type: String },
      isHelperOpen: { type: Boolean, attribute: 'open-helper' },
      _helperId: { type: String, state: true }
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

  /**
   * Getter method to construct classes object.
   * @protected
   * @returns {object} - Classes object to be included in the template.
   */
  get classes() {
    const type = this._isSingle && this.querySelector('input')?.type;
    const autocomplete = this._isSingle && this.querySelector('input')?.autocomplete || undefined;

    return {
      inputter: true,
      select: this._isSelect,
      'has-mask': this.mask,
      radio: this._inputType === this._inputTypes.RADIO,
      checkbox: this._inputType === this._inputTypes.CHECKBOX,
      search: this._inputType === this._inputTypes.SEARCH,
      date: this._inputType === this._inputTypes.DATE,
      'has-disabled': this._hasDisabled,
      [`type-${type}`]: !!type,
      [`autocomplete-${autocomplete}`]: !!autocomplete
    };
  }

  /**
   * Getter method to construct styles object.
   * @protected
   * @returns {object} - Styles object to be included in the template.
   */
  get inlineStyles() {
    if (this.mask) {
      return {
        '--maxlength': this.mask.length
      };
    }

    return {};
  }

  get slottedStyles() {
    return slottedStyles;
  }

  constructor() {
    super();

    this.type = INPUTTER_CONFIG_TYPE;
    this.isHelperOpen = false;
    this._helperId = `${this._randomId}-helper`;
  }

  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);

    let validationEle = this.querySelector(`#${this._id}-validation`);
    if (!validationEle) {
      validationEle = document.createElement('div');
      validationEle.setAttribute('class', 'visually-hidden');
      validationEle.setAttribute('id', `${this._id}-validation`);
      this.appendChild(validationEle);
    }
    const slottedInput = this._slottedInputs[0];
    if (this._shouldShowValidation) {
      validationEle.setAttribute('aria-live', 'polite');
      slottedInput?.setAttribute('aria-errormessage', `${this._id}-validation`);
      slottedInput?.setAttribute('aria-invalid', 'true');
      validationEle.textContent = `${this._isMultiple ? this.heading : this._slottedLabel?.textContent} ${this.validationMessage}`;
    } else {
      slottedInput?.removeAttribute('aria-errormessage');
      slottedInput?.removeAttribute('aria-invalid');
      validationEle.textContent = '';
    }
  }

  _onChange(changeEvent) {
    this._pristine = false;
    changeEvent.stopPropagation();
    let value = this._processFormChangeValue(this._slottedValue);
    if (ifDefined(this.mask)) {
      value = this._processMaskChangeValue(value);
    }
    if (value !== this.value) {
      this.value = value;
      this._fireChangeEvent();
    }
    if (this.validation) {
      this.validate();
    }
  }

  _onBlur(blurEvent) {
    this._pristine = false;
    super._onBlur(blurEvent);
    if (this.validation) {
      this.validate();
    }
  }

  _onInput(inputEvent) {
    this._pristine = false;
    inputEvent.stopPropagation();
    let value = this._slottedValue;
    if (ifDefined(this.mask)) {
      value = this._processMaskInputValue(value);
    }

    if (this.mask || this.validation) {
      if (value !== this.value) {
        this.value = value;
        this._fireChangeEvent();
      }
    }
    if (this.validation) {
      this.validate();
    }
  }

  get _addValidationIcon() {
    return html`
      <inputter-icon name="${INPUTTER_VALIDATION_WARNING_ICON}" class="icon"></inputter-icon>
    `;
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
  get _addHelper() {
    if (this.helper) {
      if (this.__isTipDetailAvailable) {
        return html`
          <inputter-detail ?open="${this.isHelperOpen}" id=${this._helperId}>
            <div slot="heading">${this.helper}</div>
            <slot name="tip-details"></slot>
          </inputter-detail>
        `;
      } else {
        return html`
          <div class="helper" id=${this._helperId}>${this.helper}</div>
        `;
      }
    }

    return undefined;
  }

  get _inputTypeIcon() {
    if (this._isSelect) {
      return INPUTTER_FIELD_SELECT_ICON;
    } else if (this._inputType === this._inputTypes.SEARCH) {
      return INPUTTER_FIELD_SEARCH_ICON;
    } else if (this._inputType === this._inputTypes.DATE) {
      return INPUTTER_FIELD_DATE_ICON;
    }

    return undefined;
  }

  get _addInputTypeIcon() {
    const icon = this._inputTypeIcon;
    return icon ? html`<inputter-icon name="${icon}"></inputter-icon>` : undefined;
  }

  get _hasDisabled() {
    if (INPUTTER_CONFIG_DISABLED) {
      for (let i = 0; i < this._slottedInputs?.length; i++) {
        if (this._slottedInputs[i].disabled) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Getter method to construct template for type `standard`.
   * @protected
   * @returns {object} TemplateResult - Template to render.
   */
  get standardTemplate() {
    return html`
      <div class="${classMap(this.classes)}" style="${styleMap(this.inlineStyles)}" aria-describedby=${ifDefined(this.helper && !this.__isTipDetailAvailable ? this._helperId : undefined)}
        aria-details=${ifDefined(this.helper && this.__isTipDetailAvailable ? this._helperId : undefined)}>
        ${this._isMultiple ? this._addHeading : this._addLabel}
        ${this._addHelper}
        <div class="wrapper">
          ${super.standardTemplate}
          ${this._addMask}
          ${this._addInputTypeIcon}
        </div>
      </div>
      ${this._addValidationMessage}
    `;
  }
}

/**
 * InputterDetail component to handle helper text.
 *
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
    this._toggleEvent = 'helper-toggle';
  }
}
