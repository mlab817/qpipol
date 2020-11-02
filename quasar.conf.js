// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js
const path = require('path')

module.exports = function(ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of 'main.js'
    boot: [
      'apollo',
      'copy',
      'loading-defaults',
      'router-auth',
      'v-money',
      'papaparse'
    ],

    css: ['app.styl'],

    extras: [
      // 'ionicons-v4',
      // 'mdi-v3',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      // 'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],

    framework: {
      // iconSet: 'ionicons-v4',
      iconSet: 'svg-material-icons',
      // lang: 'de', // Quasar language

      all: 'auto', // --- includes everything; for dev only!

      // set dark mode to auto
      config: {
        dark: 'auto'
      },

      components: [
        'QBtn',
        'QIcon',
        'QItem',
        'QItemSection',
        'QItemLabel'
      ],

      directives: [
        'TouchPan',
        'Ripple',
        'ClosePopup'
      ],

      // Quasar plugins
      plugins: [
        'BottomSheet',
        'Dialog',
        'LocalStorage',
        'Notify',
        'LoadingBar',
        'Dark',
        'Loading'
      ]
    },

    supportIE: false,

    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      // vueCompiler: true,
      gzip: true,
      analyze: false, // analyze after build
      // extractCSS: false,
      extendWebpack(cfg) {
        cfg.resolve.alias = {
          ...cfg.resolve.alias, // This adds the existing alias

          // Add your own alias like this
          '@': path.resolve(__dirname, './src'),
        }
        // disable eslint, enable before build
         cfg.module.rules.push({
           enforce: 'pre',
           test: /\.(js|vue)$/,
           loader: 'eslint-loader',
           exclude: /node_modules/,
           options: {
             formatter: require('eslint').CLIEngine.getFormatter('stylish')
          }
        });

        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(gql|graphql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader'
        });
      }
    },

    devServer: {
      https: true,
      port: 8080,
      open: true // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    animations: [
      'zoomIn',
      'zoomOut',
      'fadeIn',
      'fadeOut'
    ],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      workboxOptions: { skipWaiting: true }, // only for NON InjectManifest
      manifest: {
        name: 'IPMS',
        short_name: 'IPMS',
        description: 'A Quasar Framework App for IPMS',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#095437',
        icons: [
          {
            src: 'statics/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: 'org.cordova.quasar.app',
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    electron: {
      // bundler: 'builder', // or 'packager'
      bundler: 'packager',

      extendWebpack(cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration
        // appId: 'q-pipol'
      }
    }
  };
};
