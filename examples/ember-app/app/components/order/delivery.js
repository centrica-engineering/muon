import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class OrderDeliveryComponent extends Component {
  @service order;

  @action
  updateDeliveryDate(event) {
    this.order.updateDelivery('date', event.detail.value);
  }

  @action
  updateAdditional(event) {
    this.order.updateDelivery('allergies', event.detail.value);
  }

  @action
  updatePortion(event) {
    this.order.updateDelivery('portion', event.detail.value);
  }
}
