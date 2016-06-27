var path = require('path');
module.exports = {
  entry: [
    path.resolve('./src/index.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    publicPath: './',
  },
  plugins: [],
  devtool: 'source-map',
  module: {
    preLoaders: [
      {
        test: /(\.js)/,
        include: path.resolve('./src/'),
        loader: 'source-map',
      },
    ],
    loaders: [
      {
        test: /(\.js)$/,
        include: path.resolve('./src/'),
        loader: 'babel',
      }
    ],
  },
  resolve: {
    root: [
      path.resolve('./src'),
    ],
    extensions: ['', '.js'],
  },
};
