import Route from '@ember/routing/route';
import { set, action } from '@ember/object';

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

  @action
  updateFillings(event) {
    const selectedFilling = event.detail.value;
    const fillings = [...selectedFilling.split(',')];
    set(this.model().cake, 'fillings', fillings);
  }
}
