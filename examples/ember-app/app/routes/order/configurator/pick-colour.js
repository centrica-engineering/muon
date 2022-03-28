import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class OrderConfiguratorPickColourRoute extends Route {
  @service order;

  model() {
    return {
      colours: ['Black', 'Purple', 'Pink', 'Blue', 'Green', 'Brown'],
      selectedColour: this.order.order.cake.colour
    };
  }
}
