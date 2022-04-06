import { dedupeMixin } from '@muons/library';
import { DetailMixin as DetailMixinClass } from './detail-mixin';
import { FormElementMixin as FormElementMixinClass } from './form-element-mixin';
import { MaskMixin as MaskMixinClass } from './mask-mixin';
import { ValidationMixin as ValidationMixinClass } from './validation-mixin';

export const DetailMixin = dedupeMixin(DetailMixinClass);
export const FormElementMixin = dedupeMixin(FormElementMixinClass);
export const MaskMixin = dedupeMixin(MaskMixinClass);
export const ValidationMixin = dedupeMixin(ValidationMixinClass);
