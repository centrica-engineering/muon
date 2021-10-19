import { AsyncDirective, directive, html, unsafeSVG, until } from '@muon/library';

export class SVGLoaderDirective extends AsyncDirective {
  constructor(partInfo) {
    super(partInfo);
    this.name = '';
    this.category = '';
    this.path = '';
  }

  url(path = this.path) {
    return path.replace('(name)', this.name).replace('(category)', this.category);
  }

  async fetchSVG() {
    const url = this.url();
    let response;
    let cache = undefined;
    let cacheAvailable = false;

    try {
      cacheAvailable = 'caches' in self;
      cache = cacheAvailable && await caches?.open('muon');
      const cacheData = await cache.match(url);

      response = cache && cacheData ? cacheData : undefined;
    } catch (error) {
      console.info('cache not available');
      console.info(error);
    }

    if (!response) {
      response = await window.fetch(url);

      response = new Response(response.body, response);
      response.headers.append('Cache-Control', 'max-age=100000');

      if (cache && response.body) {
        cache.put(url, response.clone())
          .catch((error) => {
            console.error(error);
          });
      }
    }

    return await response.text().then((text) => {
      if (response.status === 200) {
        return html`${unsafeSVG(text)}`;
      }

      return html``;
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
          if (entry.intersectionRatio > 0) {
            return resolve(this.render(attributes));
          }
        });
      }, options);

      const observe = parts.parentNode;
      io.observe(observe);
    });
  }

  update(parts, attributes) {
    return html`${until(this.observer(parts, attributes), undefined)}`;
  }

  render([{ name, category, path }]) {
    this.path = path;
    this.name = name;
    this.category = category;

    Promise.resolve(this.fetchSVG()).then((svg) => {
      dispatchEvent(new CustomEvent('svg-loaded'));
      this.setValue(svg);
    });

    return undefined;
  }
}

export const svgLoader = directive(SVGLoaderDirective);
