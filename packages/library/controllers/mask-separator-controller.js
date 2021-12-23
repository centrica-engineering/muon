import { ifDefined } from '@muons/library';
export class MaskSeparatorController {

  constructor(host, input) {
    this.host = host;
    this.mask = host.mask;
    this.separator = host.separator;
    this.input = input;
  }

  hostConnected() {
    this.input.addEventListener('input', this.__onInput.bind(this));
    this.input.setAttribute('maxlength', this.mask.length);
  }

  /**
   * A method to handle `input` event when `mask` is provided.
   * @param {Event} inputEvent - event while 'input.
   * @returns {undefined}
   */
  __onInput(inputEvent) {
    inputEvent.stopPropagation();
    inputEvent.preventDefault();
    if (ifDefined(this.separator)) {
      this.updateValue();
    } else {
      this.host.value = this.input.value;
    }
  }

  updateValue() {
    let value = this.input.value;
    let cursor = this.input.selectionStart;
    const diff = this.host.value.length - value.length;

    if (diff > 0 && this.mask.charAt(cursor) === this.separator) {
      value = value.slice(0, cursor - 1) + (cursor < value.length ? value.slice(cursor) : '');
      cursor -= 1;
    }
    const formattedValue = this.formatWithMaskAndSeparator(value);
    this.input.value = formattedValue;
    this.host.value = formattedValue;

    if (this.mask.charAt(cursor) === this.separator) {
      cursor += 1;
    }
    this.host.updateComplete.then(() => {
      this.input.setSelectionRange(cursor, cursor);
    });
  }

  formatWithMaskAndSeparator(value) {
    const formattedValue = this.__formatInputWithoutSeparator(value);
    const parts = this.mask.split(this.separator);
    let processedValue = '';
    let length = 0;
    let partsLength = 0;
    for (let i = 0; i < parts.length && length < formattedValue.length; i++) {
      partsLength += parts[i].length;
      const remainingLength = formattedValue.length - length;
      processedValue += formattedValue.substr(
        length, remainingLength > parts[i].length ? parts[i].length : remainingLength);
      length += parts[i].length;
      if (i < (parts.length - 1) && processedValue.length === partsLength) {
        processedValue += this.separator;
        partsLength += 1;
      }
    }
    return processedValue;
  }

  __formatInputWithoutSeparator(value) {
    return value.split(this.separator).join('');
  }
}
