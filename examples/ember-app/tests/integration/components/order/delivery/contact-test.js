import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | order/delivery/contact', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders contact fields', async function (assert) {
    await render(hbs`<Order::Delivery::Contact />`);
    assert.dom('input[type="email"]').exists();
    assert.dom('input[type="tel"]').exists();
  });
});