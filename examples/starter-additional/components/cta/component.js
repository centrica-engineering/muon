import { html } from '@muonic/muon';
import { Cta } from '@muonic/muon/components/cta';
import styles from './styles.css';

/**
 * A fancier version of the cta
 *
 * @element fancy-cta
 *
 */

export class FancyCta extends Cta {

  static get properties() {
    return {
      fancy: { type: Boolean }
    };
  }

  static get styles() {
    return [
      super.styles,
      styles
    ];
  }
  /** @protected */
  get coolBean() {
    return 'cool beans';
  }

  something() {
    return 'doing something';
  }

}
