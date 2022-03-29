import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class OrderConfiguratorCakeOccasionComponent extends Component {
  @service order;

  @action
  updateOccasion(event) {
    this.order.updateCake('occasion', event.detail.value);
  }
}
