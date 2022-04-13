import { MuonElement, html, classMap, ScopedElementsMixin, literal, staticHTML, ifDefined } from '@muons/library';
import { Icon } from '@muons/library/components/icon';
import {
  CTA_TYPE,
  CTA_LOADING_MESSAGE,
  CTA_LOADING_ICON_NAME,
  CTA_ICON_NAME,
  CTA_ICON_POSITION
} from '@muons/library/build/tokens/es6/muon-tokens';
import styles from './cta-styles.css';

/**
 * A call-to-action allows users to take action once they are ready for it.
 *
 * @element cta
 */

export class Cta extends ScopedElementsMixin(MuonElement) {

  static get scopedElements() {
    return {
      'cta-icon': Icon
    };
  }

  static get properties() {
    return {
      loading: { type: Boolean },
      loadingMessage: { type: String, attribute: 'loading-message' },
      disabled: { type: Boolean },
      icon: { type: String },
      href: { type: String },
      _iconPosition: { type: String, state: true },
      _isButton: { type: Boolean, state: true }
    };
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();
    this.type = CTA_TYPE;
    this.loading = false;
    this.loadingMessage = CTA_LOADING_MESSAGE;
    this.disabled = false;
    this._iconPosition = CTA_ICON_POSITION;
    this.icon = CTA_ICON_NAME;
  }

  /**
   * Adds icon html.
   *
   * @returns {object} TemplateResult - Icon html.
   * @protected
   */
  get _addIcon() {
    let icon = this.loading ? CTA_LOADING_ICON_NAME : this.icon;

    if (!icon) {
      return undefined;
    }

    if (this.loading) {
      icon = CTA_LOADING_ICON_NAME;
    }

    return html`
      <cta-icon class="icon" name="${icon}"></cta-icon>
    `;
  }

  /**
   * A method to wrap the cta content with button / a / div.
   *
   * @param {string | HTMLSlotElement} content - Text content or slot element.
   * @returns {object} TemplateResult - Cta shadow html.
   * @protected
   */
  _wrapperElement(content) {
    const parentElement = this.parentElement;
    const parentName = parentElement?.nodeName;
    const isInLink = parentName === 'A';
    const isInBtn = parentName === 'BUTTON';
    const isInNativeForm = parentName === 'FORM';
    const isDisabled = parentElement.getAttribute('disabled') || this.disabled;
    let element = this.href?.length > 0 ? 'a' : 'div';

    if (
      element !== 'a' &&
      !isInNativeForm &&
      !isInLink &&
      !isInBtn &&
      !isDisabled &&
      !this._isButton
    ) {
      if (!this.getAttribute('role')) {
        this.setAttribute('role', 'button');
      }

      if (!this.getAttribute('tabindex')) {
        this.setAttribute('tabindex', '0');
      }
    }

    if (isDisabled) {
      if (!this.getAttribute('aria-disabled')) {
        this.setAttribute('aria-disabled', 'true');
      }
    } else {
      this.removeAttribute('aria-disabled');
    }

    if (isInNativeForm || this._isButton) {
      element = 'button';
    }

    if (isInNativeForm || this._isButton || isInBtn) {
      this.removeAttribute('role'); // isButton might be called after the first render of the cta
      this.removeAttribute('tabindex');
    }

    // eslint-disable-next-line no-nested-ternary
    const tabIndex = isInLink ? -1 : element !== 'div' ? 0 : undefined;
    const classes = {
      cta: true,
      [this.type]: true,
      loading: this.loading,
      disabled: isDisabled
    };

    // eslint-disable-next-line no-nested-ternary
    const elementTag = element === 'button' ? literal`button` : element === 'a' ? literal`a` : literal`div`;

    return staticHTML`
      <${elementTag} .href=${element === 'a' && this.href} ?disabled=${element === 'button' && (this.loading || this.disabled)} tabindex="${ifDefined(tabIndex)}" aria-label="${this.textContent}" class=${classMap(classes)}>
        ${content}
      </${elementTag}>
    `;
  }

  get standardTemplate() {
    const isLoading = this.loading;
    const iconAdd = this._addIcon;
    const hasIconStart = this._iconPosition === 'start';
    const hasIconEnd = this._iconPosition === 'end';

    const internal = html`
      ${hasIconStart ? iconAdd : undefined}
      <span class="label-holder">
        ${isLoading ? this.loadingMessage : html`<slot></slot>`}
      </span>
      ${hasIconEnd ? iconAdd : undefined}
    `;

    return html`
      ${isLoading ? html`<span role="alert" aria-live="assertive" class="sr-only">${this.loadingMessage}</span>` : ``}
      ${this._wrapperElement(internal)}
    `;
  }
}
