import Controller, { inject as controller } from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ConfiguratorPickTierController extends Controller {
  pickShapeController = controller('configurator/pick-shape');
  @service router;

  @tracked tier = 0;

  @action
  updateTier(event) {
    this.tier = event.target.value;
  }

  @action
  goToShape() {
    this.router.transitionTo('configurator.pick-shape');
  }

  @action
  goToSponge() {
    this.router.transitionTo('configurator.pick-sponge');
  }
}
