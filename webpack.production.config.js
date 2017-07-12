'use strict';

var path = require('path');
var webpack = require("webpack");

var config = {
    entry: [
        "babel-polyfill",
        './src/index.js'
    ],
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: { presets: [ 'es2015', 'react', 'stage-0' ] }
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
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
};


module.exports = config;
