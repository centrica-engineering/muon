import Route from '@ember/routing/route';
import { action, set } from '@ember/object';

export default class OrderConfiguratorPickSpongeRoute extends Route {
  model() {
    return {
      sponges: ['Vanilla', 'Chocolate', 'Ginger'],
      cake: this.modelFor('order/configurator').cake,
    };
  }

  @action
  updateSponge(event) {
    set(this.model().cake, 'sponge', event.detail.value);
  }
}
