import Controller from '@ember/controller';
import { set, action } from '@ember/object';
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
    this.router.transitionTo('order.configurator.pick-colour');
  }

  @action
  goToOccasion() {
    set(this.model.cake, 'filling', this.filling);
    this.router.transitionTo('order.configurator.pick-occasion');
  }
}
