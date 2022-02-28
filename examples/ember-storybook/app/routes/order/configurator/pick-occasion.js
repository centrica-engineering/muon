import Route from '@ember/routing/route';

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
}
