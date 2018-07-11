const path = require('path');

module.exports = {
  entry: [
    'babel-polyfill',
    path.join(__dirname, 'src', 'index.js'),
    path.join(__dirname, 'src', 'styles', 'global.js'),
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    host: '0.0.0.0',
  },
};
