import Route from '@ember/routing/route';
import { action, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CheckoutDeliveryRoute extends Route {
  @service order;

  model() {
    return {
      delivery: this.order.delivery
    };
  }

}
