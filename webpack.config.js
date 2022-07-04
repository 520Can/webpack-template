const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const copyWebpackplugin = require("copy-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require("path");
const Webpack = require("webpack");

const pages = ["index", "login", "register"];
module.exports = {
  mode: "development",
  //   mode: "production",
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./src/public/index.html",
      filename: "index.html",
      chunks: ["index"],
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new copyWebpackplugin({
      patterns: [{ from: "./src/assets", to: "./assets" }],
    }),
    new CleanWebpackPlugin(),
    new Webpack.ProvidePlugin({
      $: "jquery",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/i,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  performance: {
    hints: false,
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserWebpackPlugin(), new CssMinimizerPlugin()],
  },
  devServer: {
    port: 8888,
    open: "index.html",
    hot: true,
  },
  devtool: "inline-source-map",
};
