import { MuonElement, html } from '@muons/library';
import { CardMixin } from '@muons/library/mixins/card-mixin';
import { ImageHolderMixin } from '@muons/library/mixins/image-holder-mixin';

/**
 * @element card
 */
export class Card extends ImageHolderMixin(CardMixin(MuonElement)) {

  constructor() {
    super();
  }

  get standardTemplate() {
    return html`
      ${this._imageTemplate()}
      ${this._headerTemplate()}
      ${this._contentTemplate()}
      ${this._footerTemplate()}
    `;
  }

  get flatTemplate() {
    return html`
      ${this._headerTemplate()}
      ${this._contentTemplate()}
      ${this._footerTemplate()}
  `;
  }

  get supportTemplate() {
    return html`${this.standardTemplate}`;
  }
}
