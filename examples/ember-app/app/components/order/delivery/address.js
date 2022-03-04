import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class OrderDeliveryAddressComponent extends Component {
  @action
  updateAddr1(event) {
    this.args.controller.send('updateAddress', 'addr1', event.target.value);
  }

  @action
  updateAddr2(event) {
    this.args.controller.send('updateAddress', 'addr2', event.target.value);
  }

  @action
  updateTown(event) {
    this.args.controller.send('updateAddress', 'town', event.target.value);
  }

  @action
  updatePostcode(event) {
    this.args.controller.send('updateAddress', 'postcode', event.target.value);
  }
}
