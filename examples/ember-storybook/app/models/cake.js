import Model, { attr } from '@ember-data/model';

export default class CakeModel extends Model {
  // @attr('number') id;
  @attr('string') title;
  @attr('string') shape;
  @attr('string') colour;
  @attr('string') filling;
  @attr('string') occasion;
  @attr('string') sponge;
  @attr('number') tier;
  @attr('string') addons;
}
