import { LitElement, css, html, unsafeCSS, classMap } from '@muon/library';
import { 
  CTA_TYPE,
  CTA_LOADING_MESSAGE,
  CTA_LOADING_ICON,
  CTA_ICON
} from '@muon/library/build/tokens/es6/ns-tokens';
import styles from './styles.css';

/**
 * A call-to-action allows users to take action once they are ready for it.
 *
 * @element cta
 * 
 */

export class Cta extends LitElement {

  static get properties() {
    return {
      type: { type: String }, // primary, secondary, tertiary, text
      loading: { type: Boolean }, // true, false
      loadingMessage: { type: String }, // Loading...
      icon: { type: String }, // arrow-end
      href: { type: String }, // https://britishgas.co.uk
    };
  }

  static get styles() {
    return css`${unsafeCSS(styles)}`;
  }

  constructor() {
    super();
    this.type = CTA_TYPE;
    this.loadingMessage = CTA_LOADING_MESSAGE;
    this.icon = CTA_ICON;
    this.loading = false;
  }

  /**
  * @private
  */
  __addIcon(icon, position) {
    if (this.type === 'text' && !icon) {
      icon = CTA_ICON;
    }

    if (!icon) {
      return '';
    }

    return html`
    <span class="icon icon-${position}">
      <ns-icon type="${icon}"></ns-icon>
    </span>
    `;
  }

  /**
    * @private
    */
  __wrapperElement(content) {
    const isInLink = this.parentElement && this.parentElement.nodeName === 'A';
    const tabIndex = isInLink ? -1 : 0;

    let element = 'button';

    if (this.href && this.href.length > 0 && this.href !== 'undefined') {
      element = 'a';
    } else if (!this.cta) {
      element = 'button';
    }

    const classes = {
      "int-cta": true,
      "animated": true,
      [this.type]: true
    };

    if (element === 'button') {
      return html`
        <button ?disabled=${this.loading} tabindex="${tabIndex}" aria-label="${this.textContent}" class=${classMap(classes)}>
          ${content}
        </button>
      `;
    } else {
      return html`
        <a .href=${this.href} tabindex="${tabIndex}" aria-label="${this.textContent}" class=${classMap(classes)}>
          ${content}
        </a>
      `;
    }
  }

  render() {
    const isLoading = this.loading;
    const icon = isLoading ? CTA_LOADING_ICON : this.icon;
    const iconPosition = this.type === 'text' ? 'start' : 'end';
    const iconEnd = iconPosition === 'end' ? this.__addIcon(icon, 'end') : '';
    const iconStart = iconPosition === 'start' ? this.__addIcon(icon, 'start') : '';

    if (isLoading) {
      this.setAttribute('disabled', 'true');
    } else {
      this.removeAttribute('disabled');
    }

    return html`
      ${isLoading ? html`<span role="alert" aria-live="assertive" class="sr-only">${this.loadingMessage}</span>` : ``}
      ${this.__wrapperElement(
        html`<span class="cta">
            ${iconStart}
            <span class="label-holder">
              ${this.loading ? this.loadingMessage : html`<slot></slot>`}
            </span>
            ${iconEnd}
          </span>`
      )}
    `;
  }

}