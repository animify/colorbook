const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: [
        './server/core'
    ],
    target: 'node',
    devtool: 'none',
    module: {
        rules: [{
            test: /\.js?$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js'
    }
};
