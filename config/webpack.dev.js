/*
 * @Date: 2021-07-25 22:40:42
 * @Author: gsf
 * @Description: ---
 */
// eslint-disable-next-line import/no-extraneous-dependencies
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

console.log('加载devConfig配置文件');

module.exports = {
  mode: 'development',
  devServer: {
    open: true,
    port: 8081,
    hot: true,
    compress: true,
    watchContentBase: true,
  },
  plugins: [
    // 打包的时候需要删掉, 开发的时候使用
    new ReactRefreshWebpackPlugin(),
  ],
};