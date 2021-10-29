module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/_variable.scss";@import "@/styles/_common.scss";`,
      },
    },
  },
  devServer: {
    port: 8081,
    host: "0.0.0.0",
    historyApiFallback: true,
    disableHostCheck: true,
    noInfo: true,
    proxy: {  //配置跨域
      '/api': {
        target: 'http://localhost:8080',  //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true,  //允许跨域
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      },
    }
  },
};
