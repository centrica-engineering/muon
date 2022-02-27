import Route from '@ember/routing/route';

export default class OrderRoute extends Route {
  model() {
    return {
      cake: {
        title: 'Config Cake',
      },
      delivery: {
        contact: {},
        address: {},
      },
    };
  }

  afterModel() {
    this.transitionTo('order.configurator.pick-shape');
  }
}
