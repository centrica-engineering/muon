import Route from '@ember/routing/route';

export default class OrderConfiguratorPickOccasionRoute extends Route {
  model() {
    return this.modelFor('order/configurator');
  }
}
