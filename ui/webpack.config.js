require('dotenv').config();
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const envStringified = {
    'process.env': {
        PUBLIC_URL: JSON.stringify(process.env['PUBLIC_URL']),
        NODE_ENV: JSON.stringify(process.env['NODE_ENV'])
    }
};
const devMode = process.env.NODE_ENV !== 'production';

module.exports = (cmdEnv) => {
    const buildDir = 'dist' + path.sep + 'client';
    return {
        entry: {
            'client': './src/index.tsx'
        },
        devServer: {
            contentBase: path.join(__dirname, buildDir),
            compress: true,
            port: (process.env.PORT || 9000)
        },
        output: {
            filename: "[name].js",
            chunkFilename: "[name].chunk.js",
            path: path.resolve(__dirname, buildDir)
        },
        module: {
            rules: [
                {
                    test: /\.(tsx|ts)?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'ts-loader'
                        }
                    ]
                },
                { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
                {
                    test: /\.(styl)$/,
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        "css-loader",
                        "postcss-loader",
                        "stylus-loader"
                    ]
                },
                {
                    test: /\.(css)$/,
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        "css-loader",
                        "postcss-loader"
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'images/'
                            }
                        }
                    ]
                },
                {
                    test: /\.json$/,
                    use: [
                        'empty',
                        {
                            loader: 'file-loader',
                            options: {
                                name: (srcPath) => (path.basename(path.dirname(srcPath)) + path.sep + '[name].[ext]'),
                                outputPath: 'nls'
                            }
                        }
                    ]
                },
                { test: /\.(woff|woff2|eot|ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=100000' }
            ]
        },
        resolve: {
            modules: [path.resolve(__dirname, "src"), "node_modules"],
            extensions: [".ts", ".tsx", ".js"]
        },
        resolveLoader: {
            modules: [
                'node_modules',
                path.resolve(__dirname, 'loaders')
            ]
        },
        plugins: [
            new webpack.DefinePlugin(envStringified),
            new CleanWebpackPlugin([buildDir]),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
            new CopyPlugin(
                ['manifest.json'].map(
                    (item) => ({
                        from: 'src/' + item,
                        to: ''
                    })
                )
            ),
            new HtmlWebpackPlugin({
                title: 'Aggregator',
                PUBLIC_URL: process.env.PUBLIC_URL,
                template: 'src/Libraries/Core/index.html'
            })
        ]
    }
};
