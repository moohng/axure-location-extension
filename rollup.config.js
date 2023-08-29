const path = require('path');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
// const postCSS = require('rollup-plugin-postcss');
const terser = require('@rollup/plugin-terser');
const copy = require('rollup-plugin-copy');

const fs = require('fs');
const manifest = require('./public/manifest.json');
const { version } = require('./package.json');

manifest.version = version;

fs.writeFileSync('dist/output/manifest.json', JSON.stringify(manifest));

module.exports = {
  input: path.resolve('src/index.ts'),
  output: [
    {
      file: `dist/output/location.js`,
      format: 'iife',
      plugins: [terser()],
    },
  ],
  plugins: [
    resolve({ extensions: ['.js', '.ts'] }),
    commonjs(),
    typescript(),
    // postCSS({ extract: true }),
    copy({
      targets: [{ src: 'src/style.css', dest: 'dist/output/', rename: 'location.css' }],
    }),
  ],
};
