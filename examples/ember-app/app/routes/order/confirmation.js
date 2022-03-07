import Route from '@ember/routing/route';

export default class OrderConfirmationRoute extends Route {
  model() {
    return this.modelFor('order');
  }
}
