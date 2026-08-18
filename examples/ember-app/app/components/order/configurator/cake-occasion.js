import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class OrderConfiguratorCakeOccasionComponent extends Component {
  @service order;

  get customOccasion() {
    const occasions = this.args.occasions ?? [];
    const selectedOccasion = this.args.selectedOccasion ?? '';

    return occasions.includes(selectedOccasion) ? '' : selectedOccasion;
  }

  @action
  updateOccasion(event) {
    this.order.updateCake('occasion', event.detail.value);
  }
}
