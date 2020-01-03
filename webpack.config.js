const path = require('path');

module.exports = {
  mode: 'development',
  context: path.join( __dirname, 'src' ),
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
    filename: '[name].bundle.js',
    publicPath: '/public/',
  },
  devServer: {
    contentBase: path.join(__dirname, 'frontend/public'),
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  }
};
