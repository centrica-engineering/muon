import { html } from '@muons/library';

export const CardMixin = (superClass) =>
  class CardMixinClass extends superClass {

    _headerTemplate() {
      return html`
        <div class="heading">
          <slot name="heading"></slot>
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
          <slot name="content"></slot>
        </div>`;
    }
  };
