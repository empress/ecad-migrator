const { readdirSync, rmSync } = require('fs');
const { join } = require('path');

function removeRoutes() {
  const dir = 'tests/dummy/app/routes';
  const files = readdirSync(dir);
  files.forEach((file) => rmSync(join(dir, file), { recursive: true }));
}

module.exports = removeRoutes;
