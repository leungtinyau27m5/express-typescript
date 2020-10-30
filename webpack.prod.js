const path = require('path')
const nodeExternals = require('webpack-node-externals')
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    watch: true,
    target: 'node',
    externals: [
        nodeExternals()
    ],
    plugins: [
        new WebpackShellPlugin({
            onBuildStart: ['echo "Webpack Start"'],
            onBuildEnd: ['npm run dev']
        })
    ],
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        alias: {
            'Route': path.resolve(__dirname, 'src/routes'),
            'Controller': path.resolve(__dirname, 'src/controllers'),
            'Model': path.resolve(__dirname, 'src/models')
        },
        extensions: ['.ts', '.js']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js'
    }
}