const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');

module.exports = [
    {
        name: 'js',
        mode: 'development',
        entry: './src/main.js',
        output: {
            path: path.resolve(__dirname, 'dist/js'),
            filename: 'main.js'
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            })
        ],
        module: {
            rules: [
                {
                    test: /\.html$/i,
                    loader: 'html-loader',
                    options: {
                        attributes: false,
                    },
                },
            ],
        },
    },
    {
        name: 'scss',
        mode: 'development',
        entry: './styles/style.scss',
        output: {
            path: path.resolve(__dirname, 'dist/css')
        },
        plugins: [
            new MiniCssExtractPlugin(),
            new IgnoreEmitPlugin('main.js')
        ],
        module: {
            rules: [
                {
                    test: /\.scss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ],
                },
            ],
        },
    }];
