require('module-alias/register');

const fs = require('fs');
const path = require('path');
const isDev = require('isdev');
const pkg = require('@root/package');
const syspath = require('@config/syspath');

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
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'cheap-module-inline-source-map' : 'source-map',
  context: syspath.src,
  entry: getEntryFiles(),
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor'
        }
      }
    }
  },
  output: {
    path: syspath.public,
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
  // TODO
  plugins: []
};

module.exports = webpackConfig;
