import { html, dedupeMixin, ScopedElementsMixin } from '@muons/library';
import { Image } from '@muons/library/components/image';

export const ImageHolderMixin = dedupeMixin((superClass) =>
  class ImageHolderdMixinClass extends ScopedElementsMixin(superClass) {

    static get properties() {
      return {
        image: {
          type: String,
          attribute: true
        },
        alt: {
          type: String,
          attribute: true
        }
      };
    }

    static get scopedElements() {
      return {
        'media-image': Image
      };
    }

    _imageTemplate() {
      return this.image ? html`
      <div class="media">
        <media-image src=${this.image} alt=${this.alt}></media-image>
      </div>` : html``;
    }
  }
);
