import Controller from '@ember/controller';
import { set, action } from '@ember/object';

export default class ConfiguratorPickAddonController extends Controller {
  @action
  updateAddon(event) {
    let addonArray = this.model.cake.addon || [];
    const selectedAddon = event.target.value;
    if (addonArray.indexOf(selectedAddon) === -1) {
      addonArray.push(selectedAddon);
    } else {
      addonArray = addonArray.filter((value) => {
        return value !== selectedAddon;
      });
    }
    set(this.model.cake, 'addon', addonArray);
  }
}
