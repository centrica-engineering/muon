import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | order/configurator/cake-filling',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await render(hbs`<Order::Configurator::CakeFilling />`);

      assert.dom(this.element).hasText('');

      // Template block usage:
      await render(hbs`
      <Order::Configurator::CakeFilling>
        template block text
      </Order::Configurator::CakeFilling>
    `);

      assert.dom(this.element).hasText('template block text');
    });
  }
);
