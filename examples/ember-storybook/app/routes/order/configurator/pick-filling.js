import Route from '@ember/routing/route';

export default class OrderConfiguratorPickFillingRoute extends Route {
  model() {
    return this.modelFor('order/configurator');
  }
}
