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

  static get styles() {
    return styles;
  }

  /**
   * Getter method to construct classes object.
   * @protected
   * @returns {object} - Classes object to be included in the template.
   */
  get classes() {
    return {
      card: true
    };
  }

  /**
   * Getter method to construct styles object.
   * @protected
   * @returns {object} - Styles object to be included in the template.
   */
  get inlineStyles() {
    return {};
  }

  /**
   * Getter method to construct card image template.
   * @protected
   * @returns {object} TemplateResult - Image template.
   */
  get _addImage() {
    return this.image ? html`
    <div class="media">
      <card-image src=${this.image} alt=${this.alt} ?background=${this.background}></card-image>
    </div>` : undefined;
  }

  /**
   * Getter method to construct template for type `standard`.
   * @protected
   * @returns {object} TemplateResult - Template to render.
   */
  get standardTemplate() {
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
}
