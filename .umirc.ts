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
    '/weather/': {
      target: proxyTarget,
      changeOrigin: true,
      pathRewrite: { '^/weather': '/weather' },
    },
  },
};

export default config;
