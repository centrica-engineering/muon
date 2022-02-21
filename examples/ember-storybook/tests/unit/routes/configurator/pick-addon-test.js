import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | configurator/pick-addon', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:configurator/pick-addon');
    assert.ok(route);
  });
});
