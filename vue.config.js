module.exports = {
  chainWebpack: config => {
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')
      config.plugin('html').tap(args => {
        args[0].isProd = true // 设置线上标识
        return args
      })
    })
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
    })
  },
  publicPath:"./",
  outputDir:"dist",
  assetsDir:"static"
}
