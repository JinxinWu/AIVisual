const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭语法检查
  lintOnSave: false,
  // 开启代理服务器
  devServer: {
    port: 80,
    proxy: {
      '/guo': {
        target: 'http://localhost:8000',
        pathRewrite: {'^/guo': ''}, // 将/api开头的请求地址重写
        changeOrigin: true,
        ws: true,
      },
      '/foo': {
        target: 'http://localhost:5001',
        pathRewrite: {'^/foo': ''},
        ws: true,
        changeOrigin: true
      },
    }
  }
})
