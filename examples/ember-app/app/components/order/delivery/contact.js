import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class OrderDeliveryContactComponent extends Component {
  @service order;

  @action
  updateTitle(event) {
    this.order.updateDeliveryContact('title', event.detail.value);
  }

  @action
  updateFirstname(event) {
    this.order.updateDeliveryContact('firstname', event.detail.value);
  }

  @action
  updateLastname(event) {
    this.order.updateDeliveryContact('lastname', event.detail.value);
  }

  @action
  updateEmail(event) {
    this.order.updateDeliveryContact('email', event.detail.value);
  }

  @action
  updatePhone(event) {
    this.order.updateDeliveryContact('phone', event.detail.value);
  }
}
