import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class PickSpongeController extends Controller {
  @service router;

  @tracked sponge = '';

  @action
  updateSponge(event) {
    this.sponge = event.target.value;
  }

  @action
  goToTier() {
    this.router.transitionTo('configurator.pick-tier');
  }

  @action
  goToColour() {
    this.store
      .queryRecord('cake', { filter: { title: 'Config Cake' } })
      .then((cake) => {
        cake.sponge = this.sponge;
        cake.save();
      });
    this.router.transitionTo('configurator.pick-colour');
  }
}
