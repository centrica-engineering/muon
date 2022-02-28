import Route from '@ember/routing/route';

export default class OrderConfiguratorPickShapeRoute extends Route {
  model() {
    return {
      shapes: ['Round', 'Square', 'Triangle'],
      cake: this.modelFor('order/configurator').cake,
    };
  }
}
