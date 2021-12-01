import { AsyncDirective, directive, html, until, styleMap, ifDefined } from '@muon/library';
export class ImageLoaderDirective extends AsyncDirective {
  constructor(partInfo) {
    super(partInfo);

    this.src = '';
    this.alt = '';
    this.placeholder = '';
    this.loading = '';
    this.image = undefined;
  }

  async fetchImage() {
    return new Promise((resolve, reject) => {
      this.image = new Image();

      this.image.src = this.src;
      this.image.alt = this.alt;
      this.image.classList.add('blur-out', 'image-lazy');
      this.image.onload = () => resolve(this.image);
      this.image.onerror = () => reject();
    });
  }

  observer(parts, attributes) {
    return new Promise((resolve) => {
      const options = {
        threshold: 0.01,
        rootMargin: '150px'
      };

      const io = new IntersectionObserver((entries) => {
        /* eslint-disable consistent-return */
        return entries.forEach((entry) => {
          if (!this.image && entry.intersectionRatio > 0) {
            return resolve(this.render(attributes[0]));
          }
        });
      }, options);

      const observe = parts.parentNode;
      io.observe(observe);
    });
  }

  update(parts, attributes) {
    if (attributes?.[0]?.loading === 'lazy') {
      return html`${until(this.observer(parts, attributes), undefined)}`;
    }

    return this.render(attributes[0]);
  }
}

export class ImageInlineLoaderDirective extends ImageLoaderDirective {
  render({ src, alt, placeholder, loading = 'lazy' }) {
    const loadingAttribute = window.chrome ? loading : undefined;

    this.src = src;
    this.alt = alt;
    this.placeholder = placeholder;
    this.loading = loading;

    if (this.placeholder) {
      this.setValue(html`<img class="image-lazy blur" loading="${ifDefined(loadingAttribute)}" src="${this.placeholder}" alt="" />`);
    }

    Promise.resolve(this.fetchImage()).then((image) => {
      if (image) {
        dispatchEvent(new CustomEvent('image-loaded', { bubbles: true }));
        this.setValue(image);
      }
    }).catch(() => {
      console.error(`Image (${this.src}) failed to load`);
    });

    return undefined;
  }
}

export class ImageBackgroundLoaderDirective extends ImageLoaderDirective {
  render({ src, alt, placeholder, loading = 'lazy' }) {
    this.src = src;
    this.alt = alt;
    this.placeholder = placeholder;
    this.loading = loading;

    const styles = {
      '--background-image': `url("${this.placeholder}")`
    };

    if (this.placeholder) {
      this.setValue(html`<div style=${styleMap(styles)} class="image-holder blur"></div>`);
    }

    Promise.resolve(this.fetchImage()).then((image) => {
      if (image) {
        const styles = {
          '--background-image': `url("${this.src}")`
        };

        dispatchEvent(new CustomEvent('image-loaded'));
        this.setValue(html`<div style=${styleMap(styles)} class="image-holder blur-out"></div>`);
      }
    }).catch(() => {
      console.error(`Image (${this.src}) failed to load`);
    });

    return undefined;
  }
}

export const imageInlineLoader = directive(ImageInlineLoaderDirective);
export const imageBackgroundLoader = directive(ImageBackgroundLoaderDirective);
