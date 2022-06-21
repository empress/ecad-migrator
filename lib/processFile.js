const { readFileSync, writeFileSync, unlinkSync } = require('fs');
const { transform } = require('ember-template-recast');
const mkdirp = require('mkdirp');
const { dirname } = require('path');

const ignoredFiles = [
  'templates/application.hbs',
  'templates/docs.hbs',
  'templates/not-found.hbs',
];

function processFile(filename) {
  const found = ignoredFiles.find((file) => filename.endsWith(file));

  if (found) {
    console.warn(`Ignoring ${filename}`);
    return;
  }

  const fileContents = readFileSync(filename, 'utf8');

  const { code } = transform({
    template: fileContents,
    plugin(env) {
      const { builders: b } = env.syntax;

      return {
        BlockStatement(node) {
          if (node.path.original !== 'docs-demo') {
            return;
          }

          const { body } = node.program;

          const example = body.find((item) => item.path && item.path.original === 'demo.example');

          // eslint-disable-next-line consistent-return
          return [b.text('```handlebars'), example.program, b.text('\n```')];
        },
        ElementNode(node) {
          if (node.tag !== 'LinkTo') {
            return;
          }

          const routeAttr = node.attributes.find((attr) => attr.name === '@route');

          const route = routeAttr.value.chars.replace('.', '/');

          routeAttr.value.chars = 'show';

          const modelAttr = b.attr('@model', b.text(route));
          node.attributes.push(modelAttr);
        },
        MustacheStatement(node) {
          if (node?.path?.original !== 'docs-link') {
            return;
          }

          // eslint-disable-next-line no-param-reassign
          node.type = 'TextNode';
          // eslint-disable-next-line no-param-reassign
          node.chars = `[${node.params[0].value}](/${node.params[1].value.replace('.', '/')})`;
        },
      };
    },
  });

  const newFilename = `docs/${filename.replace('tests/dummy/app/templates/', '').replace(/\.hbs$/, '.md')}`;

  mkdirp.sync(dirname(newFilename));
  writeFileSync(newFilename, code);
  // unlinkSync(filename);
}

module.exports = processFile;
