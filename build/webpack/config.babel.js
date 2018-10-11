import 'module-alias/register';
import fs from 'fs';
import path from 'path';
import autoprefixer from 'autoprefixer';
import AssetsPlugin from 'assets-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import NodemonPlugin from 'nodemon-webpack-plugin';
import pkg from '@root/package';
import { DEV, ENV, SYSPATH } from '@config';

// populate respective module JS and SCSS files as entry points
const getEntry = () => {
  const entryFiles = {};
  const jsPath = `${SYSPATH['assets']}/js`;
  const scssPath = `${SYSPATH['assets']}/scss`;

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
  context: SYSPATH['src'],
  entry: getEntry(),
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
    path: SYSPATH['public'],
    filename: DEV ? 'js/[name].js' : 'js/[name].[contenthash:8].js',
    chunkFilename: DEV ? 'js/[id].js' : 'js/[id].[contenthash:8].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
    alias: pkg._moduleAliases
  },
  module: {
    rules: [
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
              ['@babel/preset-env', { modules: false, useBuiltIns: 'usage' }],
              '@babel/preset-react'
            ],
            plugins: [
              '@babel/plugin-transform-strict-mode',
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 2, sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: { plugins: () => [autoprefixer] }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new NodemonPlugin({
      script: `${SYSPATH['root']}/index.js`,
      ignore: ['src/assets', 'node_modules'],
      watch: [SYSPATH['src'], `${SYSPATH['build']}/webpack/assets.js`],
      verbose: false,
      ext: 'js'
    }),
    new MiniCssExtractPlugin({
      filename: DEV ? 'css/[name].css' : 'css/[name].[contenthash:8].css',
      chunkFilename: DEV ? 'css/[id].css' : 'css/[id].[contenthash:8].css'
    }),
    new AssetsPlugin({
      prettyPrint: true,
      path: `${SYSPATH['build']}/webpack`,
      filename: 'assets.js',
      processOutput: assets => `module.exports = ${JSON.stringify(assets)}`
    })
  ]
};

module.exports = webpackConfig;
