const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'sourcemap',
  entry: {
    app: [path.resolve(__dirname, 'src/App.jsx')],
    vendor: ['react', 'react-dom', 'whatwg-fetch', 'react-router-dom', 'prop-types'],
  },
  output: {
    path: path.resolve(__dirname, 'static'),
    chunkFilename: '[name].bundle.js',
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/react', '@babel/env'],
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true,
        },
      },
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'static'),
    compress: true,
    port: 9000,
    host: '0.0.0.0',
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000',
      },
    },
    historyApiFallback: true
  },
  plugins: [],
};
