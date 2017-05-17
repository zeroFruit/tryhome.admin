const path            = require('path');
const webpack         = require('webpack');
const combineLoaders  = require('webpack-combine-loaders');


module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './src',
    'webpack-hot-middleware/client'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }, {
      test: /\.css$/,
      loader: combineLoaders([
        {
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          query: {
            importLoaders: 1,
            modules: true,
            localIdentName: '[name]__[local]___[hash:base64:5]'
          }
        }, {
          loader: 'postcss-loader'
        }
      ])
    }, {
      test: /\.(png|jpg|svg)$/,
      loader: 'url-loader',
      query: {
        limit: 25000,
        name: '[name].[ext]'
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
