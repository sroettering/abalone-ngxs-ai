const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const dev = process.env.NODE_ENV !== 'production';

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: 'index.html',
    filename: 'index.html',
    inject: true,
});

module.exports = {
    devServer: {
        host: 'localhost',
        port: '8080',
        hot: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    },
    entry: "./src/index.ts",
    output: {
        path: __dirname,
        filename: "index.js"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
            },
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: dev
    ? [HTMLWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()]
    : [HTMLWebpackPluginConfig]
};
