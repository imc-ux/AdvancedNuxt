export default {
  title: 'H5_Nuxt',
  devServer: {
    host: '127.0.0.1',
    port: 8011,
  },
  test: /\.ts$/,
  exclude: [/node_modules/, /vendor/, /\.nuxt/],
  loader: 'ts-loader',
  options: {
    appendTsSuffixTo: [/\.vue$/, /TSX\.vue$/],
    transpileOnly: true,
  },
  buildModules: ['@nuxt/typescript-build'],
  router: {
    linkActiveClass: 'active',
    extendRoutes(routes: any, resolve: any) {
      routes.splice(0);
      routes.push(
        ...[
          {
            path: '',
            name: 'settings',
            component: resolve(__dirname, 'pages/settings/'),
          },
        ]
      );
    },
  },
  css: ['element-plus/dist/index.css'],
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
      },
    ],
  ],
  ssr: false,
  app: {
    baseURL: '/cusys/nuxt/',
    buildAssetsDir: '/static/',
  },

  // modules: ['@element-plus/nuxt'],
  // plugins: [
  //   {
  //     src: '~/plugins/nuxt-quill-plugin.js',
  //     ssr: false, //仅在客户端渲染
  //   },
  // ],
};
