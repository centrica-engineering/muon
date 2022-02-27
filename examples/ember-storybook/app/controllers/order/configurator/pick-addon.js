import Controller from '@ember/controller';
import { set, action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ConfiguratorPickAddonController extends Controller {
  @service router;

  @tracked addon = '';

  @action
  updateAddon(event) {
    let addonArray = (this.addon && this.addon.split(',')) || [];
    const selectedAddon = event.target.value;
    if (addonArray.indexOf(selectedAddon) === -1) {
      addonArray.push(selectedAddon);
    } else {
      addonArray = addonArray.filter((value) => {
        return value !== selectedAddon;
      });
    }
    this.filling = addonArray.join(',');
  }

  @action
  goToOccasion() {
    this.router.transitionTo('order.configurator.pick-occasion');
  }

  @action
  goToCheckout() {
    set(this.model.cake, 'addon', this.addon);
    this.router.transitionTo('order.checkout');
  }
}
