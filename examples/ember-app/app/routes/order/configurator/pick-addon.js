import Route from '@ember/routing/route';
import { set, action } from '@ember/object';

export default class OrderConfiguratorPickAddonRoute extends Route {
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
      cake: this.modelFor('order/configurator').cake,
    };
  }

  @action
  updateAddons(event) {
    const selectedAddons = event.detail.value;
    set(this.model().cake, 'addons', [...selectedAddons.split(',')]);
  }
}
