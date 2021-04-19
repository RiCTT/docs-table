// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

function resolve (p) {
  return path.join(__dirname, p)
}

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude.add(resolve('./src/components/wheel-icon/svg'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('./src/components/wheel-icon/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
