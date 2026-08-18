import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class CheckoutDeliveryRoute extends Route {
  @service order;

  model() {
    return {
      delivery: this.order.order.delivery,
    };
  }
}
