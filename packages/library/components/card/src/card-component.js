import { MuonElement, html, ScopedElementsMixin } from '@muons/library';
import { CardMixin } from '@muons/mixins/card-mixin';
import { ImageHolderMixin } from '@muons/mixins/image-holder-mixin';
import { Image } from '@muons/components/image';
import styles from './card-styles.css';

/**
 * @element card
 */
export class Card extends ScopedElementsMixin(ImageHolderMixin(CardMixin(MuonElement))) {

  static get scopedElements() {
    return {
      'card-image': Image
    };
  }

  get _addImage() {
    return this.image ? html`
    <div class="media">
      <card-image src=${this.image} alt=${this.alt} ?background=${this.background}></card-image>
    </div>` : html``;
  }

  get standardTemplate() {
    return html`
      <div class="card">
        ${this._addImage}
        <div class="body">
          ${this._addHeader}
          ${this._addContent}
          ${this._addFooter}
        </div>
      </div>
    `;
  }

  static get styles() {
    return styles;
  }
}
