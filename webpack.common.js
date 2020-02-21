const path = require('path');

module.exports = {
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
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: {
                                localIdentName:
                                    '[path][name]__[local]--[hash:base64:5]'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack']
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'public/[name].[contenthash].bundle.js',
        publicPath: '/Do-I-need-an-Umbrella'
    },
    devServer: {
        contentBase: path.join(__dirname, 'frontend/public')
    }
};
