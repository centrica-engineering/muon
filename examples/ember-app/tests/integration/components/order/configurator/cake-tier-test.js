import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | order/configurator/cake-tier',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await render(hbs`<Order::Configurator::CakeTier />`);

      assert.dom(this.element).hasText('');

      // Template block usage:
      await render(hbs`
      <Order::Configurator::CakeTier>
        template block text
      </Order::Configurator::CakeTier>
    `);

      assert.dom(this.element).hasText('template block text');
    });
  }
);
