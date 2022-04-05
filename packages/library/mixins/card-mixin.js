import { html, dedupeMixin } from '@muons/library';

export const CardMixin = dedupeMixin((superClass) =>
  class CardMixinClass extends superClass {

    get _addHeader() {
      return html`
        <div class="header">
          <slot name="header"></slot>
        </div>`;
    }

    get _addContent() {
      return html`
        <div class="content">
          <slot></slot>
        </div>`;
    }

    get _addFooter() {
      return html`
        <div class="footer">
          <slot name="footer"></slot>
        </div>`;
    }
  }
);
