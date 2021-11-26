/* eslint-env node */
const recast = require('recast');
const { readFileSync, writeFileSync } = require('fs');

function addNodeTarget() {
  const targetsFile = './tests/dummy/config/targets.js';

  const targetsAst = recast.parse(readFileSync(targetsFile));

  recast.visit(targetsAst, {
    visitAssignmentExpression(path) {
      const { node } = path;

      if (node.left.object.name === 'module' && node.left.property.name === 'exports') {
        let nodeProperty = node.right.properties.find((property) => property.key.name === 'node');

        if (!nodeProperty) {
          const { builders } = recast.types;
          nodeProperty = builders.property(
            'init',
            builders.identifier('node'),
            builders.literal('current'),
          );
          node.right.properties.push(nodeProperty);
        }
      }

      this.traverse(path);
    },
  });

  writeFileSync(targetsFile, recast.print(targetsAst, { tabWidth: 2, quote: 'single' }).code);
}

module.exports = addNodeTarget;
