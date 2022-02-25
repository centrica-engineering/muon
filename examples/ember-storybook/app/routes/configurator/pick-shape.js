import Route from '@ember/routing/route';

export default class ConfiguratorPickShapeRoute extends Route {
  beforeModel() {
    window.localStorage.clear();
    this.store
      .createRecord('cake', {
        title: 'Config Cake',
      })
      .save();
  }

  model() {
    return {
      cake: this.store.findAll('cake')[0],
    };
  }
}
