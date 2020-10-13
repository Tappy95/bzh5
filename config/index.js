'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api':{
        //  target:'http://192.168.1.226:8082/', //小明
        // target:'http://192.168.1.53:8082/', //志伟
         target:'http://192.168.1.193:8082/', //测试环境
        // target:'https://proxy.bzlyplay.com/', //测试环境
        changeOrigin:true,
        pathRewrite:{
          '^/api': ''
        }
      },
      '/wish':{
        //  target:'http://192.168.1.226:8082/', //小明
        // target:'http://192.168.1.53:8082/', //志伟
         target:'http://192.168.1.193:8091/', //测试环境
        // target:'https://proxy.bzlyplay.com/', //测试环境
        changeOrigin:true,
        pathRewrite:{
          '^/wish': ''
        }
      },
      '/guess': {
        // target: 'http://192.168.1.226:8087/',//小明
        // target: 'http://192.168.1.21:8087/',//志伟
        target:'http://192.168.1.193:8087/', //测试环境
        // target:'https://proxy.bzlyplay.com/', //测试环境
        changeOrigin: true,
        pathRewrite: {
          '^/guess': ''
        }
      },
      '/push': {
        // target: 'http://192.168.0.216:8087/',//小明
        // target: 'http://192.168.1.21:8080/',//志伟
        target:'http://192.168.1.193:8080/', //测试环境
        // target:'https://proxy.bzlyplay.com/', //测试环境
        changeOrigin: true,
        pathRewrite: {
          '^/push': ''
        }
      },
      '/task': {
        // target: 'http://192.168.1.226:8089/',//小明
        // target: 'http://192.168.1.21:8089/',//志伟
        target:'http://192.168.1.193:8089/', //测试环境
        // target:'https://proxy.bzlyplay.com/', //测试环境
        changeOrigin: true,
        pathRewrite: {
          '^/task': ''
        }
      }
    },

    // Various Dev Server settings
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
