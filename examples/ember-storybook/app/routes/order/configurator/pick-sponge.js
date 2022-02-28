import Route from '@ember/routing/route';

export default class OrderConfiguratorPickSpongeRoute extends Route {
  model() {
    return {
      sponges: ['Vanilla', 'Chocolate', 'Ginger'],
      cake: this.modelFor('order/configurator').cake,
    };
  }
}
