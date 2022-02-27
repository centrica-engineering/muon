import Route from '@ember/routing/route';

export default class OrderConfiguratorPickAddonRoute extends Route {
  model() {
    return this.modelFor('order/configurator');
  }
}
