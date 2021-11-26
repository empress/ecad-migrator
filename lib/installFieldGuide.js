const execa = require('execa');
const { Readable } = require('stream');

async function installFieldGuide() {
  const fieldGuideDeps = ['field-guide', 'field-guide-addon-docs-template'];

  await new Promise((resolve) => {
    const positiveStream = new Readable({
      read() {},
    });

    const command = execa('ember', ['install', ...fieldGuideDeps], {
      input: positiveStream,
    });

    const alwaysYes = setInterval(() => {
      positiveStream.push('y\n');
    }, 1000);

    command.stdout.pipe(process.stdout);
    command.on('close', () => {
      clearInterval(alwaysYes);
      resolve();
    });
  });

  console.log('done installing packages!');
}

module.exports = installFieldGuide;
