import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | order/delivery/address', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders address fields', async function (assert) {
    await render(hbs`<Order::Delivery::Address />`);
    assert.dom('input[autocomplete="address-line1"]').exists();
    assert.dom('input[autocomplete="postal-code"]').exists();
  });
});