import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class OrderConfiguratorCakeAddonComponent extends Component {
  @service order;

  @action
  updateAddons(event) {
    const selectedAddon = event.detail.value;
    const addons = [...selectedAddon.split(',')];
    this.order.updateCake('addons', addons);
  }
}
