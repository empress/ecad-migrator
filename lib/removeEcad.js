const { join } = require('path');
const execa = require('execa');

// ECAD is ember-cli-addon-docs
async function removeEcad() {
  // eslint-disable-next-line import/no-dynamic-require,global-require
  const packageJson = require(join(process.cwd(), './package.json'));

  function startsWithEcad(dep) {
    return dep.startsWith('ember-cli-addon-docs');
  }

  const devDeps = Object.keys(packageJson.devDependencies).filter(startsWithEcad);
  const deps = Object.keys(packageJson.dependencies).filter(startsWithEcad);

  const ecadDeps = [...devDeps, ...deps];

  if (!ecadDeps.length) {
    console.log('no ember-cli-addon-docs dependencies to uninstall!');
    return;
  }

  console.log(`removing ${ecadDeps.join(', ')}`);
  await execa('yarn', ['remove', ...ecadDeps]);
  console.log('done uninstalling packages!');
}

module.exports = removeEcad;
