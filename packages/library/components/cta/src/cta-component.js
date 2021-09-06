import { LitElement, css, html, unsafeCSS, classMap, ScopedElementsMixin, literal, staticHTML } from '@muon/library';
import { Icon } from '@muon/library/components/icon';
import {
  CTA_TYPE,
  CTA_LOADING_MESSAGE,
  CTA_LOADING_ICON,
  CTA_ICON
} from '@muon/library/build/tokens/es6/muon-tokens';
import styles from './styles.css';

/**
 * A call-to-action allows users to take action once they are ready for it.
 *
 * @element cta
 *
 */

export class Cta extends ScopedElementsMixin(LitElement) {

  static get scopedElements() {
    return {
      'cta-icon': Icon
    };
  }

  static get properties() {
    return {
      type: { type: String },
      loading: { type: Boolean },
      loadingMessage: { type: String },
      icon: { type: String },
      href: { type: String },
      _iconPosition: { type: String, state: true },
      _isButton: { type: Boolean, state: true },
      _tag: { type: String, state: true }
    };
  }

  static get styles() {
    return css`${unsafeCSS(styles)}`;
  }

  constructor() {
    super();
    this.type = CTA_TYPE;
    this.loadingMessage = CTA_LOADING_MESSAGE;
    this.name = CTA_ICON;
    this.loading = false;
  }

  /**
    * @private
    * @description adds icon html
    * @returns {HTMLElement} icon html
  */
  get __addIcon() {
    let icon = this.loading ? CTA_LOADING_ICON : this.name;

    if (this.type === 'text' && !icon) {
      icon = CTA_ICON;
    }

    if (!icon) {
      return undefined;
    }

    if (this.loading) {
      icon = CTA_LOADING_ICON;
    }

    return html`
      <cta-icon class="icon" name="${icon}"></cta-icon>
    `;
  }

  /**
    * @private
    * @param {string} content text content or slot element
    * @returns {HTMLElement} cta shadow html
  */
  __wrapperElement(content) {
    const parentName = this.parentElement?.nodeName;
    const isInLink = parentName === 'A';
    const isInNativeForm = parentName === 'FORM';
    const tabIndex = isInLink ? -1 : 0;
    let element = this.href?.length > 0 ? 'a' : 'div';

    if (
      element !== 'a' &&
      !isInNativeForm &&
      !isInLink &&
      !this._isButton
    ) {
      if (!this.getAttribute('role')) {
        this.setAttribute('role', 'button');
      }

      if (!this.getAttribute('tabindex')) {
        this.setAttribute('tabindex', '0');
      }
    }

    if (isInNativeForm || this._isButton) {
      element = 'button';
      this.removeAttribute('role'); // isButton might be called after the first render of the cta
      this.removeAttribute('tabindex');
    }

    const classes = {
      cta: true,
      animated: true,
      [this.type]: true
    };

    // eslint-disable-next-line no-nested-ternary
    const elementTag = element === 'button' ? literal`button` : element === 'a' ? literal`a` : literal`div`;

    return staticHTML`
      <${elementTag} .href=${element === 'a' && this.href} ?disabled=${element === 'button' && this.loading} tabindex="${tabIndex}" aria-label="${this.textContent}" class=${classMap(classes)}>
        ${content}
      </${elementTag}>
    `;
  }

  get directTemplate() {
    this._iconPosition = 'end';

    return this.standardTemplate;
  }

  get textTemplate() {
    this._iconPosition = 'start';

    return this.standardTemplate;
  }

  get standardTemplate() {
    const isLoading = this.loading;
    const iconAdd = this.__addIcon;
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
      ${this.__wrapperElement(internal)}
    `;
  }

  render() {
    return html`${this[`${this.type}Template`]}`;
  }
}
