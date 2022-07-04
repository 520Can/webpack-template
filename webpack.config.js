const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const copyWebpackplugin = require("copy-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const path = require("path");
const Webpack = require("webpack");

const pages = ["index"];
module.exports = {
  mode: "development",
  //   mode: "production",
  entry: {
    // index: "./src/index.js",
    ...pages.reduce((value, page) => {
      return {
        ...value,
        [page]: `./src/js/${page}.js`,
      };
    }, {}),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
  },
  plugins: [
    ...pages.map((page) => {
      return new htmlWebpackPlugin({
        template: `./src/pages/${page}.html`,
        filename: `${page}.html`,
        chunks: [page],
      });
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
    new FriendlyErrorsPlugin(),
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
    runtimeChunk: "single",
  },
  devServer: {
    port: 8888,
    open: "index.html",
    hot: true,
    client: {
      logging: "error", //只打印报错，其实只要这个配置就好了
      overlay: {
        //有报错发生，直接覆盖浏览器视窗，显示错误
        errors: true,
        warnings: false,
      },
    },
  },
  devtool: "inline-source-map",
  stats: "errors-only",
};
