require('module-alias/register');
const fs = require('fs');
const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const pkg = require('@root/package');
const { DEV, ENV, SYSPATH } = require('@config');

const isAnalyze = process.env.ANALYZE_MODE === 'enabled';
const sourceMap = !!DEV;
const { assign } = Object;

// Vue aliases
const vueAliases = {
  vue$: 'vue/dist/vue.esm.js',
  '@components': `${SYSPATH['ASSETS']}/components`
};

// populate respective module JS and SCSS files as entry points
const getModuleEntry = (targetDir = `${SYSPATH['ASSETS']}/js`) => {
  const entryFiles = {};

  fs.readdirSync(targetDir).filter(file => {
    const { name, ext } = path.parse(file);

    if (ext === '.js') {
      entryFiles[name] = [`${SYSPATH['ASSETS']}/js/${file}`];
    }

    // we don't need `offline.js` for development
    if (DEV) {
      delete entryFiles.offline;
    }

    // check if module has .scss file as well
    // if there is, push as part of the module entry point
    const moduleScss = `${SYSPATH['ASSETS']}/scss/${name}.scss`;

    if (fs.existsSync(moduleScss)) {
      entryFiles[name].push(moduleScss);
    }
  });

  return entryFiles;
};

// loaders for styles
const getStyleLoaders = () => {
  return [
    {
      loader: 'css-loader',
      options: { importLoaders: 2, sourceMap }
    },
    {
      loader: 'postcss-loader'
    },
    {
      loader: 'sass-loader',
      options: { sourceMap }
    }
  ];
};

// loaders for image/font rule
const getFileLoaders = (options = {}) => {
  return [
    {
      loader: 'url-loader',
      options: assign(
        {
          fallback: 'file-loader',
          limit: 10240,
          emitFile: true
        },
        options
      )
    }
  ];
};

// webpack's cofiguration
const webpackConfig = {
  watch: DEV,
  mode: DEV ? 'development' : 'production',
  devtool: DEV ? 'cheap-module-inline-source-map' : 'source-map',
  context: SYSPATH['SRC'],
  // for more about performance hints
  // @see: https://webpack.js.org/configuration/performance/#performance
  performance: {
    maxEntrypointSize: 400000,
    maxAssetSize: 400000
  },
  entry: assign(
    { main: `${SYSPATH['ASSETS']}/scss/main.scss` },
    getModuleEntry()
  ),
  optimization: {
    minimizer: [new UglifyJsPlugin(), new OptimizeCSSAssetsPlugin()],
    splitChunks: {
      cacheGroups: {
        vendor: {
          reuseExistingChunk: true,
          test: /node_modules/,
          chunks: 'all',
          name: 'vendor'
        }
      }
    }
  },
  output: {
    publicPath: ENV['PUBLIC_PATH'],
    path: SYSPATH['PUBLIC'],
    filename: DEV ? 'js/[name].js' : 'js/[name].[contenthash:8].js',
    chunkFilename: DEV ? 'js/[id].js' : 'js/[id].[contenthash:8].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.vue'],
    alias: assign(pkg._moduleAliases, vueAliases)
  },
  module: {
    rules: [
      // rule for Vue's Single File Components (SFCs)
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            compact: false,
            cacheDirectory: !!DEV,
            presets: [
              ['@babel/preset-env', { modules: false, useBuiltIns: 'usage' }]
            ],
            plugins: [
              '@babel/plugin-transform-strict-mode',
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      },
      // Vue specific style config for SFCs
      {
        test: /\.(sass|scss|css)$/,
        exclude: [/node_modules/, `${SYSPATH['ASSETS']}/scss`],
        use: [{ loader: 'vue-style-loader' }, ...getStyleLoaders()]
      },
      // general Sass file config (except .vue single file components)
      {
        test: /\.(sass|scss)$/,
        exclude: ['/node_modules/', `${SYSPATH['ASSETS']}/components`],
        use: [MiniCssExtractPlugin.loader, ...getStyleLoaders()]
      },
      {
        test: /\.(svg|png|jpe?g|gif)(\?.*)?$/i,
        use: getFileLoaders({ name: 'img/[name].[ext]' })
      },
      {
        test: /\.(eot|ttf|woff2?)(\?.*)?$/i,
        use: getFileLoaders({ name: 'fonts/[name].[ext]' })
      }
    ]
  },
  plugins: [
    new NodemonPlugin({
      ext: 'js',
      verbose: false,
      script: `${SYSPATH['ROOT']}/index.js`,
      ignore: ['resources/assets', 'node_modules', 'storage/sessions'],
      watch: [
        SYSPATH['SRC'],
        SYSPATH['UTILS'],
        `${SYSPATH['RESOURCES']}/webpack/assets.js`
      ]
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: DEV ? 'css/[name].css' : 'css/[name].[contenthash:8].css',
      chunkFilename: DEV ? 'css/[id].css' : 'css/[id].[contenthash:8].css'
    }),
    new AssetsPlugin({
      filename: 'assets.js',
      prettyPrint: true,
      path: `${SYSPATH['RESOURCES']}/webpack`,
      processOutput: assets => `module.exports = ${JSON.stringify(assets)}`
    })
  ].concat(
    DEV
      ? []
      : [
          new OfflinePlugin({
            externals: ['/'],
            publicPath: ENV['PUBLIC_PATH'],
            relativePaths: false, // to allow using publicPath
            ServiceWorker: { events: true }, // use ServiceWorker for offline usage
            AppCache: false // disable for AppCache
          }),
          // for more webpack bundle analyzer options,
          // @see: https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin
          new BundleAnalyzerPlugin({
            analyzerMode: isAnalyze ? 'server' : 'disabled',
            openAnalyzer: isAnalyze
          })
        ]
  )
};

module.exports = webpackConfig;
