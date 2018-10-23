import fs from 'fs';
import path from 'path';
import AssetsPlugin from 'assets-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import NodemonPlugin from 'nodemon-webpack-plugin';
import OfflinePlugin from 'offline-plugin';
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import pkg from '../../package';
import { DEV, ENV, SYSPATH } from '../../config';

const isAnalyze = process.env.ANALYZE_MODE === 'enabled';
const jsPath = `${SYSPATH['ASSETS']}/js`;
const scssPath = `${SYSPATH['ASSETS']}/scss`;
const sourceMap = !!DEV;

// Vue aliases
const vueAliases = {
  vue$: 'vue/dist/vue.esm.js',
  '@components': `${SYSPATH['ASSETS']}/components`
};

// loop and compute alias with absolute path, respectively
const moduleAliases = {};
Object.keys(pkg._moduleAliases).map(alias => {
  moduleAliases[alias] = `${SYSPATH['ROOT']}/${pkg._moduleAliases[alias]}`;
});

// populate respective module JS and SCSS files as entry points
const getModuleEntry = () => {
  const entryFiles = {};

  fs.readdirSync(jsPath).filter(file => {
    const { name, ext } = path.parse(file);

    if (ext === '.js') {
      entryFiles[name] = [`${jsPath}/${file}`];
    }

    // check if module has .scss file as well
    // if there is, push as part of the module entry point
    const moduleScss = `${scssPath}/${name}.scss`;

    if (fs.existsSync(moduleScss)) {
      entryFiles[name].push(moduleScss);
    }
  });

  return entryFiles;
};

// webpack's cofiguration
const webpackConfig = {
  watch: DEV,
  mode: DEV ? 'development' : 'production',
  devtool: DEV ? 'cheap-module-inline-source-map' : 'source-map',
  context: SYSPATH['SRC'],
  entry: { ...getModuleEntry(), main: `${scssPath}/main.scss` },
  optimization: {
    minimizer: [new UglifyJsPlugin(), new OptimizeCSSAssetsPlugin()],
    splitChunks: {
      cacheGroups: {
        vendor: {
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
    alias: { ...vueAliases, ...moduleAliases }
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
        exclude: [/node_modules/, /scss/],
        use: [
          {
            loader: 'vue-style-loader'
          },
          {
            loader: 'css-loader',
            options: { importLoaders: 1, sourceMap }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      // general Sass file config (except .vue single file components)
      {
        test: /\.(sass|scss)$/,
        exclude: ['/node_modules/', '/components/'],
        use: [
          MiniCssExtractPlugin.loader,
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
        ]
      }
    ]
  },
  plugins: [
    new NodemonPlugin({
      script: `${SYSPATH['ROOT']}/index.js`,
      ignore: ['src/assets', 'node_modules', 'sessions'],
      watch: [SYSPATH['SRC'], `${SYSPATH['BUILD']}/webpack/assets.js`],
      verbose: false,
      ext: 'js'
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: DEV ? 'css/[name].css' : 'css/[name].[contenthash:8].css',
      chunkFilename: DEV ? 'css/[id].css' : 'css/[id].[contenthash:8].css'
    }),
    new AssetsPlugin({
      prettyPrint: true,
      path: `${SYSPATH['BUILD']}/webpack`,
      filename: 'assets.js',
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
