import { MuonElement, html, styleMap, classMap } from '@muonic/muon';
import { imageInlineLoader, imageBackgroundLoader } from '@muon/directives/image-loader';
import {
  IMAGE_CONFIG_TYPE,
  IMAGE_CONFIG_RATIOS,
  IMAGE_CONFIG_RATIO,
  IMAGE_CONFIG_PLACEHOLDER
} from '@muon/tokens';

import styles from './image-styles.css';

/**.
 * Loading images with default lazy loading
 *
 * @element image
 */

export class Image extends MuonElement {

  static get properties() {
    return {
      background: { type: Boolean },
      backgroundsize: { type: String, attribute: 'background-size' },
      src: { type: String },
      alt: { type: String },
      ratio: { type: String },
      placeholder: { type: String },
      loading: { type: String },
      _ratios: { type: Array, state: true }
    };
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();

    this.type = IMAGE_CONFIG_TYPE;
    this.background = false;
    this.backgroundsize = 'cover'; // cover, contain
    this.alt = '';
    this.ratio = IMAGE_CONFIG_RATIO;
    this.placeholder = IMAGE_CONFIG_PLACEHOLDER;
    this.loading = 'lazy'; // eager|lazy
    this._ratios = IMAGE_CONFIG_RATIOS;

  }

  get placeholderImage() {
    return this.placeholder.replace('(src)', this.src); // @TODO: test alternative ways for this
  }

  get standardTemplate() {
    const isBackground = this.background;

    if (!this._ratios.includes(this.ratio)) {
      this.ratio = IMAGE_CONFIG_RATIO; // @TODO: add fallback `|| this._ratios[0]`
    }

    if (isBackground) {
      this.ratio = this.ratio?.length > 0 ? this.ratio : '16 / 9'; // without a default size background images won't show
    }

    const [x, y] = this.ratio.split(' / ');
    const styles = {
      '--image-ratio': CSS?.supports('aspect-ratio', '1 / 1') && this.ratio ? this.ratio : undefined,
      '--image-padding': CSS?.supports('aspect-ratio', '1 / 1') || !x && !y ? undefined : `${y / x * 100}%`,
      '--background-size': isBackground ? this.backgroundsize : undefined
    };

    const classes = {
      image: true,
      'no-ratio': !this.ratio || this.ratio?.length < 1,
      'is-background': isBackground
    };

    if (this.src && this.src.length > 0) {
      const imageObj = {
        src: this.src,
        alt: this.alt,
        placeholder: this.placeholderImage,
        loading: this.loading
      };

      return html`
        <div class=${classMap(classes)} style=${styleMap(styles)}>
          ${isBackground ? imageBackgroundLoader(imageObj) : imageInlineLoader(imageObj)}
        </div>
      `;
    } else {
      return html`<div class="image"></div>`;
    }
  }
}
