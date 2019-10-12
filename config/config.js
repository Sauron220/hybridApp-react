import path from 'path';
import pxtorem from 'postcss-pxtorem';
import pageRoutes from './config.router';

const resolve = dir => path.resolve(__dirname, dir);

// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  history: 'hash',
  publicPath: './',
  routes: pageRoutes,
  alias: {
    '@': resolve('../src'),
    'component': resolve('../src/components'),
    'layout': resolve('../src/layouts'),
    'page': resolve('../src/pages'),
    'model': resolve('../src/models'),
    'locales': resolve('../src/locales'),
    'assets': resolve('../src/assets'),
    'libs': resolve('../src/libs'),
    'services': resolve('../src/services'),
    '_conf': resolve('../src/config'),
  },
  extraPostCSSPlugins: [
    pxtorem({
      rootValue: 75,
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: ['.am-'],
      replace: true,
      mediaQuery: false,
      minPixelValue: 12
    })
  ],
  sass: {},
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: {
        hmr: true,
      },
      dynamicImport: { webpackChunkName: true },
      title: {
        defaultTitle: 'AG',
        useLocale: true
      },
      dll: true,
      // hd: true,
      fastClick: false,
      locale: {
        enable: true,
        default: 'en-US',
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
      scripts: [
        { src: '<%= PUBLIC_PATH %>iconfont/iconfont.js' },
      ],
    }],
  ],
  targets: {
    android: 5,
    ios: 7,
    chrome: 58,
    ie: 9,
  },
  autoprefixer: {
    flexbox: true,
  },
  // browserslist: [
  //   "> 1%",
  //   'iOS > 7',
  //   'Android > 4',
  //   'last 2 versions'
  // ],
}
