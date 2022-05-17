import { Cta } from '@muonic/muon/components/cta';

/**
 * A Nucleus call-to-action allows users to take action once they are ready for it.
 *
 * @element testcta
 *
 */

export class TestCta extends Cta {
  static get properties() {
    return {
      disabled: undefined
    };
  }

  get textTemplate() {
    this._iconPosition = 'start';

    return this.standardTemplate;
  }
}
