'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        index: path.join(__dirname, 'front-page/index.js'),
    },
    output: {
        path: path.join(__dirname, 'front-page/'),
        filename: '[name].min.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
    ],
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ["es2015", "stage-0"]
            }
        }]
    }
};