export class MaskSeparatorController {

  constructor(host) {
    this.host = host;
    this.mask = host.mask;
    this.separator = host.separator;
  }

  updateMaskValue(value) {
    const length = value.length;
    let str = new Array(length + 1).join(' ');
    str += this.mask.slice(length);
    return str;
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
