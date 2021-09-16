import { css, html, unsafeCSS, classMap } from '@muon/library';
import { SVGLoader } from './svg-loader';
import {
  ICON_TYPE
} from '@muon/library/build/tokens/es6/muon-tokens';

import styles from './styles.css';

/**
 * A call-to-action allows users to take action once they are ready for it.
 *
 * @element icon
 *
 */

export class Icon extends SVGLoader {

  static get properties() {
    return {
      size: { type: Number },
      svg: { type: String, attribute: false }
    };
  }

  static get styles() {
    return css`${unsafeCSS(styles)}`;
  }

  constructor() {
    super();

    this.type = ICON_TYPE;
  }

  firstUpdated() {
    this.addObserver('solid');
  }

  get standardTemplate() {
    const classes = {
      icon: true,
      [this.type]: true
    };

    return html`
      <style>
        :host {
          --icon-size: ${this.iconSize};
        }
      </style>
      <div class=${classMap(classes)}>
        ${this.svg}
      </div>
    `;
  }
}
