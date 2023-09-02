const fs = require('fs');
const manifest = require('../public/manifest.json');
const { version } = require('../package.json');

function createManifestPlugin() {
  return {
    buildEnd: () => {
      manifest.version = version;
      fs.writeFileSync('dist/output/manifest.json', JSON.stringify(manifest));
    },
  };
}

module.exports = createManifestPlugin;
