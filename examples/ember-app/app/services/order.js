import Service from '@ember/service';
import { action } from '@ember/object';

export default class OrderService extends Service {
  order = {
    cake: {},
    delivery: {
      contact: {},
      address: {}
    }
  };

  get order() {
    return this.order;
  }

  @action
  updateCake(key, value) {
    this.order.cake[key] = value;
  }

  @action
  updateDeliveryContact(key, value) {
    this.order.delivery.contact[key] = value;
  }

  @action
  updateDeliveryAddress(key, value) {
    this.order.delivery.address[key] = value;
  }

  @action
  updateDelivery(key, value) {
    this.order.delivery[key] = value;
  }
}
