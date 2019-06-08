const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env','@babel/react'],
                    plugins: ['@babel/proposal-class-properties', '@babel/plugin-syntax-dynamic-import']
                }
            }
        }]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },    
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist',
        hot: true
    },
    devtool: 'eval-source-map'
  }