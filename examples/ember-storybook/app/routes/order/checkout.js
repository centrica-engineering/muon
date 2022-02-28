import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class OrderCheckoutRoute extends Route {
  @service router;
  model() {
    return this.modelFor('order');
  }

  afterModel() {
    this.router.transitionTo('order.checkout.delivery');
  }
}
