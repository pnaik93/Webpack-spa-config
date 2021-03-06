var PATH = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var basePath = PATH.resolve(__dirname + '/src/');
var outputPath = PATH.resolve(__dirname + '/public/');

module.exports = {
    entry: {
        app: ['babel-polyfill', PATH.join(basePath + '/app.js')],
    },
    output: {
        filename: '[name].bundle.js',
        path: PATH.join(outputPath + '/build/')
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({ template: './public/index.html' }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common.vendor.js',
            minChunks: function (module) {
                return module.context && module.context.includes('node_modules')
            }
        })
    ],
    devtool: 'inline-source-map',
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_nodules/,
            loader: 'babel-loader',
            options: {
                compact: true
            }
        },
        {
            test: /\.(s*)css$/,
            exclude: /node_modules/,
            loaders: 'style-loader!css-loader!sass-loader'
        }]
    },
    devServer: {
        contentBase: PATH.join(outputPath + '/build/'),
        compress: true,
        port: 9000,
        hot: true,
        inline: true,
    },
    resolve: {
        extensions: ['.js', '.es6']
    },
}
