import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | inputter/text', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:inputter/text');
    assert.ok(route);
  });
});
