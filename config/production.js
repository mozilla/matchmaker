const shared = require('./shared');

const config = {
  ...shared,
  mode: 'production',
  devtool: 'source-map',
};

module.exports = config;
