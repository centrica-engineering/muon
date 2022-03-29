import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class OrderConfiguratorCakeSpongeComponent extends Component {
  @service order;

  @action
  updateSponge(event) {
    this.order.updateCake('sponge', event.detail.value);
  }
}
