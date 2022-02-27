import Route from '@ember/routing/route';

export default class OrderConfiguratorPickShapeRoute extends Route {
  model() {
    return this.modelFor('order/configurator');
  }
}
