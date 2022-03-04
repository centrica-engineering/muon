import Route from '@ember/routing/route';
import { action, set } from '@ember/object';

export default class OrderConfiguratorPickTierRoute extends Route {
  model() {
    return {
      tier: {
        min: 1,
        max: 3,
      },
      cake: this.modelFor('order/configurator').cake,
    };
  }

  @action
  updateTier(event) {
    set(this.model().cake, 'tier', event.detail.value);
  }
}
