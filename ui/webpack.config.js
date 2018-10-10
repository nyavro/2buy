require('dotenv').config();
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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

const capitalizeFirstLetter = (string) => (string.charAt(0).toUpperCase() + string.slice(1));

const filterKeys = (obj, predicate) => Object.keys(obj).filter(predicate).reduce((res, key) => {res[key] = obj[key]; return res;}, {});

const allEntries = {
    'client': './src/index.tsx'
};

const entries = (env) => filterKeys(allEntries, (key) => [env.ENDPOINT].includes(key));

module.exports = (cmdEnv) => {
    const env = {...process.env, ...cmdEnv};
    const buildDir = 'dist' + path.sep + env.ENDPOINT;
    return {
        entry: entries(env),
        devServer: {
            contentBase: path.join(__dirname, buildDir),
            compress: true,
            port: (process.env.PORT || 9000)
        },
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, buildDir)
        },
        module: {
            rules: [
                // работа с файлами js
                {
                    test: /\.(tsx|ts)?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'ts-loader'
                        }
                        // TODO прикрутить babel-loader
                    ]
                },
                { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
                {
                    test: /\.(css)$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'postcss-loader']
                    })
                },
                {
                    test: /\.(less)$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'postcss-loader', 'less-loader']
                    })
                },
                {
                    test: /\.(styl)$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'postcss-loader', 'stylus-loader']
                    })
                },
                // работы с картинками
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        // загрузка копирование картинок
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'images/'
                            }
                        },
                        // оптимизация изображений
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                bypassOnDebug: true
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
                // нужен для загрузки через цсс
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
            new CleanWebpackPlugin([buildDir]), // чистка директории dist
            new ExtractTextPlugin('[name].css'), // весь css кладет в отдельный бандл
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
