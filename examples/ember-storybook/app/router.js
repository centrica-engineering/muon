import EmberRouter from '@ember/routing/router';
import config from 'ember-storybook/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('cta');
  this.route('icon');
  this.route('image');
  this.route('inputter', function () {
    this.route('text');
  });
  this.route('detail');
});
