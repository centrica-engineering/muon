import Controller from '@ember/controller';
import { set, action } from '@ember/object';

export default class ConfiguratorPickFillingController extends Controller {
  @action
  updateFilling(event) {
    let fillingArray = this.model.cake.filling || [];
    const selectedFilling = event.target.value;
    if (fillingArray.indexOf(selectedFilling) === -1) {
      fillingArray.push(selectedFilling);
    } else {
      fillingArray = fillingArray.filter((value) => {
        return value !== selectedFilling;
      });
    }
    this.filling = fillingArray;
    set(this.model.cake, 'filling', fillingArray);
  }
}
