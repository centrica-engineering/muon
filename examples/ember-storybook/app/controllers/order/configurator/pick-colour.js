import Controller from '@ember/controller';
import { set, action } from '@ember/object';

export default class ConfiguratorPickColourController extends Controller {
  @action
  updateColour(event) {
    set(this.model.cake, 'colour', event.target.value);
  }
}
