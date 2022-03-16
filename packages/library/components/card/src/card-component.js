import { MuonElement, html, ScopedElementsMixin } from '@muons/library';
import { CardMixin } from '@muons/library/mixins/card-mixin';
import { ImageHolderMixin } from '@muons/library/mixins/image-holder-mixin';
import { Image } from '@muons/library/components/image';

/**
 * @element card
 */
export class Card extends ScopedElementsMixin(ImageHolderMixin(CardMixin(MuonElement))) {

  constructor() {
    super();
  }

  static get scopedElements() {
    return {
      'card-image': Image
    };
  }

  _imageTemplate() {
    return this.image ? html`
    <div class="media">
      <card-image src=${this.image} alt=${this.alt}></card-image>
    </div>` : html``;
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
