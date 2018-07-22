const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: 'app.js',
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tag\.html$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [{
          loader: 'riot-tag-loader',
          options: {
            type: 'es6'
          }
        }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015-riot']
          }
        }]
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "src"),
      "node_modules"
    ],
    extensions: ['.js', '.tag']
  },
  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot'
    })
  ]
};
