import { html, dedupeMixin } from '@muons/library';

export const CardMixin = dedupeMixin((superClass) =>
  class CardMixinClass extends superClass {

    get _headerTemplate() {
      return html`
        <div class="header">
          <slot name="header"></slot>
        </div>`;
    }

    get _contentTemplate() {
      return html`
        <div class="content">
          <slot></slot>
        </div>`;
    }

    get _footerTemplate() {
      return html`
        <div class="footer">
          <slot name="footer"></slot>
        </div>`;
    }
  }
);
