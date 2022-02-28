import Controller from '@ember/controller';
import { set, action } from '@ember/object';

export default class ConfiguratorPickTierController extends Controller {
  @action
  updateTier(event) {
    set(this.model.cake, 'tier', event.target.value);
  }
}
