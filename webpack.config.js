
'use strict';

const path              = require('path');
const UglifyJSPlugin    = require('uglifyjs-webpack-plugin');
const isDev             = true;

let paths = {
    src:{
        sass:'./src/sass/',
        pug: './src/pug/',
        img: './src/img/',
        js: './src/js/',
        fonts: './src/fonts/',
        php: './src/php/'
    },
    build:{
        css: './build/css/',
        js: './build/js/',
        html: './build/',
        img: './build/img/',
        fonts: './build/fonts/',
        php: './build/php/'
    }
};

module.exports = {
    entry: isDev ? [paths.src.js + 'app.js'] : ['babel-polyfill', paths.src.js + 'app.js'],
    // devtool: isDev ? 'inline-source-map' : 'hidden-source-map',
    devtool: isDev ? 'inline-source-map': '',
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    plugins: isDev ? [


    ] :[
        new UglifyJSPlugin({
            sourceMap: true
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'build')
    }
};
