import Controller from '@ember/controller';
import { set, action } from '@ember/object';
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
    this.router.transitionTo('order.configurator.pick-sponge');
  }

  @action
  goToFilling() {
    set(this.model.cake, 'colour', this.colour);
    this.router.transitionTo('order.configurator.pick-filling');
  }
}
