const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    plugins: [
                        '@babel/proposal-class-properties',
                        '@babel/plugin-syntax-dynamic-import',
                        'transform-class-properties'
                    ]
                }
            }
        },
        {
            test: /\.html$/,
            use: [
              {
                loader: "html-loader",
                options: { minimize: true }
              }
            ]
          },
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"]
          }]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: '[name].[hash].js'
    },    
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './harness/index.html'
        }),
        new webpack.HashedModuleIdsPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    devServer: {
        contentBase: './dist',
        hot: true
    },
    devtool: 'eval-source-map',
    optimization: {
        runtimeChunk: 'single'
    }
  }