import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | icon', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:icon');
    assert.ok(route);
  });
});
