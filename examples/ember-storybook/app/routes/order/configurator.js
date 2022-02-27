import Route from '@ember/routing/route';

export default class OrderConfiguratorRoute extends Route {
  model() {
    return this.modelFor('order');
  }

  afterModel() {
    this.transitionTo('order.configurator.pick-shape');
  }
}
