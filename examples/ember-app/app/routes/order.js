import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class OrderRoute extends Route {
  @service router;

  afterModel() {
    this.router.transitionTo('order.configurator.pick-shape');
  }
}
