require('module-alias/register');

const fs = require('fs');
const path = require('path');
const isDev = require('isdev');
const AssetsPlugin = require('assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const pkg = require('@root/package');
const syspath = require('@config/syspath');

const publicPath = '/js/';

// populate JS modules from `./src/assets/js` for multiple entries
const getEntryFiles = () => {
  const entryFiles = {};
  const jsPath = `${syspath.assets}/js`;

  fs.readdirSync(jsPath).filter(file => {
    const { name, ext } = path.parse(file);

    if (ext === '.js') {
      entryFiles[name] = `${jsPath}/${file}`;
    }
  });

  return entryFiles;
};

const webpackConfig = {
  watch: isDev,
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'cheap-module-inline-source-map' : 'source-map',
  context: syspath.src,
  entry: getEntryFiles(),
  optimization: {
    minimizer: [new UglifyJsPlugin()],
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
    publicPath,
    path: `${syspath.public}${publicPath}`,
    filename: isDev ? '[name].js' : '[name].[contenthash].js',
    chunkFilename: isDev ? '[id].js' : '[id].[contenthash].js'
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
            compact: false,
            cacheDirectory: !!isDev
          }
        }
      }
    ]
  },
  plugins: [
    new AssetsPlugin({
      prettyPrint: true,
      filename: 'bundles.json',
      path: syspath.assets
    })
  ]
};

module.exports = webpackConfig;
