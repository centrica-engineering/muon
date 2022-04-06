import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class OrderConfiguratorPickShapeRoute extends Route {
  @service order;

  model() {
    return {
      shapes: ['Round', 'Square', 'Triangle'],
      selectedShape: this.order.order.cake.shape
    };
  }
}
