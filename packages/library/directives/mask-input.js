import { Directive, directive, html } from '@muons/library';

class MaskInputDirective extends Directive {

  constructor(partInfo) {
    super(partInfo);
  }

  render(mask, separator, value) {
    let length = value ? value.length : 0;
    let updatedMask = new Array(length + 1).join(' ');
    if (separator && mask.charAt(length) === separator) {
      updatedMask += ' ';
      length += 1;
    }
    updatedMask += mask.slice(length);
    return html`<div aria-hidden="true" class="input-mask">${updatedMask}</div>`;
  }

}

export const maskInput = directive(MaskInputDirective);
