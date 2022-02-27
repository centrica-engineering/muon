import Controller from '@ember/controller';
import { set, action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ConfiguratorPickOccasionController extends Controller {
  @service router;

  @tracked occasion = '';

  @action
  updateOccasion(event) {
    this.occasion = event.target.value;
  }

  @action
  goToFilling() {
    this.router.transitionTo('order.configurator.pick-filling');
  }

  @action
  goToAddon() {
    set(this.model.cake, 'occasion', this.occasion);
    this.router.transitionTo('order.configurator.pick-addon');
  }
}
