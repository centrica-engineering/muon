import Route from '@ember/routing/route';

export default class ConfiguratorRoute extends Route {
  beforeModel() {
    this.transitionTo('configurator.pick-shape');
  }
}
