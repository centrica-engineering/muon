import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class OrderDeliveryAddressComponent extends Component {
  @service order;

  @action
  updateAddr1(event) {
    this.order.updateDeliveryAddress('addr1', event.target.value);
  }

  @action
  updateAddr2(event) {
    this.order.updateDeliveryAddress('addr2', event.target.value);
  }

  @action
  updateTown(event) {
    this.order.updateDeliveryAddress('town', event.target.value);
  }

  @action
  updatePostcode(event) {
    this.order.updateDeliveryAddress('postcode', event.target.value);
  }
}
