const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
    filename: 'public/[name].bundle.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'frontend/public/index.ejs', hash: true }),
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
