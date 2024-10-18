const webpack = require('@nativescript/webpack');
const { resolve } = require('path');

module.exports = (env) => {
  webpack.init(env);

  // Learn how to customize:
  // https://docs.nativescript.org/webpack

  webpack.chainWebpack((config) => {
    // Ensure the entry point is correctly set
    config.entry('bundle').clear().add(resolve(__dirname, 'src/main.ts'));
  });

  return webpack.resolveConfig();
};