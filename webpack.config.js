const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postcssConfig = require('./postcss.config.js');

const rulesConfig = {
  js: {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    use: [{
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'stage-0', 'react'],
        babelrc: false
      }
    }]
  },
  componentStyles: {
    test: /\.(scss|sass)$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', {
        loader: 'postcss-loader',
        options: postcssConfig
      }, 'sass-loader']
    })

  },
  fontAwesome: [{
    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
    loader: "url-loader?limit=10000&mimetype=application/font-woff&name=/webpack-assets/[name]/[hash].[ext]?[hash]"
  }, {
    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
    loader: "url-loader?limit=10000&mimetype=application/font-woff&name=/webpack-assets/[name]/[hash].[ext]?[hash]"
  }, {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    loader: "url-loader?limit=10000&mimetype=application/octet-stream&name=/webpack-assets/[name]/[hash].[ext]?[hash]"
  }, {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    loader: "file-loader?&name=/webpack-assets/[name]/[hash].[ext]?[hash]"
  }, {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    loader: "url-loader?limit=10000&mimetype=image/svg+xml&name=/webpack-assets/[name]/[hash].[ext]?[hash]"
  }]
};

module.exports = {
  entry: [
    'babel-polyfill',
    './dist/App.jsx'
  ],
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js'
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: false
    })
  ],
  resolve: {
    modules: [
      'node_modules',
      './dist/components/',
      './dist/containers'
    ],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      rulesConfig.js,
      rulesConfig.componentStyles,
      rulesConfig.fontAwesome[0],
      rulesConfig.fontAwesome[1],
      rulesConfig.fontAwesome[2],
      rulesConfig.fontAwesome[3],
      rulesConfig.fontAwesome[4]
    ]
  },
  devServer: {
  contentBase: path.join(__dirname, 'public'),
  hot: true,
  inline: true,
  port: 8080,
   historyApiFallback: {
      index: 'index.html'
    }
},
  devtool: process.NODE_ENV === 'production' ? undefined : 'cheap-module-eval-source-map'
};
