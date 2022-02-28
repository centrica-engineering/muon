import Route from '@ember/routing/route';

export default class OrderConfiguratorPickColourRoute extends Route {
  model() {
    return {
      colours: ['Black', 'Purple', 'Pink', 'Blue', 'Green', 'Brown'],
      cake: this.modelFor('order/configurator').cake,
    };
  }
}
