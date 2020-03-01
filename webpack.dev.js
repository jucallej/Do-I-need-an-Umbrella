const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',

    plugins: [
        new HtmlWebpackPlugin({
            template: 'frontend/public/index.ejs',
            API_URL: 'http://localhost:3000'
        }),
        new FaviconsWebpackPlugin('./frontend/images/umbrella.svg')
    ]
});
