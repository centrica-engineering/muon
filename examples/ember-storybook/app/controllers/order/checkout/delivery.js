import Controller from '@ember/controller';
import { set, action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CheckoutDeliveryController extends Controller {
  @service router;

  @tracked deliveryDate;
  @tracked allergies;
  @tracked portionCount;
  @tracked title;
  @tracked firstname;
  @tracked surname;
  @tracked email;
  @tracked addr1;
  @tracked addr2;
  @tracked town;
  @tracked postcode;

  @action
  updateDeliveryDate(event) {
    this.deliveryDate = event.target.value;
  }

  @action
  updateAdditional(event) {
    this.allergies = event.target.value;
  }

  @action
  updatePortion(event) {
    this.portionCount = event.target.value;
  }

  @action
  updateTitle(event) {
    this.title = event.target.value;
  }

  @action
  updateFirstname(event) {
    this.firstname = event.target.value;
  }

  @action
  updateSurname(event) {
    this.surname = event.target.value;
  }

  @action
  updateEmail(event) {
    this.email = event.target.value;
  }

  @action
  updateAddr1(event) {
    this.addr1 = event.target.value;
  }

  @action
  updateAddr2(event) {
    this.addr2 = event.target.value;
  }

  @action
  updateTown(event) {
    this.town = event.target.value;
  }

  @action
  updatePostcode(event) {
    this.postCode = event.target.value;
  }

  @action
  goToConfigurator() {
    this.router.transitionTo('order.configurator');
  }

  @action
  checkout() {
    let orderDelivery = this.model.delivery;
    set(orderDelivery, 'date', this.deliveryDate.toString);
    set(orderDelivery, 'allergies', this.allergies);
    set(orderDelivery, 'portion', this.portionCount);
    set(orderDelivery.contact, 'title', this.title);
    set(orderDelivery.contact, 'firstname', this.firstname);
    set(orderDelivery.contact, 'surname', this.surname);
    set(orderDelivery.address, 'addr1', this.addr1);
    set(orderDelivery.address, 'addr2', this.addr2);
    set(orderDelivery.address, 'town', this.town);
    set(orderDelivery.address, 'postcode', this.postcode);

    this.router.transitionTo('order.confirmation');
  }
}
