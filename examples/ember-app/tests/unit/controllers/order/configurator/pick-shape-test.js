import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | pick-shape', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup(
      'controller:order/configurator/pick-shape'
    );
    assert.ok(controller);
  });
});
