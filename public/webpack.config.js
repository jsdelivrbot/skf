'use strict';
let path = require('path');
let webpack = require('webpack');

module.exports = {
    entry: './src/main.ts',

    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: 'bundle.js'
    },

    module: {
        loaders:
        [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader?keepUrl=true']
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            },
            // {
            //     test: /\.css$/,
            //     loaders: ['style-loader', 'css-loader']
            // },
            {
                test: /\.css$/,
                loaders: ['to-string-loader', 'css-loader']
            }]
    },

    plugins: [
        new webpack.ProgressPlugin(),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            path.join(process.cwd(), 'app')
        )
    ],

    resolve: {
        extensions: ['.ts', '.js']
    }
};