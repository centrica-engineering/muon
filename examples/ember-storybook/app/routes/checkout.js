import Route from '@ember/routing/route';

export default class CheckoutRoute extends Route {
  beforeModel() {
    this.transitionTo('checkout.delivery');
  }
}
