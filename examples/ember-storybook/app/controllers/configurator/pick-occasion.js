import Controller from '@ember/controller';
import { action } from '@ember/object';
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
    this.router.transitionTo('configurator.pick-filling');
  }

  @action
  goToAddon() {
    this.store
      .queryRecord('cake', { filter: { title: 'Config Cake' } })
      .then((cake) => {
        cake.occasion = this.occasion;
        cake.save();
      });
    this.router.transitionTo('configurator.pick-addon');
  }
}
