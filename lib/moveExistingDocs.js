const glob = require('glob');
const rimraf = require('rimraf');

const processFile = require('./processFile');
const moveController = require('./moveController');

function moveExistingDocs() {
  // clear out dummy docs first
  rimraf.sync('./docs/*');

  const fileNames = glob.sync('tests/dummy/app/templates/**/*.{md,hbs}');

  fileNames.forEach(processFile);

  // port controllers
  const controllerFilenames = glob.sync('tests/dummy/app/controllers/**/*.js');

  controllerFilenames.forEach(moveController);
}

module.exports = moveExistingDocs;
