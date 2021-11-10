import { html, LitElement } from '@muon/library';

export class MuonElement extends LitElement {

  static get properties() {
    return {
      type: { type: String }
    };
  }

  constructor() {
    super();

    this.type = 'standard';
  }

  render() {
    return html`${this[`${this.type}Template`]}`;
  }
}