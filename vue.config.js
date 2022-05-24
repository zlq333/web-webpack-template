const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];

let outputDir = process.env.VUE_APP_BUILDENV;
if (outputDir === 'prod') outputDir = 'dist';

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  publicPath: './',
  outputDir: outputDir,
  assetsDir: 'static',
  devServer: {
    open: true,
    port: 9621
    // proxy: {
    //   '/': {
    //     target: 'http://yapi.sijibao.co/mock/401',
    //     changeOrigin: true
    //     // pathRewrite: {
    //     //   '^/jira': ''
    //     // }
    //   }
    // }
  },
  configureWebpack: config => {
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          // 单独打包mock-menu
          'mock-menu': {
            name: 'mock-menu',
            test: /[\\/]src[\\/]mock[\\/]mock-menu/,
            minChunks: 1,
            minSize: 0,
            chunks: 'all',
            priority: 4
          }
        }
      }
    };

    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path][base].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })
      );
    } else {
      // 为开发环境修改配置...
    }
  },
  chainWebpack: config => {
    // preload 表示让浏览器提前加载指定资源(加载后并不执行)，需要执行时再执行 不会阻塞页面渲染
    // config.plugins.delete('preload'); // 可以删除preload(最好不要删)
    // prefetch 用来告诉浏览器在页面加载完成后，利用空闲时间提前获取用户未来可能会访问的内容
    // 如果是移动端应用 对流量敏感 可以移除prefetch
    // config.plugins.delete('prefetch');
  }
};
