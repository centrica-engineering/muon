import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class OrderConfiguratorPickAddonRoute extends Route {
  @service order;

  model() {
    return {
      addons: [
        'Candles',
        'Ribbon',
        'Flowers',
        'Glitter',
        'Sparklers',
        'Writing',
      ],
      selectedAddons: this.order.order.cake.addons
    };
  }
}
