process.env.NODE_ENV = 'production';
const path              = require('path');
const webpack           = require('webpack');
const combineLoaders    = require('webpack-combine-loaders');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ],
  module: {
    loaders: [{
      exclude: /node_modules/,
      include: path.join(__dirname, 'src'),
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }, {
      test: /\.css$/,
      include: path.join(__dirname, 'assets'),
      loader: ExtractTextPlugin.extract(
        'style-loader',
        combineLoaders([
          {
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              importLoaders: 1
            }
          }, {
            loader: 'postcss-loader'
          }
        ])
      )
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
  }
}
