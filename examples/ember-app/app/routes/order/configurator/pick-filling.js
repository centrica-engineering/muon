import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class OrderConfiguratorPickFillingRoute extends Route {
  @service order;

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
      selectedFillings: this.order.order.cake.fillings
    };
  }
}
