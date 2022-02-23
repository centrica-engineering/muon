import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | configurator/pick-tier', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:configurator/pick-tier');
    assert.ok(controller);
  });
});
