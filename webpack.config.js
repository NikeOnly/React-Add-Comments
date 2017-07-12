var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        "babel-polyfill",
        './src/index.js'
    ],
    output: {
        path: 'dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: { presets: [ 'es2015', 'react', 'stage-0' ],
                         plugins: ['transform-decorators-legacy']
              },
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                exclude: /node_modules/,
                loader: 'url-loader?importLoaders=1&limit=100000'
            }
        ]
    },
    devtool: 'source-map'
};
