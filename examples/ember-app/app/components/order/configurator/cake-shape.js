import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class OrderConfiguratorCakeShapeComponent extends Component {
  @service order;

  @action
  updateShape(event) {
    this.order.updateCake('shape', event.detail.value);
  }
}
