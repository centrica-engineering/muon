import { dedupeMixin } from '@muonic/muon';
import 'element-internals-polyfill';
/**
 * A mixin to associate the component to the enclosing native form.
 *
 * @mixin FormElementMixin
 */

export const FormAssociateMixin = dedupeMixin((superClass) =>
  class FormAssociateMixinClass extends superClass {

    static get properties() {
      return {
        _internals: {
          type: Object,
          state: true
        }
      };
    }

    static get formAssociated() {
      return true;
    }

    constructor() {
      super();
      this._internals = this.attachInternals();
    }

    updated(changedProperties) {
      if (changedProperties.has('value')) {
        this._internals.setFormValue(this.value);
      }
    }
  }
);
