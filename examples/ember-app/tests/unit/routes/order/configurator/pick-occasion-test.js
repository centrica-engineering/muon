import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | configurator/pick-occasion', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:order/configurator/pick-occasion');
    assert.ok(route);
  });
});
