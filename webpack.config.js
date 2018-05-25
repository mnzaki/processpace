const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('assets/styles/[name].bundle.css');
const postCSSOptions  = require('./postcss.config.js');

const extractCommons = new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    filename: 'assets/js/commons.js'
});

const config = {
    context: path.resolve(__dirname, 'src'),
    devtool: 'eval-source-map',
    entry: {
        index: './index.js',
        uikit: './uikit.js',
        contact: './contact.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/js/[name].bundle.js'
    },

    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [path.resolve(__dirname, "src"), "node_modules"]
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['env', { modules: false }]
                        ]
                    }
                }]
            },
            {
                test: /\.scss$/,
                loader: extractCSS.extract([
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: postCSSOptions
                    },
                    {
                        loader: 'sass-loader'
                    }
                ])
            },

            {
                test: /\.(png|jpg)$/,
                use: [{
                    loader: 'file-loader?name=assets/images/[name].[ext]'
                }]
            },
            {
                test: /(^-partial)?\.html$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'html-loader',
                        options: {
                            interpolate: true,
                            attrs: ['img:src']
                        }
                    }
                ]
            },

            {
                test: /\.jsx$/,
                loader: 'surplus-loader'
            },

        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        extractCSS,
        extractCommons
    ]
};

module.exports = config;
