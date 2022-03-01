import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class OrderDeliveryContactComponent extends Component {
  @action
  updateTitle(event) {
    this.args.controller.send('updateContact', 'title', event.detail.value);
  }

  @action
  updateFirstname(event) {
    this.args.controller.send('updateContact', 'firstname', event.detail.value);
  }

  @action
  updateLastname(event) {
    this.args.controller.send('updateContact', 'lastname', event.detail.value);
  }

  @action
  updateEmail(event) {
    this.args.controller.send('updateContact', 'email', event.detail.value);
  }
}
