import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class OrderConfiguratorCakeTierComponent extends Component {
  @service order;

  @action
  updateTier(event) {
    this.order.updateCake('tier', event.detail.value);
  }
}
