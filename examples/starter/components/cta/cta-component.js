import { css, unsafeCSS } from '@muons/library';
import { Cta } from '@muons/library/components/cta';
import styles from './styles.css';

/**
 * A Nucleus call-to-action allows users to take action once they are ready for it.
 *
 * @element cta
 *
 */

export class TestCta extends Cta {
  static get properties() {
    return {
      disabled: undefined
    };
  }

  static get styles() {
    return [
      super.styles,
      css`${unsafeCSS(styles)}`
    ]
  }

  get textTemplate() {
    this._iconPosition = 'start';

    return this.standardTemplate;
  }
}
