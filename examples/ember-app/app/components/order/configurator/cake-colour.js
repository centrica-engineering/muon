import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class OrderConfiguratorCakeColourComponent extends Component {
  @service order;

  @action
  updateColour(event) {
    this.order.updateCake('colour', event.detail.value);
  }
}
