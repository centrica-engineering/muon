import Controller from '@ember/controller';
import { set, action } from '@ember/object';
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
    this.router.transitionTo('order.configurator.pick-tier');
  }

  @action
  goToColour() {
    set(this.model, 'sponge', this.sponge);
    this.router.transitionTo('order.configurator.pick-colour');
  }
}
