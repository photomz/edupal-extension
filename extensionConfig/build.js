const webpack = require('webpack-4.41');
const config = require('../webpack.config');

webpack(config, function (err) {
  if (err) throw err;
});
