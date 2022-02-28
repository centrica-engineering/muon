import Controller from '@ember/controller';
import { set, action } from '@ember/object';

export default class PickSpongeController extends Controller {
  @action
  updateSponge(event) {
    set(this.model.cake, 'sponge', event.target.value);
  }
}
