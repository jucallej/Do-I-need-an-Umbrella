const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const awsStack = require('./stack.json');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    app: path.resolve(__dirname, './frontend')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  output: {
    path: path.resolve( __dirname, 'dist' ),
    filename: 'public/[name].[contenthash].bundle.js',
    publicPath: '/Do-I-need-an-Umbrella',
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'frontend/public/index.ejs', API_URL: awsStack.ServiceEndpoint }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'frontend/public'),
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  }
};
