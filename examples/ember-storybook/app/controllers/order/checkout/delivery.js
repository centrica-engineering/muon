import Controller from '@ember/controller';
import EmberObject, { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { setProperties } from '@ember/object';

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
  checkout() {
    let contact = EmberObject.create();
    contact.setProperties({
      title: this.title,
      firstname: this.firstname,
      surname: this.surename,
    });

    let address = EmberObject.create();
    address.setProperties({
      addr1: this.addr1,
      addr2: this.addr2,
      town: this.town,
      postcode: this.postcode,
    });

    let orderDelivery = EmberObject.create();
    orderDelivery.setProperties({
      date: this.deliveryDate?.toString(),
      allergies: this.allergies,
      portion: this.portionCount,
      contact: contact,
      address: address,
    });

    this.model.delivery = orderDelivery;
  }
}
