import Controller from '@ember/controller';
import { set, action } from '@ember/object';

export default class ConfiguratorPickOccasionController extends Controller {
  @action
  updateOccasion(event) {
    set(this.model.cake, 'occasion', event.target.value);
  }
}
