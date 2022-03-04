import Route from '@ember/routing/route';
import { action, set } from '@ember/object';

export default class OrderConfiguratorPickColourRoute extends Route {
  model() {
    return {
      colours: ['Black', 'Purple', 'Pink', 'Blue', 'Green', 'Brown'],
      cake: this.modelFor('order/configurator').cake,
    };
  }

  @action
  updateColour(event) {
    set(this.model().cake, 'colour', event.detail.value);
  }
}
