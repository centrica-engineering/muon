import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | configurator/delivery', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:configurator/delivery');
    assert.ok(route);
  });
});
