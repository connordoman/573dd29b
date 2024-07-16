const path = require("path");
/**
 * @type {import("html-webpack-plugin")}
 */
const HtmlWebPackPlugin = require("html-webpack-plugin");

/**
 * @type {import("webpack").Configuration}
 */
module.exports = {
    entry: "./src/index.tsx",
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    plugins: [
        /**
         * @type {HtmlWebPackPlugin}
         */
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html",
        }),
    ],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        // libraryTarget: "module",
    },
    // experiments: {
    //     outputModule: true,
    // },
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        compress: true,
        port: 9000,
        historyApiFallback: true,
    },
};
