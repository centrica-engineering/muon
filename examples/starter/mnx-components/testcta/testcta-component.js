import { Cta } from '@muon/components/cta';

/**
 * A Nucleus call-to-action allows users to take action once they are ready for it.
 *
 * @element testcta
 * @prefix mnx
 *
 */

export class MnxTestCta extends Cta {
  static get properties() {
    return {
      enabled: { type: Boolean }
    };
  }

  get textTemplate() {
    this._iconPosition = 'start';

    return this.standardTemplate;
  }
}
