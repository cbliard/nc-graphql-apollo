var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');
var fileUrl = require('file-url');

module.exports = {
        entry: path.resolve(__dirname, 'src/server.js'),
        target: 'node',
        resolve: {
            extensions: ['.js', '.json'],
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'server.js',
        },
        externals: [nodeExternals(), {config: 'commonjs ./config'}],
        plugins: [
            new webpack.BannerPlugin({ banner: "require('source-map-support').install();", raw: true, entryOnly: false })
        ],
        devtool: 'source-map',
        module: {
            loaders: [
                { test: /\.js$/, loaders: ['babel-loader', 'eslint-loader'] },
            ]
        }
    };
