const path = require('path');

module.exports = {
  entry: {
    site : './src/js/site.js',
    maps : './src/js/maps.js',
  },
  //mode: 'development', devtool: false,
  mode: 'production',
  target: 'node',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'docs/js'),
    //libraryTarget: 'commonjs'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
      },
    ],
  },
}