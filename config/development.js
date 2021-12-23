const shared = require('./shared');

const config = {
  ...shared,
  mode: 'development',
  watch: true,
  watchOptions: {
    poll: true,
    ignored: /node_modules/,
  },
  stats: {
    errorDetails: true,
  },
};

module.exports = config;
