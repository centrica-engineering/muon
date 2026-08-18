import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | order/configurator/cake-colour', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders its input group', async function (assert) {
    await render(hbs`<Order::Configurator::CakeColour />`);
    assert.dom('muon-inputter').exists();
  });
});