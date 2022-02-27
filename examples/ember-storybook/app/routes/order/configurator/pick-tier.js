import Route from '@ember/routing/route';

export default class OrderConfiguratorPickTierRoute extends Route {
  model() {
    return this.modelFor('order/configurator');
  }
}
