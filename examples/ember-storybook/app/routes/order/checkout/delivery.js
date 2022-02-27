import Route from '@ember/routing/route';

export default class CheckoutDeliveryRoute extends Route {
  model() {
    return this.modelFor('order/checkout');
  }
}
