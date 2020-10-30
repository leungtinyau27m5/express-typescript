const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = (env, argv) => {
    require("dotenv").config({
        path: path.resolve(__dirname + ".env.development"),
    });
    return {
        mode: "development",
        entry: "./src/index.ts",
        target: "node",
        node: {
            __dirname: false,
            __filename: false,
        },
        externals: [nodeExternals()],
        module: {
            rules: [{
                test: /\.(js|ts)$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }, ],
        },
        resolve: {
            extensions: ['.ts', '.js'],
            alias: {
                'Route': path.resolve(__dirname, 'src/routes'),
                'Controller': path.resolve(__dirname, 'src/controllers'),
                'Model': path.resolve(__dirname, 'src/models')
            }
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
        }
    };
};