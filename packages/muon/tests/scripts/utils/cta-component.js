import { MuonElement } from '@muonic/muon';

/**
 * A Nucleus call-to-action allows users to take action once they are ready for it.
 *
 * @element cta
 * @prefix mnx
 *
 */

export class TestCta extends MuonElement {
  static get properties() {
    return {
      enabled: { type: Boolean }
    };
  }
}
