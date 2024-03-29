import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class OrderConfirmationRoute extends Route {
  @service order;

  model() {
    return this.order.order;
  }
}
