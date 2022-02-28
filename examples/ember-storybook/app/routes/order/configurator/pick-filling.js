import Route from '@ember/routing/route';

export default class OrderConfiguratorPickFillingRoute extends Route {
  model() {
    return {
      fillings: [
        'Buttercream',
        'Strawberry jam',
        'Raspberry jam',
        'Cream cheese',
        'Coffee',
        'Lemon mascarpone',
      ],
      cake: this.modelFor('order/configurator').cake,
    };
  }
}
