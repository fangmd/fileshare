const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  assetsDir: 'static',
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'FileShare'
      return args
    })

    config.module
      .rule('images')
      .test(/\.(png|jpg|jpeg|gif|svg|svgz)$/i)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true,
      })
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new CompressionPlugin({
          test: /\.js$|\.html$|.\css/,
          threshold: 10240, //对超过10k的数据压缩
          deleteOriginalAssets: false,
        })
      )
      // config.plugins.push()
      config.optimization.minimizer.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_debugger: true,
              drop_console: true,
            },
          },
          sourceMap: false,
          parallel: true,
        })
      )
    } else {
      config.devtool = 'source-map'
    }
  },
  productionSourceMap: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/assets/css/variable.less')],
    },
  },
  devServer: {
    host: '0.0.0.0',
    port: 9000,
    open: true,
    // https: {
    //   key: selfSigned.key,
    //   cert: selfSigned.cert,
    // },
    proxy: {
      '/public': {
        target: 'http://127.0.0.1:3002',
      },
      '/api': {
        target: 'http://127.0.0.1:3002',
      },
    },
  },
}
