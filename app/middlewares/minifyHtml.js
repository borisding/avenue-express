const minifyHTML = require('express-minify-html-2');

const minfyHtml = isDev => {
  if (isDev) {
    return (req, res, next) => next();
  }

  return minifyHTML({
    override: true,
    htmlMinifier: {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      minifyURLs: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
      trimCustomFragments: true
    }
  });
};

module.exports = minfyHtml;
