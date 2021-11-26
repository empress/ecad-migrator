#!/usr/bin/env node

const {
  moveExistingDocs,
  removeEcad,
  installFieldGuide,
  addNodeTarget,
  resetRouter,
  removeRoutes,
} = require('../lib');

(async () => {
  const steps = [
    removeEcad,
    installFieldGuide,
    // do this twice because of a bug in ember-cli 😭
    installFieldGuide,
    addNodeTarget,
    resetRouter,
    removeRoutes,
    moveExistingDocs,
  ];

  // eslint-disable-next-line no-restricted-syntax
  for (const [i, step] of steps.entries()) {
    console.log(`Starting step ${i + 1} of ${steps.length}: ${step.name}`);
    // eslint-disable-next-line no-await-in-loop
    await step();
    console.log(`Finished ${step.name}`);
  }

  console.log('All done 🎉 You can start your Field guide with `npm start` now, and if you need any help open an issue on the ecad-migrator github https://github.com/empress/ecad-migrator/issues');
})();
