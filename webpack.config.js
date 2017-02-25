let path = require('path');

module.exports = {
    entry: ['babel-polyfill',
        './client/index.js'
    ],
    output: {
        path: path.join(__dirname, 'build', 'js'),
        filename: 'bundle.js',
        publicPath: '/build/js'
    },
    module: {
        loaders: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass'],
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
            }
        ],
    },
    devtool: 'source-map'
}
