import Route from '@ember/routing/route';

export default class OrderConfiguratorPickTierRoute extends Route {
  model() {
    return {
      cake: this.modelFor('order/configurator').cake,
    };
  }
}
