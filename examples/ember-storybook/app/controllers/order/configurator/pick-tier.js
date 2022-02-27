import Controller from '@ember/controller';
import { set, action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ConfiguratorPickTierController extends Controller {
  @service router;

  @tracked tier = 0;

  @action
  updateTier(event) {
    this.tier = event.target.value;
  }

  @action
  goToShape() {
    this.router.transitionTo('order.configurator.pick-shape');
  }

  @action
  goToSponge() {
    set(this.model.cake, 'tier', this.tier);
    this.router.transitionTo('order.configurator.pick-sponge');
  }
}
