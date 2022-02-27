import Controller from '@ember/controller';
import { set, action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class PickShapeController extends Controller {
  @service router;
  @tracked shape = '';

  @action
  updateShapeValue(event) {
    this.shape = event.target.value;
  }

  @action
  goToTier() {
    set(this.model.cake, 'shape', this.shape);
    this.router.transitionTo('order.configurator.pick-tier');
  }
}
