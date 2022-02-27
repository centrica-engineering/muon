import EmberRouter from '@ember/routing/router';
import config from 'ember-storybook/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('order', function () {
    this.route('configurator', function () {
      this.route('pick-shape');
      this.route('pick-tier');
      this.route('pick-colour');
      this.route('pick-sponge');
      this.route('pick-filling');
      this.route('pick-occasion');
      this.route('pick-addon');
      this.route('delivery');
    });
    this.route('checkout', function () {
      this.route('delivery');
    });
    this.route('confirmation');
  });
});
