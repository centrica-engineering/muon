import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class OrderConfiguratorPickSpongeRoute extends Route {
  @service order;

  model() {
    return {
      sponges: ['Vanilla', 'Chocolate', 'Ginger'],
      selectedSponge: this.order.order.cake.sponge
    };
  }
}
