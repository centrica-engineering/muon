import { MuonElement, html, classMap } from '@muonic/muon';
import styles from './progress-styles.css';

/**
 * @element progress
 * @prefix mnx
 */
export class Progress extends MuonElement {

  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      current: { type: Number },
      steps: { type: Number }
    };
  }

  constructor() {
    super();

    this.current = 1;
    this.steps = 5;
  }

  *_stepsHTML() {
    const keyframeOptions = {
      duration: 1000,
      fill: 'both',
    };

    const stepsTemplate = [];
    for (let i = 0; i < this.steps; i++) {
      const classes = {
        line: true,
        progress: i < this.current,
        current: (i === this.current - 1),
      };
      yield html`<div class=${classMap(classes)}></div>`;
    }
  }

  firstUpdated() {
    super.firstUpdated();
    console.log('first updated');
  }

  get standardTemplate() {
    return html`
    <p>
      <button @click=${() => this.current = this.current + 1}>Toggle</button>
    </p>
      <div class="linear-line" aria-hidden="true">
        ${this._stepsHTML()}
      </div>
    `;
  }
}
