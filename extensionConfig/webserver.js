const WebpackDevServer = require('webpack-dev-server-3.10');
const webpack = require('webpack-4.41');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('../webpack.config');
const env = require('./env');

// Webpack uses this path to fetch the manifest + hot update chunks.
// Not setting it for content scripts or scripts injected into client
// pages causes webpack to fetch from a relative path.

config.output.publicPath = `http://127.0.0.1:${env.PORT}/`;

// Replace the manifest transformer so the new content security policy allows
// the public path.

const copyPluginIndex = config.plugins.findIndex(
  (p) => p instanceof CopyWebpackPlugin
);
if (copyPluginIndex !== -1) {
  config.plugins[copyPluginIndex] = new CopyWebpackPlugin(
    [
      {
        from: './manifest.json',
        transform(content) {
          const manifest = JSON.parse(content.toString());
          const content_security_policy = `${
            manifest.content_security_policy
              ? `${manifest.content_security_policy}; `
              : ''
          }script-src 'self' ${config.output.publicPath}; object-src 'self'`;

          // generates the manifest file using the package.json informations
          return Buffer.from(
            JSON.stringify(
              {
                description: process.env.npm_package_description,
                version: process.env.npm_package_version,
                ...manifest,
                content_security_policy,
              },
              null,
              2
            )
          );
        },
      },
    ],
    {
      copyUnmodified: true,
    }
  );
}

const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
  hot: true,
  contentBase: path.join(__dirname, '../build'),
  sockPort: env.PORT,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  disableHostCheck: true,
  host: '127.0.0.1',
  transportMode: 'ws',
  writeToDisk: true,
});

server.listen(env.PORT);
