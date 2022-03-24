import { dedupeMixin } from '@muons/library';

export const ImageHolderMixin = dedupeMixin((superClass) =>
  class ImageHolderdMixinClass extends superClass {

    static get properties() {
      return {
        image: {
          type: String
        },
        alt: {
          type: String
        },
        background: {
          type: Boolean
        }
      };
    }
  }
);
