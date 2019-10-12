/**
 * 不是真实的 webpack 配置，仅为兼容 webstorm 和 intellij idea 代码跳转
 * ref: https://github.com/umijs/umi/issues/1109#issuecomment-423380125
 */

module.exports = {
  resolve: {
    alias: {
      '@': require('path').resolve(__dirname, 'src'),
      'component': require('path').resolve(__dirname, 'src/components'),
      'assets': require('path').resolve(__dirname, 'src/assets'),
      'libs': require('path').resolve(__dirname, 'src/libs'),
      'services': require('path').resolve(__dirname, 'src/services'),
    },
  },
};
