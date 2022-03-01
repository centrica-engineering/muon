import Route from '@ember/routing/route';
import { set, action } from '@ember/object';

export default class OrderConfiguratorPickOccasionRoute extends Route {
  model() {
    return {
      occasions: [
        'Birthday',
        'Wedding',
        'Funeral',
        'Anniversary',
        'Other (please specify)',
      ],
      cake: this.modelFor('order/configurator').cake,
    };
  }

  @action
  updateOccasion(event) {
    set(this.model().cake, 'occasion', event.detail.value);
  }
}
