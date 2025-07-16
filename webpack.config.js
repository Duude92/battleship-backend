const path = require('path');
const LazyInjectWebpackPlugin = require('@duude92/lazyinject-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    mode: 'production',
    target: 'node',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        alias: {
            '../utility/commandLoader': path.resolve(
                __dirname,
                './src/utility/commandLoader.webpack.ts'
            )
        },
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    externals: {},
    plugins: [new LazyInjectWebpackPlugin()]
};
