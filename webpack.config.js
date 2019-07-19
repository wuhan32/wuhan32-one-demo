const path = require('path')

const webpack = require('webpack')

const htmlWebpackPlugin = require('html-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

// const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: path.join(__dirname, './src/main.js'),// 入口，表示，要使用 webpack 打包哪个文件
    output: { // 输出文件相关的配置
      path: path.join(__dirname, './dist'), // 指定 打包好的文件，输出到哪个目录中去
      filename: 'bundle.js' // 这是指定 输出的文件的名称
    },
    mode:"development",
    plugins: [ //配置插件的节点
      new htmlWebpackPlugin({
        template: path.join(__dirname, './src/index.html'), // 指定 模板页面，将来会根据指定的页面路径，去生成内存中的 页面
        // filename: 'index.html' // 指定生成的页面的名称
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
        chunkFilename: "[name].[contenthash].css"
    }),
      new VueLoaderPlugin()
  
    ],
    module: { // 这个节点，用于配置 所有 第三方模块 加载器 
      rules: [ // 所有第三方模块的 匹配规则
        { test: /\.css$/, use: [ MiniCssExtractPlugin.loader, 'css-loader'] },//  配置处理 .css 文件的第三方loader 规则
        { test: /\.less$/,use:['style-loader', 'css-loader','less-loader']},//配置处理 .less文件的第三方 loader 规则
        { test: /\.scss$/,use:['style-loader', 'css-loader','scss-loader']},//配置处理 .scss文件的第三方 loader 规则
        { test: /\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},//配置处理 字体图标 的第三方 loader 规则
        { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]' }, // 处理 图片路径的 loader
        { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, // 配置 Babel 来转换高级的ES语法
        { test: /\.vue$/,use:'vue-loader'}, //配置处理 .vue 文件的 第三方 loader 规则
      ]
    }
}