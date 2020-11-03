const path = require('path')
const nodeExternals = require('webpack-node-externals')
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = () => {
    require('dotenv').config({
        path: path.resolve(__dirname, '.env.production')
    })
    return {
        mode: 'production',
        entry: './src/index.ts',
        watch: true,
        target: 'node',
        externals: [
            nodeExternals()
        ],
        plugins: [
            new WebpackShellPlugin({
                onBuildStart: ['npm run clean:dev && npm run clean:prod'],
                onBuildEnd: ['npm run prod']
            })
        ],
        module: {
            rules: [{
                test: /[\\/]src[\\/]models[\\/]\.(ts|js)$/,
                loader: 'ts-loader',
                options: {
                    outputPath: 'models',
                    name: '[name].[ext]'
                }
            }, {
                test: /\.(ts|js)$/,
                use: [{
                    loader: 'ts-loader'
                }, {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/typescript'],
                        plugins: ['@babel/transform-runtime', '@babel/plugin-syntax-dynamic-import'],
                    }
                }],
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
        },
        optimization: {
            moduleIds: "hashed",
            splitChunks: {
                chunks: "all",
                minSize: 1000 * 600,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                automaticNameDelimiter: '~',
                name: true,
                cacheGroups: {
                    vendors: {
                        name: "node_vendors",
                        test: /[\\/]node_modules[\\/]/,
                        chunks: 'all',
                        minChunks: 2,
                        priority: -10
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            },
        },
    }
}