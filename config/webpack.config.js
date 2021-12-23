module.exports = function () {
  const env = process.env.NODE_ENV || 'production';
  return require(`./${env}.js`);
};
