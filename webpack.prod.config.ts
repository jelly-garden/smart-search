import path from "path";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
const { ESBuildMinifyPlugin } = require("esbuild-loader");
const webpack = require("webpack");
require("dotenv").config();

const config: Configuration = {
    mode: "production",
    entry: "./src/index.tsx",
    output: {
        pathinfo: false,
        path: path.resolve(__dirname, "build"),
        filename: "[name]-[chunkhash].js",
        assetModuleFilename: "images/[hash][ext][query]",
        publicPath: process.env.REACT_APP_URL,
        clean: true,
    },
    cache: { type: "filesystem" },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: "esbuild-loader",
                options: {
                    loader: "tsx",
                    target: "es2015",
                    tsconfigRaw: require("./tsconfig.json"),
                },
            },
            {
                test: /\.(js|jsx)$/,
                loader: "esbuild-loader",
                options: {
                    loader: "jsx",
                    target: "es2015",
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                    {
                        loader: "esbuild-loader",
                        options: {
                            loader: "css",
                            minify: true,
                        },
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                    filename: "./fonts/[name][ext]",
                },
            },
        ],
    },
    optimization: {
        minimizer: [
            new ESBuildMinifyPlugin({
                target: "es2015",
                css: true,
            }),
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        fallback: {
            buffer: require.resolve("buffer"),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html",
            favicon: "public/favicon.ico",
            env: process.env,
        }),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env),
        }),
        new ESLintPlugin({
            extensions: ["js", "jsx", "ts", "tsx"],
        }),
        new CopyPlugin({
            patterns: [
                { from: "public/favicon.ico", to: "favicon.ico", noErrorOnMissing: true },
            ],
        }),
        new webpack.ProvidePlugin({
            Buffer: ["buffer", "Buffer"],
        }),
    ],
    devtool: false,
    performance: {
        hints: false,
    },
};

export default config;
