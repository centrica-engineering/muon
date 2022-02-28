import Controller from '@ember/controller';
import { set, action } from '@ember/object';

export default class PickShapeController extends Controller {
  @action
  updateShapeValue(event) {
    set(this.model.cake, 'shape', event.target.value);
  }
}
