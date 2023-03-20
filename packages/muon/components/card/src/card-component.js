import { MuonElement, classMap, styleMap, html, ScopedElementsMixin } from '@muonic/muon';
import { CardMixin } from '@muon/mixins/card-mixin';
import { ImageHolderMixin } from '@muon/mixins/image-holder-mixin';
import { Image } from '@muon/components/image';
import styles from './card-styles.css';

/**
 * A card is a container for content.
 *
 * @element card
 */
export class Card extends ScopedElementsMixin(ImageHolderMixin(CardMixin(MuonElement))) {

  static get scopedElements() {
    return {
      'card-image': Image
    };
  }

  get classes() {
    return {
      card: true
    };
  }

  get inlineStyles() {
    return {};
  }

  get _addImage() {
    return this.image ? html`
    <div class="media">
      <card-image src=${this.image} alt=${this.alt} ?background=${this.background}></card-image>
    </div>` : undefined;
  }

  get standardTemplate() {
    console.log(styles);
    return html`
      <div class="${classMap(this.classes)}" style="${styleMap(this.inlineStyles)}">
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
