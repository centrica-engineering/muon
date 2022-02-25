import Controller, { inject as controller } from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class PickShapeController extends Controller {
  @service router;
  @tracked shape = '';

  @action
  getShape() {
    return this.shape;
  }

  @action
  updateShapeValue(event) {
    this.shape = event.target.value;
  }

  @action
  goToTier() {
    this.store
      .queryRecord('cake', { filter: { title: 'Config Cake' } })
      .then((cake) => {
        cake.shape = this.shape;
        cake.save();
      });

    this.router.transitionTo('configurator.pick-tier');
  }
}
