const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const awsStack = require('./stack');

module.exports = merge(common, {
  mode: 'production',

  plugins: [
    new HtmlWebpackPlugin({
      template: 'frontend/public/index.ejs',
      API_URL: awsStack.ServiceEndpoint
    }),
  ],
});
