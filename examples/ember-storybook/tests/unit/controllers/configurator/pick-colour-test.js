import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | configurator/pick-colour', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:configurator/pick-colour');
    assert.ok(controller);
  });
});
