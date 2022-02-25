import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ConfiguratorPickColourController extends Controller {
  @service router;

  @tracked colour = '';

  @action
  updateColour(event) {
    this.colour = event.target.value;
  }

  @action
  goToSponge() {
    this.router.transitionTo('configurator.pick-sponge');
  }

  @action
  goToFilling() {
    this.store
      .queryRecord('cake', { filter: { title: 'Config Cake' } })
      .then((cake) => {
        cake.colour = this.colour;
        cake.save();
      });
    this.router.transitionTo('configurator.pick-filling');
  }
}
