const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        './client/index.js',
    ],

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build', 'dist'),
        publicPath: '/dist/',
    },

    devtool: 'none',

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    'babel-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.styl$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'stylus-loader'
                    },
                ],
            }
        ],
    },

    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
    ]
};
