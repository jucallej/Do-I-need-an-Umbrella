const path = require('path');
const slsw = require('serverless-webpack');
const isLocal = slsw.lib.webpack.isLocal;

module.exports = {
  mode: isLocal ? 'development' : 'production',
  context: path.join( __dirname, '' ),
  devtool: 'source-map',
  target: 'node',
  entry: slsw.lib.entries,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
      },
    ],
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, '.webpack'),
    filename: '[name].js'
  }
};
