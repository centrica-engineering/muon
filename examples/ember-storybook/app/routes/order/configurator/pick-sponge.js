import Route from '@ember/routing/route';

export default class OrderConfiguratorPickSpongeRoute extends Route {
  model() {
    return this.modelFor('order/configurator');
  }
}
