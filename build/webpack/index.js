require('module-alias/register');
const fs = require('fs');
const path = require('path');
const isDev = require('isdev');
const autoprefixer = require('autoprefixer');
const AssetsPlugin = require('assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const pkg = require('@root/package');
const syspath = require('@config/syspath');

const publicPath = '/';

// populate respective module JS and SCSS files as entry points
const getEntry = () => {
  const entryFiles = {};
  const jsPath = `${syspath.assets}/js`;
  const scssPath = `${syspath.assets}/scss`;

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

// process assets map and inject into layout template
const processOutput = assets => {
  try {
    const layoutSource = '_layout.html';
    // prettier-ignore
    const layoutContent = fs.readFileSync(`${syspath.views}/${layoutSource}`, 'utf8');
    // prettier-ignore
    const assetsMap = `(function(w) { w.assetsMap = ${JSON.stringify(assets)} })(window);`;
    // replace assets map placeholder with actual output
    return layoutContent.replace('__assetsMap__', assetsMap);
  } catch (err) {
    throw err;
  }
};

// webpack's cofiguration
const webpackConfig = {
  watch: isDev,
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'cheap-module-inline-source-map' : 'source-map',
  context: syspath.src,
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
    publicPath,
    path: syspath.public,
    filename: isDev ? 'js/[name].js' : 'js/[name].[contenthash:8].js',
    chunkFilename: isDev ? 'js/[id].js' : 'js/[id].[contenthash:8].js'
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
    new MiniCssExtractPlugin({
      filename: isDev ? 'css/[name].css' : 'css/[name].[contenthash:8].css',
      chunkFilename: isDev ? 'css/[id].css' : 'css/[id].[contenthash:8].css'
    }),
    new AssetsPlugin({
      prettyPrint: true,
      path: syspath.views,
      filename: 'layout.html',
      processOutput
    })
  ]
};

module.exports = webpackConfig;
