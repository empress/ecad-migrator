const { writeFileSync } = require('fs');

function resetRouter() {
  writeFileSync('tests/dummy/app/router.js', `import EmberRouter from '@ember/routing/router';
import config from 'dummy/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {});`);
}

module.exports = resetRouter;
