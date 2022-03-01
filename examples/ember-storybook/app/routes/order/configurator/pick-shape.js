import Route from '@ember/routing/route';
import { set, action } from '@ember/object';

export default class OrderConfiguratorPickShapeRoute extends Route {
  model() {
    return {
      shapes: ['Round', 'Square', 'Triangle'],
      cake: this.modelFor('order/configurator').cake,
    };
  }

  @action
  updateShape(event) {
    set(this.model().cake, 'shape', event.detail.value);
  }
}
