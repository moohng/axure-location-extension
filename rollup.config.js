const path = require('path');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const postCSS = require('rollup-plugin-postcss');
const terser = require('@rollup/plugin-terser');

module.exports = {
  input: path.resolve('src/index.ts'),
  output: [
    {
      file: `dist/output/location.js`,
      format: 'iife',
      plugins: [terser()],
    },
  ],
  plugins: [resolve({ extensions: ['.js', '.ts'] }), commonjs(), typescript(), postCSS({ extract: true })],
};
