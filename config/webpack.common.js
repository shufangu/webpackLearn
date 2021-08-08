/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { merge } = require('webpack-merge');
const resolveApp = require('./paths');

const prodConfig = require('./webpack.prod');
const devConfig = require('./webpack.dev');

const commonConfig = isProduction => ({
  entry: {
    index: './src/index.js',
  },
  output: {
    path: resolveApp('./build'),
    filename: 'js/[name].[chunkhash:6].bundle.js',
    chunkFilename: 'js/[name].[contenthash:6].chunk.js',
    publicPath: '',
  },
  resolve: {
    alias: {
      '@': resolveApp('./src'),
      pages: resolveApp('./src/pages'),
    },
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
  },
  module: {
    rules: [
      {
        test: /\.md$/i,
        use: [
          // "html-loader",
          "md-loader"
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          'eslint-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.css/i,
        // style-lodader -> development
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                  ],
                ],
              },
            },
          },
        ],
        sideEffects: true, // react 脚手架中
      },
    ],
  },
  resolveLoader: {
    modules: ["node_modules", "./lz-loaders"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      // inject: "body"
      cache: true, // 当文件没有发生任何改变时, 直接使用之前的缓存
      minify: isProduction ? {
        removeComments: false, // 是否要移除注释
        removeRedundantAttributes: false, // 是否移除多余的属性
        removeEmptyAttributes: true, // 是否移除一些空属性
        collapseWhitespace: false,
        removeStyleLinkTypeAttributes: true,
        minifyCSS: true,
        minifyJS: {
          mangle: {
            toplevel: true,
          },
        },
      } : false,
    }),
    // 当在代码中遇到某一个变量找不到时, 我们会通过ProvidePlugin, 自动导入对应的库
    // new webpack.ProvidePlugin({
    //   axios: "axios",
    //   get: ["axios", "get"]
    // })
  ],
});

module.exports = (env) => {
  console.log('我就是输出对象');
  console.log(env);
  const isProduction = env.production;
  process.env.NODE_ENV = isProduction ? 'production' : 'development';

  const config = isProduction ? prodConfig : devConfig;
  const mergeConfig = merge(commonConfig(isProduction), config);

  return mergeConfig;
};