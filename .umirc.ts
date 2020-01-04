import { IConfig } from 'umi-types';

const proxyTarget = 'https://api.heweather.net/s6';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index' },
        {
          path: '/cities',
          component: '../pages/cities',
        },
        {
          path: '/neBulaMap',
          component: '../pages/neBulaMap',
        },
        {
          path: '/detail',
          component: '../pages/detail',
        },
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: false,
        dva: false,
        dynamicImport: false,
        title: 'weather',
        dll: false,

        routes: {
          exclude: [/components\//],
        },
      },
    ],
  ],
  proxy: {
    '/weather': {
      target: proxyTarget,
      changeOrigin: true,
      pathRewrite: { '^/weather': '/weather' },
    },
    '/air': {
      target: proxyTarget,
      changeOrigin: true,
      pathRewrite: { '^/air': '/air' },
    },
    '/map': {
      target: proxyTarget,
      changeOrigin: true,
      pathRewrite: { '^/map': '/map' },
    }
  },
};

export default config;
