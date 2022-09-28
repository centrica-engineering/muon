import { Card } from '@muonic/muon/components/card';

/**
 * A fancier version of the card.
 *
 * @element card
 *
 */

export class FancyCard extends Card {

  static get properties() {
    return {
      fancy: { type: Boolean }
    };
  }

  get coolBean() {
    return 'cool beans';
  }

  something() {
    return 'doing something';
  }

}
