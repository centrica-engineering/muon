import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class OrderConfiguratorPickOccasionRoute extends Route {
  @service order;

  model() {
    return {
      occasions: [
        'Birthday',
        'Wedding',
        'Funeral',
        'Anniversary',
        'Other (please specify)',
      ],
      selectedOccasion: this.order.order.cake.occasion
    };
  }
}
