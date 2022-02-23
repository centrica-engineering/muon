import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class PickShapeController extends Controller {
  @service router;

  @tracked shape = '';

  @action
  getShape() {
    alert(this.shape);
    return this.shape;
  }

  @action
  updateShapeValue(event) {
    this.shape = event.target.value;
  }

  @action
  goToTier() {
    this.router.transitionTo('configurator.pick-tier');
  }
}
