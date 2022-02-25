import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ConfiguratorPickFillingController extends Controller {
  @service router;

  @tracked filling = '';

  @action
  updateFilling(event) {
    let fillingArray = (this.filling && this.filling.split(',')) || [];
    const selectedFilling = event.target.value;
    if (fillingArray.indexOf(selectedFilling) === -1) {
      fillingArray.push(selectedFilling);
    } else {
      fillingArray = fillingArray.filter((value) => {
        return value !== selectedFilling;
      });
    }
    this.filling = fillingArray.join(',');
  }

  @action
  goToColour() {
    this.router.transitionTo('configurator.pick-colour');
  }

  @action
  goToOccasion() {
    this.store
      .queryRecord('cake', { filter: { title: 'Config Cake' } })
      .then((cake) => {
        cake.filling = this.filling.toString();
        cake.save();
      });
    this.router.transitionTo('configurator.pick-occasion');
  }
}
