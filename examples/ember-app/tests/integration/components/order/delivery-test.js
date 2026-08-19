import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | order/delivery', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders delivery fields', async function (assert) {
    await render(hbs`<Order::Delivery />`);
    assert.dom('input[type="date"]').exists();
    assert.dom('textarea').exists();
  });
});