const path = require('path');

const SRC_PATH = '../src';
const DIST_PATH = '../dist';

const sharedConfig = {
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
  entry: {
    app: path.join(__dirname, SRC_PATH, 'main.js'),
  },
  output: {
    path: path.resolve(__dirname, DIST_PATH),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js'],
    alias: {},
    fallback: {
      assert: require.resolve('assert'),
      fs: false,
      path: require.resolve('path-browserify'),
    },
  },
  // plugins: [
  //   new NodePolyfillPlugin()
  // ]
};

module.exports = sharedConfig;
