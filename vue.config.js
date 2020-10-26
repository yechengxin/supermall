const path = require('path');//引入path模块
function resolve(dir) {
  return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}
module.exports = {
  publicPath:"./",
  chainWebpack: (config) => {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
      .set('assets', resolve('src/assets'))
      .set('network', resolve('src/network'))
      .set('common', resolve('src/common'))
  }
}