import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class OrderConfiguratorPickTierRoute extends Route {
  @service order;

  model() {
    return {
      tier: {
        min: 1,
        max: 3,
      },
      selectedTier: this.order.order.cake.tier
    };
  }
}
