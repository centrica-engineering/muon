import Route from '@ember/routing/route';

export default class OrderCheckoutRoute extends Route {
  model() {
    return this.modelFor('order');
  }

  afterModel() {
    this.transitionTo('order.checkout.delivery');
  }
}
