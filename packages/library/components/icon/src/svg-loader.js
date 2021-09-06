import { LitElement, html, unsafeSVG } from '@muon/library';
import {
  ICON_NAME,
  ICON_SIZES,
  ICON_PREFIX_URL
} from '@muon/library/build/tokens/es6/muon-tokens';

export class SVGLoader extends LitElement {

  static get properties() {
    return {
      name: { type: String }
    };
  }

  constructor() {
    super();

    this.name = ICON_NAME;
    this.allSizes = ICON_SIZES;
    this.svg = '';
  }

  sizes(size) {
    size -= 1;
    return this.allSizes[size] || '100%';
  }

  camelCase(string) {
    return string.replace(/-([a-z])/g, (g) => {
      return g[1].toUpperCase();
    });
  }

  async fetchSVG(type) {
    const prefixUrl = ICON_PREFIX_URL;
    const url = `${prefixUrl}${type}/${this.name}.svg`;
    const cacheAvailable = 'caches' in self;
    const cache = cacheAvailable && await caches.open('muon');
    let response = cache && await cache.match(url);

    if (!response) {
      response = await window.fetch(url);

      response = new Response(response.body, response);
      response.headers.append('Cache-Control', 'max-age=100000');

      if (cacheAvailable) {
        cache.put(url, response.clone())
          .catch((error) => {
            console.error(error);
          });
      }
    }

    this.svg = await response.text().then((text) => {
      if (response.status === 200) {
        return html`${unsafeSVG(text)}`;
      }

      return html``;
    });
  }

  addObserver(type) {
    const options = {
      threshold: 0.01,
      rootMargin: '150px'
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          if (!this.svg) {
            this.fetchSVG(type);
          }
        }
      });
    }, options);
    const observe = this.parentElement || this;
    io.observe(observe);
  }

  get iconSize() {
    const computedSize = this.sizes(this.size);
    const size = computedSize === '100%' ? computedSize : `${computedSize}px`;

    return size;
  }

  /*
    @TODO: add all the custom events and lifecycle hooks
  */

  updated() {
    this.setAttribute('aria-hidden', 'true');
  }

}
