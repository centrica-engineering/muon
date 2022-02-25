import Route from '@ember/routing/route';

export default class ConfiguratorDeliveryRoute extends Route {
  beforeModel() {
    window.localStorage.clear();
    this.store
      .createRecord('delivery', {
        title: 'Config Cake',
      })
      .save();
  }

  model() {
    return {
      delivery: this.store.findAll('delivery')[0],
    };
  }
}
