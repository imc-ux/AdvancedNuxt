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
          {
            path: '/:id',
            component: resolve(__dirname, 'pages/settings/[id].vue'),
          },
        ]
      );
    },
  },
  css: ['element-plus/dist/index.css', { src: '~/assects/scss/main.scss', lang: 'scss' }],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: ['import', 'color-functions', 'legacy-js-api', 'global-builtin'],
          additionalData: `@use "~/assects/scss/_variable.scss" as *;@use "~/assects/scss/_mixin.scss" as *;`,
        },
      },
    },
  },
  unocss: {
    nuxtLayers: true,
  },
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
      },
    ],
    ['@unocss/nuxt'],
  ],
  ssr: false,
  app: {
    baseURL: '/cusys/nuxt/',
    buildAssetsDir: '/static/',
  },
  alias: {
    '@@': '/<rootDir>',
  },

  // modules: ['@element-plus/nuxt'],
  // plugins: [
  //   {
  //     src: '~/plugins/nuxt-quill-plugin.js',
  //     ssr: false, //仅在客户端渲染
  //   },
  // ],
};
