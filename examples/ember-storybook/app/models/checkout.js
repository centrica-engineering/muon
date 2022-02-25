import Model, { attr } from '@ember-data/model';

export default class CheckoutModel extends Model {
  @attr cakeId;
  @attr date;
  @attr allergies;
  @attr portion;
  @attr title;
  @attr firstName;
  @attr sureName;
  @attr email;
  @attr addr1;
  @attr addr2;
  @attr town;
  @attr postCode;
  @attr price;
}
