import Controller from '@ember/controller';
import { action } from '@ember/object';
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
    this.router.transitionTo('configurator.pick-occasion');
  }

  @action
  goToCheckout() {
    this.store
      .queryRecord('cake', { filter: { title: 'Config Cake' } })
      .then((cake) => {
        cake.addon = this.addon;
        cake.save();
      });
    this.router.transitionTo('configurator.checkout');
  }
}
