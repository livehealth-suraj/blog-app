const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  entry: { main: "./frontend/src/index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash].js"
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    open: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }, { loader: "eslint-loader" }],
      },
      // {
      //     test: /\.css$/,
      //     use: [
      //         {
      //             loader: "style-loader",
      //         },
      //         {
      //             loader: "css-loader",
      //             options: {
      //                 modules: true,
      //                 importLoaders: 1,
      //                 localIdentName: "[name]_[local]_[hash:base64]",
      //                 sourceMap: true,
      //                 minimize: true
      //             }
      //         }
      //     ]
      // },
      {
        test: /\.(css|scss)?$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin("dist", {}),
    new MiniCssExtractPlugin({
      filename: "style.[contenthash].css"
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: "./frontend/templates/frontend/index.html",
      filename: "./index.html"
    }),
    new WebpackMd5Hash(),
    new StyleLintPlugin({
      configFile: './stylelint.config.js',
      files: './src/scss/*.scss',
      syntax: 'scss'
    })
  ]
};