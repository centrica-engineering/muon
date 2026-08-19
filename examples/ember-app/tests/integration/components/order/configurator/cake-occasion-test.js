import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | order/configurator/cake-occasion', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders standard and custom occasion inputs', async function (assert) {
    await render(hbs`<Order::Configurator::CakeOccasion />`);
    assert.dom('select').exists();
    assert.dom('input[type="text"]').exists();
  });
});