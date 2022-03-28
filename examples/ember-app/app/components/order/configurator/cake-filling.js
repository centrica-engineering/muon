import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class OrderConfiguratorCakeFillingComponent extends Component {
  @service order;

  @action
  updateFillings(event) {
    const selectedFilling = event.detail.value;
    const fillings = selectedFilling.split(',');
    this.order.updateCake('fillings', fillings);
  }
}
