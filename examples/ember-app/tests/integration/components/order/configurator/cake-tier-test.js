import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | order/configurator/cake-tier', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders its tier input', async function (assert) {
    await render(hbs`<Order::Configurator::CakeTier />`);
    assert.dom('input[type="number"]').exists();
  });
});