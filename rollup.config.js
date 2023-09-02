const path = require('path');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
// const postCSS = require('rollup-plugin-postcss');
const terser = require('@rollup/plugin-terser');
const copy = require('rollup-plugin-copy');
const { defineConfig } = require('rollup');
const createManifestPlugin = require('./build/createManifest');

module.exports = defineConfig(() => {
  return {
    input: {
      location: path.resolve('src/index.ts'),
      background: path.resolve('src/background.ts'),
      popup: path.resolve('src/popup.ts'),
    },
    output: {
      dir: `dist/output`,
      format: 'es',
      plugins: [terser()],
    },
    plugins: [
      resolve({ extensions: ['.js', '.ts'] }),
      commonjs(),
      typescript(),
      // postCSS({ extract: true }),
      copy({
        targets: [
          { src: 'public/location.css', dest: 'dist/output/', rename: 'location.css' },
          { src: 'public/popup.css', dest: 'dist/output/' },
          { src: 'public/popup.html', dest: 'dist/output/' },
          { src: 'public/icons', dest: 'dist/output/' },
        ],
      }),
      createManifestPlugin(),
    ],
    watch: {
      include: ['src/*', 'public/*'],
    },
  };
});
