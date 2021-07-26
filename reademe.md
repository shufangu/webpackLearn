

## 开发准备

webpack 学习第二集

  * webpack 没有被引用的函数是不会打包到bundle.js 里面的
  * 浏览器的兼容性 （针对css特性以及js语法）
    * 前端目前已经非常工程化了，列如很多加前缀的css. (autoprefiexer) 取决于要兼容的浏览器 
    * [查看兼容的网址](https://www.caniuse.com/)
    * browserslist 工具



Browserslist 是什么？ Browserlist 是一个在不同的前端工具，共享目标浏览器和node.js版本的配资
  * Autoprefixer
  * babel 
  * postcss-preset-env 
  * eslint-plugin-compat 
  * stylelint-no-unsupported-browser-features
  * postcss-normalize
  * obsolete-webpack-plugin

browserslist的配置可以写入到package.json里面， 也可以直接配置.browserslistrc 文件
  ```js
  "browserslist": [
    "last 2 version",
    "> 0.1%",
    "not dead"
  ]
  ```

  ```
  # Browsers that we support 
 
  last 1 version
  > 1%
  maintained node versions
  not dead
  
  ```


通过postcss-cli 单独对每个css文件进行处理需要下载postcss-cli
  *  npx postcss --use autoprefixer -o result.css ./src/css/test.css (postcss postcss-cli)


postcss 的配置可以配置到package.json里面， 也可以直接配置到根目录的.postcss.config.js 文件中
```js
module.exports = {
  plugins: [
    "postcss-preset-env"
  ]
}
```


url-loader filer-loader 相关loader学习
  * 有url-loader 的时候就不用引用filer-loader了
  
资源配置（替代url-loader file-loader）
 * [asset module type](https://webpack.docschina.org/guides/asset-modules/) 

Loader 是用于**特定的模块**类型进行转换

plugin可以用于**执行更加广泛的任务**，比如打包优化，资源管理，环境变量注入

## DefinePlugin 
 DefinePlugin 允许在 编译时 创建配置的全局常量，这在需要区分开发模式与生产模式进行不同的操作时，非常有用.




## 分析source-map 
- 目前的source-map 长什么样子
  1. **version**: 当前使用版本（看源码时是第三版本）
  2. **sources**: 从哪些文件转换过来的source-map和打包的代码（最初的文件）
  3. **names**: 转换钱的变量和属性名称（使用development模式时，不需要保留转换前的名称）
  4. **mapping**: soure-map用来和源文件映射的信息（比如位置等），一串base64 VLQ(veriable-length quantity 可变长度值)编码
  5. **file**: 打包后的文件（浏览器加载的文件）
  6. **sourceContent**: 转换前的具体代码信息
  7. **sourceRoot**: 所有的sources相对的根目录 

### 相关map源码如下
```js
{
    "version": 3,
    "sources": [
        "webpack://webpack-study/./src/style.css",
        "webpack://webpack-study/./node_modules/_css-loader@5.2.4@css-loader/dist/runtime/api.js",
        "webpack://webpack-study/./node_modules/_css-loader@5.2.4@css-loader/dist/runtime/cssWithMappingToString.js",
        "webpack://webpack-study/./node_modules/_css-loader@5.2.4@css-loader/dist/runtime/getUrl.js",
        "webpack://webpack-study/./src/img/bg.png",
        "webpack://webpack-study/./src/img/pass.png",
        "webpack://webpack-study/./node_modules/_lodash@4.17.21@lodash/lodash.js",
        "webpack://webpack-study/./src/style.css?ef97",
        "webpack://webpack-study/./node_modules/_style-loader@2.0.0@style-loader/dist/runtime/injectStylesIntoStyleTag.js",
        "webpack://webpack-study/./src/test.js",
        "webpack://webpack-study/webpack/bootstrap",
        "webpack://webpack-study/webpack/runtime/compat get default export",
        "webpack://webpack-study/webpack/runtime/define property getters",
        "webpack://webpack-study/webpack/runtime/global",
        "webpack://webpack-study/webpack/runtime/hasOwnProperty shorthand",
        "webpack://webpack-study/webpack/runtime/make namespace object",
        "webpack://webpack-study/webpack/runtime/node module decorator",
        "webpack://webpack-study/webpack/runtime/publicPath",
        "webpack://webpack-study/./src/index.js",
        "http://www.porno-sex.xxx/videos/2157148"
    ],
    "names": [],
    "mappings": "此处已省略……………………一堆base64转码",
    "file": "js/main.js",
    "sourcesContent": [],
    "sourceRoot": ""
}
```

cheap-source-map => cheap不会生成对应的map的列报错，只有行提示（低开销的提示）

source-map最佳实践： 
 - 开发阶段： source-map | **cheap-module-source-map**
 - 测试阶段： source-map | cheap-module-source-map
 - 发布阶段： false | (none)不写

验证 devtool 名称时， 我们期望使用某种模式， 注意不要混淆 devtool 字符串的顺序.
模式是： [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map.

> ## Warning
> 你应该将你的服务器配置为，不允许普通用户访问 source map 文件！
---

## babel 
@babel/cli 命令行中使用的，webpack 中不用单独下载
@babel/preset-env 预设(如果需要转换的过多，我们可以配置这种预设)
npm install -D babel-loader @babel/core @babel/preset-env

babel的底层原理
- babel是如何做到降我们的一段代码（es6, TypeScript, React）转换成另外一段代码（es5）的？
就是编译器，事实上我们可以将babel看成就是一个编译器
- babel也拥有编译器的工作流程
  1. 解析阶段（parsing）
  2. 转换阶段 （Transformation）
  3. 生成阶段 （Code Generation）