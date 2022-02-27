import Route from '@ember/routing/route';

export default class OrderConfiguratorPickColourRoute extends Route {
  model() {
    return this.modelFor('order/configurator');
  }
}
