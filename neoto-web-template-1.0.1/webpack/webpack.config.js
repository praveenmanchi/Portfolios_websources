const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const fs = require('fs')

let envi = process.env.NODE_ENV
let isProduction
if(envi){
    isProduction = envi.includes('production')
}
else {
    isProduction = false
    envi = 'development'
}
   
let mode

if(isProduction)
    mode = 'production'
else
    mode = 'development'

let templates = [];
let dir = 'src/template';
let files = fs.readdirSync(dir);

files.forEach(file => {
    if (file.match(/\.pug$/)) {
        let filename = file.substring(0, file.length - 4);
        templates.push(
            new HtmlWebpackPlugin({
                template: dir + '/' + filename + '.pug',
                filename: filename + '.html',
                inject: false
            })
        );
    }
});

let templatesDocs = [];
let dirDocs = 'src/documentation';
let filesDocs = fs.readdirSync(dirDocs);

filesDocs.forEach(file => {
    if (file.match(/\.pug$/)) {
        let filename = file.substring(0, file.length - 4);
        templatesDocs.push(
            new HtmlWebpackPlugin({
                template: dirDocs + '/' + filename + '.pug',
                filename: '../documentation/' + filename + '.html',
                inject: false,
            })
        );
    }
});

console.log(mode)

module.exports = {
    entry: {
        main: './src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sourceMap: true,
                            minimize: false,
                            outputStyle: 'expanded'
                        }
                    }
                ]
            },
            {
                test: /\.(svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                            name: '[name].[ext]'
                        }
                    },
                    {
                        loader: 'image-process-loader',
                        options: {
                            presets: {
                                blur: {
                                    blur: isProduction ? 30 : 0.3,
                                    jpeg: {
                                        quality: isProduction ? 50 : 100,
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: 'pug-loader',
                        options: {
                            pretty: isProduction ? true : false,
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'fonts'
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { 
                    from: path.resolve(__dirname, 'src/template/favicon'),
                    to: path.resolve(__dirname, 'dist/'+mode+'/template/favicon'),
                },
                { 
                    from: path.resolve(__dirname, 'src/template/sass/custom.css'),
                    to: path.resolve(__dirname, 'dist/'+mode+'/template/css/custom.css'),
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
            options: {
                outputStyle: isProduction ? 'expanded' : 'compressed'
            }
        }),
        ...templates,
        ...templatesDocs,
        new HtmlWebpackPugPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist/development'),
        compress: true,
        port: 9000,
        open: true
    },
    mode: mode,
    output: {
        path: path.resolve(__dirname, 'dist/'+mode+'/template'),
        filename: '[name].bundle.js'
    }
}