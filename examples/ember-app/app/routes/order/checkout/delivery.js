import Route from '@ember/routing/route';
import { action, set } from '@ember/object';

export default class CheckoutDeliveryRoute extends Route {
  model() {
    return {
      delivery: this.modelFor('order/checkout').delivery,
      datevalidation: '"isRequired","minDate(\'01/01/2022\')"'
    };
  }

  @action
  updateContact(field, value) {
    set(this.model().delivery.contact, field, value);
  }

  @action
  updateAddress(field, value) {
    set(this.model().delivery.address, field, value);
  }

  @action
  updateDeliveryDate(event) {
    set(this.model().delivery, 'date', event.detail.value);
  }

  @action
  updateAdditional(event) {
    set(this.model().delivery, 'allergies', event.detail.value);
  }

  @action
  updatePortion(event) {
    set(this.model().delivery, 'portion', event.detail.value);
  }
}
