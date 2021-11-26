const { readFileSync, writeFileSync } = require('fs');
const { dirname } = require('path');
const mkdirp = require('mkdirp');

function moveController(filename) {
  const fileContents = readFileSync(filename, 'utf8');

  const newFilename = `docs/${filename.replace('tests/dummy/app/controllers/docs/', '')}`;

  mkdirp.sync(dirname(newFilename));
  // eslint-disable-next-line quotes
  writeFileSync(newFilename, fileContents.replace(`import Controller from '@ember/controller';`, `// this is a hack to make porting much eaiser. you need to convert this to a glimmer component
import Controller from '@ember/component';`));
}

module.exports = moveController;
