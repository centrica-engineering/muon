import { html, dedupeMixin } from '@muons/library';

export const CardMixin = dedupeMixin((superClass) =>
  class CardMixinClass extends superClass {

    _headerTemplate() {
      return html`
        <div class="heading">
          <slot name="header"></slot>
        </div>`;
    }

    _footerTemplate() {
      return html`
        <div class="action">
          <slot name="action"></slot>
        </div>`;
    }

    _contentTemplate() {
      return html`
        <div class="content">
          <slot></slot>
        </div>`;
    }
  }
);
