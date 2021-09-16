import { MuonElement, css, html, unsafeCSS } from '@muon/library';
import {
  IMAGE_TYPE
} from '@muon/library/build/tokens/es6/muon-tokens';

import styles from './styles.css';

/**
 * Lazy loading images
 *
 * @element image
 *
 */

export class Image extends MuonElement {

  static get properties() {
    return {
      background: { type: Boolean },
      backgroundsize: { type: String },
      src: { type: String, reflect: true },
      alt: { type: String },
      ratio: { type: String } // 1x1, 4x3, 16x9:
    };
  }

  static get styles() {
    return css`${unsafeCSS(styles)}`;
  }

  constructor() {
    super();

    this.type = IMAGE_TYPE;
    this.background = false;
    this.backgroundsize = 'cover'; // cover, contain
    this.ratio = '';
  }

  backgroundStyles() {
    const preImg = `${this.src}.thumb.48.48.png`;

    return html`
    <style>
    :host .image .image-holder {
      background-image: url(${preImg});
      background-size: ${this.backgroundsize};
    }
    </style>
    `;
  }

  updated() {
    const src = this.src;

    if (src) {
      const options = {
        threshold: 0.01,
        rootMargin: '150px'
      };

      const fetchImage = (url) => {
        return new Promise((resolve, reject) => {
          const image = new Image();

          image.src = url;
          image.onload = resolve;
          image.onerror = reject;

          return resolve();
        });
      };

      const elementView = (target, image) => {
        target.style.backgroundImage = `url(${image})`;
        target.style.backgroundSize = `${this.backgroundsize}`;
      };

      const imgView = (target, image) => {
        target.src = image;
        target.alt = this.alt || '';
      };

      const switchImage = (target, image, io) => {
        if (this.background) {
          elementView(target, image);
        } else {
          imgView(target, image);
        }

        const blurElem = this.shadowRoot.querySelector('.blur');

        if (io && target) {
          io.unobserve(target); // only unobserve after the image has loaded
        }

        if (blurElem) {
          blurElem.classList.remove('blur');
        }
      };

      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            const target = entry.target;

            fetchImage(src).then(() => {
              switchImage(target, src, io);
            }).catch(() => {
              fetchImage(src).then(() => {
                switchImage(target, src, io);
              }).catch((e) => {
                console.info(e); // to stop headless builds from breaking
              });
            });
          }
        });
      }, options);

      const targetElements = this.shadowRoot.querySelectorAll('.image-lazy, .image-holder');
      for (const element of targetElements) {
        io.observe(element);
      }
    }
  }

  get standardTemplate() {
    const isBackground = this.background;
    let ratioClass = 'no-ratio';

    if (isBackground) {
      ratioClass = 'ar16x9'; // without a default size background images won't show
    }

    if (this.ratio.length !== 0) {
      ratioClass = `ar${this.ratio}`;
    }

    if (this.src && this.src.length > 0) {
      const preImg = `${this.src}.thumb.48.48.png`;
      const lazyLoading = window.chrome ? `loading="lazy"` : ``;

      return html`
        ${isBackground ? this.backgroundStyles() : ''}
        <div class="image blur ${ratioClass}">
          ${isBackground ? html`<div class="image-holder"></div>` : html`<img class="image-lazy" ${lazyLoading} src="${preImg}" alt="" />`}
        </div>
      `;
    } else {
      return html`<div class="image ${ratioClass}"></div>`;
    }
  }
}
